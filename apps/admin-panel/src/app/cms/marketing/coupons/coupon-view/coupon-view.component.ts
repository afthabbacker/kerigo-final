import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  CreateCouponGQL,
  DeleteCouponGQL,
  UpdateCouponGQL,
} from '../../../../../generated/graphql';
import { RouterHelperService } from '../../../../@services/router-helper.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { firstValueFrom } from 'rxjs';

@Component({
  standalone: false,
  selector: 'app-coupon-view',
  templateUrl: './coupon-view.component.html',
  styles: ['nz-input-number{ @apply w-full }'],
})
export class CouponViewComponent implements OnInit {
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private message: NzMessageService,
    private fb: UntypedFormBuilder,
    private routerHelper: RouterHelperService,
    private createGQL: CreateCouponGQL,
    private updateGQL: UpdateCouponGQL,
    private deleteGQL: DeleteCouponGQL,
  ) {
    this.form = this.fb.group({
      id: [null],
      code: [null, Validators.required],
      title: [null, Validators.required],
      description: [null, Validators.required],
      manyUsersCanUse: [0, Validators.required],
      manyTimesUserCanUse: [0, Validators.required],
      minimumCost: [0, Validators.required],
      maximumCost: [0, Validators.required],
      dates: [null, Validators.required],
      discountPercent: [0, Validators.required],
      discountFlat: [0, Validators.required],
      creditGift: [0, Validators.required],
      isEnabled: [true, Validators.required],
      isFirstTravelOnly: [false, Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      if (data.coupon == null) return;
      data.coupon.data.coupon.dates = [
        data.coupon.data.coupon.startAt,
        data.coupon.data.coupon.expireAt,
      ];
      this.form.patchValue(data.coupon.data.coupon);
    });
  }

  async onSubmit() {
    const { id, dates, ..._input } = this.form.value;
    const startAt = dates[0].getTime();
    const expireAt = dates[1].getTime();
    const input = { ..._input, startAt, expireAt };
    try {
      if (id == null) {
        await firstValueFrom(this.createGQL.mutate({ input }));
      } else {
        await firstValueFrom(this.updateGQL.mutate({ id, input }));
      }
      this.routerHelper.goToParent(this.route);
    } catch (error: any) {
      this.message.error(error.message);
    }
  }

  async deleteCoupon() {
    await firstValueFrom(this.deleteGQL.mutate({ id: this.form.value.id }));
    this.routerHelper.goToParent(this.route);
  }
}

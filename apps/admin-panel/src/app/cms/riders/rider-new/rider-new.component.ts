import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CreateRiderGQL } from '../../../../generated/graphql';
import { NzMessageService } from 'ng-zorro-antd/message';
import { firstValueFrom } from 'rxjs';
import { RouterHelperService } from '../../../@services/router-helper.service';
import { COUNTRY_CODE_LIST, CountryCodeItem } from '../../../country-codes';

@Component({
  standalone: false,
  selector: 'app-rider-new',
  templateUrl: './rider-new.component.html',
})
export class RiderNewComponent {
  form: UntypedFormGroup;
  countryCodes: CountryCodeItem[] = COUNTRY_CODE_LIST;

  constructor(
    private fb: UntypedFormBuilder,
    private createRiderGQL: CreateRiderGQL,
    private messageService: NzMessageService,
    private routerHelper: RouterHelperService,
    private route: ActivatedRoute,
  ) {
    this.form = this.fb.group({
      firstName: [null],
      lastName: [null],
      phoneNumberPrefix: ['+1', Validators.required],
      phoneNumber: [null, Validators.required],
      gender: [null],
    });
  }

  async submitForm() {
    const { phoneNumber, phoneNumberPrefix, ..._formValue } = this.form.value;
    await firstValueFrom(
      this.createRiderGQL.mutate({
        input: {
          mobileNumber: `${phoneNumberPrefix}${phoneNumber}`,
          ..._formValue,
        },
      }),
    );
    this.messageService.success('Saved Successfully.');
    this.routerHelper.goToParent(this.route);
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';
import {
  CreateSosActivityGQL,
  SosActivityAction,
  ViewSosQuery,
} from '../../../../../generated/graphql';
import { TagColorService } from '../../../../@services/tag-color/tag-color.service';
import { firstValueFrom, map, Observable } from 'rxjs';
import { camelCase } from 'camel-case';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { RouterHelperService } from '../../../../@services/router-helper.service';

@Component({
  standalone: false,
  selector: 'app-sos-view-info',
  templateUrl: './sos-view-info.component.html',
})
export class SOSViewInfoComponent implements OnInit {
  query?: Observable<ApolloQueryResult<ViewSosQuery>>;
  formActivity;
  public camelCase = camelCase;
  activityAction = SosActivityAction;
  activityActions = Object.values(SosActivityAction).filter(
    (action) =>
      action != SosActivityAction.Seen && action != SosActivityAction.Submitted,
  );

  constructor(
    private route: ActivatedRoute,
    public tagColor: TagColorService,
    private fb: UntypedFormBuilder,
    private msg: NzMessageService,
    private addActivityGql: CreateSosActivityGQL,
    private routerHelper: RouterHelperService,
  ) {}

  ngOnInit(): void {
    this.query = this.route.parent?.data.pipe(map((data) => data.sos));
    this.formActivity = this.fb.group({
      action: [null, Validators.required],
      note: [null],
    });
  }

  async onSubmitActivity(sosId: string) {
    try {
      await firstValueFrom(
        this.addActivityGql.mutate({
          activity: { ...this.formActivity.value, sosId },
        }),
      );
      this.msg.success('Activity recorded');
      this.routerHelper.refresh(this.route);
      this.formActivity.patchValue({});
    } catch (error: any) {
      this.msg.error(error.message);
    }
  }
}

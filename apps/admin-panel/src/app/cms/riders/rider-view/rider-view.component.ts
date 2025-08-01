import { Component, OnInit } from '@angular/core';
import { TagColorService } from '../../../@services/tag-color/tag-color.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { ApolloQueryResult } from '@apollo/client/core';
import {
  DeleteRiderGQL,
  RiderStatus,
  UpdateRiderGQL,
  ViewRiderQuery,
} from '../../../../generated/graphql';
import { map } from 'rxjs/operators';
import { firstValueFrom, Observable } from 'rxjs';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TranslateService } from '@ngx-translate/core';

@Component({
  standalone: false,
  selector: 'app-rider-view',
  templateUrl: './rider-view.component.html',
})
export class RiderViewComponent implements OnInit {
  query?: Observable<ApolloQueryResult<ViewRiderQuery>>;
  environment;
  riderStatus = RiderStatus;

  constructor(
    private route: ActivatedRoute,
    public tagColor: TagColorService,
    private updateRiderGQL: UpdateRiderGQL,
    private deleteGQL: DeleteRiderGQL,
    private modal: NzModalService,
    private message: NzMessageService,
    private translate: TranslateService,
    private router: Router,
  ) {
    this.environment = environment;
  }
  ngOnInit(): void {
    this.query = this.route.data.pipe(map((data) => data.rider));
  }

  async changeStatus(status: RiderStatus) {
    try {
      await firstValueFrom(
        this.updateRiderGQL.mutate({
          id: this.route.snapshot.params.id,
          update: { status: status as RiderStatus },
        }),
      );
      this.message.success(this.translate.instant('done'));
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { refresh: new Date().getTime() },
        queryParamsHandling: 'merge',
      });
    } catch (error: any) {
      if (error.message == 'PERMISSION_NOT_GRANTED') {
        this.message.error(
          this.translate.instant('error.PERMISSION_NOT_GRANTED'),
        );
      } else {
        this.message.error(error.message);
      }
    }
  }

  deleteRider(id: string) {
    this.modal.confirm({
      nzTitle: this.translate.instant('message.deleteConfirmation.title'),
      nzContent: this.translate.instant(
        'message.deleteRiderConfirmation.content',
      ),
      nzOnOk: async () => {
        try {
          await firstValueFrom(this.deleteGQL.mutate({ id }));
          this.message.success(
            this.translate.instant('message.deleteRiderCofirmAlert'),
          );
          this.router.navigateByUrl('/riders');
        } catch (error: any) {
          if (error.message == 'PERMISSION_NOT_GRANTED') {
            this.message.error(
              this.translate.instant('error.PERMISSION_NOT_GRANTED'),
            );
          } else {
            this.message.error(error.message);
          }
        }
      },
    });
  }
}

import { NgModule } from '@angular/core';
import { ManagementServiceOptionsRoutingModule } from './management-service-options-routing.module';
import { ServiceOptionsListComponent } from './service-options-list/service-options-list.component';
import { ServiceOptionViewComponent } from './service-option-view/service-option-view.component';
import { TagColorService } from '../../../@services/tag-color/tag-color.service';
import { SharedModule } from '../../../@components/shared.module';

@NgModule({
  declarations: [ServiceOptionsListComponent, ServiceOptionViewComponent],
  imports: [
    ManagementServiceOptionsRoutingModule,
    SharedModule
  ],
  providers: [TagColorService]
})
export class ManagementServiceOptionsModule { }

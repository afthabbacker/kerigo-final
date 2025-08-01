import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TagColorService } from '../../../../@services/tag-color/tag-color.service';
import { Observable } from 'rxjs';
import { ApolloQueryResult } from '@apollo/client/core';
import {
  ReviewParametersListQuery,
  ServiceOptionsListQuery,
} from '../../../../../generated/graphql';
import { map } from 'rxjs/operators';
import { TableService } from '../../../../@services/table-service';

@Component({
  standalone: false,
  selector: 'app-service-options-list',
  templateUrl: './service-options-list.component.html',
})
export class ServiceOptionsListComponent implements OnInit {
  query?: Observable<ApolloQueryResult<ServiceOptionsListQuery>>;

  constructor(
    private route: ActivatedRoute,
    public tableService: TableService,
    public tagColor: TagColorService,
  ) {}

  ngOnInit(): void {
    this.query = this.route.data.pipe(map((data) => data.serviceOptions));
  }
}

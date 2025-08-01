import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';
import {
  DriverOrdersGQL,
  DriverOrdersQuery,
  OrderFilter,
  OrderSortFields,
} from '../../../../../generated/graphql';
import { TableService } from '../../../../@services/table-service';
import { Observable } from 'rxjs';

@Injectable()
export class DriverProfileOrdersResolver {
  constructor(
    private gql: DriverOrdersGQL,
    private tableService: TableService,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<ApolloQueryResult<DriverOrdersQuery>> {
    const paging = this.tableService.deserializeQueryParams<
      OrderSortFields,
      OrderFilter
    >(route.queryParams);
    return this.gql.fetch({ driverId: route.parent?.params.id, ...paging });
  }
}

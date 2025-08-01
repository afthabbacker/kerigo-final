import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';
import {
  FleetFilter,
  FleetsListGQL,
  FleetsListQuery,
  FleetSortFields,
  RiderFilter,
  RidersListGQL,
  RidersListQuery,
  RiderSortFields,
} from '../../../../../generated/graphql';
import { TableService } from '../../../../@services/table-service';
import { Observable } from 'rxjs';

@Injectable()
export class FleetsListResolver {
  constructor(
    private paging: TableService,
    private gql: FleetsListGQL,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<ApolloQueryResult<FleetsListQuery>> {
    const params = this.paging.deserializeQueryParams<
      FleetSortFields,
      FleetFilter
    >(route.queryParams);
    return this.gql.fetch(params);
  }
}

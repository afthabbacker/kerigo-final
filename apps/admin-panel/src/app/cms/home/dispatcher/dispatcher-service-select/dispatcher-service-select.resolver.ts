import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';
import {
  DispatcherCalculateFareGQL,
  DispatcherCalculateFareQuery,
} from '../../../../../generated/graphql';
import { Observable } from 'rxjs';
import { DispatcherService } from '../dispatcher.service';

@Injectable()
export class DispatcherServiceSelectResolver {
  constructor(
    private dispatcherService: DispatcherService,
    private gql: DispatcherCalculateFareGQL,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<ApolloQueryResult<DispatcherCalculateFareQuery>> {
    const points = this.dispatcherService.deserializePoints(
      route.queryParams.points,
    );
    return this.gql.fetch({
      points: points.map((point) => point.location),
      riderId: route.queryParams.riderId,
    });
  }
}

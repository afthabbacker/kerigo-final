import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';
import { RiderAddressesQuery } from '../../../../../generated/graphql';
import { TableService } from '../../../../@services/table-service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  standalone: false,
  selector: 'app-rider-view-addresses',
  templateUrl: './rider-view-addresses.component.html',
})
export class RiderViewAddressesComponent implements OnInit {
  query?: Observable<ApolloQueryResult<RiderAddressesQuery>>;

  constructor(
    private route: ActivatedRoute,
    public tableService: TableService,
  ) {}

  ngOnInit(): void {
    this.query = this.route.data.pipe(map((data) => data.addresses));
  }

  openMap(location: { lat: number; lng: number }) {
    const url =
      'https://maps.google.com/?q=' + location.lat + ',' + location.lng;
    window.open(url);
  }
}

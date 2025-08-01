import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';
import { RoleQuery, RolesQuery } from '../../../../../generated/graphql';
import { TableService } from '../../../../@services/table-service';
import { map, Observable } from 'rxjs';

@Component({
  standalone: false,
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styles: [],
})
export class RolesListComponent implements OnInit {
  query?: Observable<ApolloQueryResult<RolesQuery>>;

  constructor(
    private route: ActivatedRoute,
    public tableService: TableService,
  ) {}

  ngOnInit(): void {
    this.query = this.route.data.pipe(map((data) => data.roles));
  }
}

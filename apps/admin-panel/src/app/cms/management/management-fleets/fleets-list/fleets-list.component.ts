import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';
import { FleetFilter, FleetsListQuery } from '../../../../../generated/graphql';
import { TableService } from '../../../../@services/table-service';
import { TagColorService } from '../../../../@services/tag-color/tag-color.service';
import { map, Observable } from 'rxjs';

@Component({
  standalone: false,
  selector: 'app-fleets-list',
  templateUrl: './fleets-list.component.html',
})
export class FleetsListComponent implements OnInit {
  query?: Observable<ApolloQueryResult<FleetsListQuery>>;
  nameSearchValue?: string;

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    public tagColor: TagColorService,
    public tableService: TableService,
  ) {}

  ngOnInit(): void {
    this.query = this.route.data.pipe(map((data) => data.fleets));
  }

  async filter() {
    const search: FleetFilter = {
      name: this.nameSearchValue ? { like: this.nameSearchValue } : undefined,
    };
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { search: JSON.stringify(search) },
      queryParamsHandling: 'merge',
    });
  }
}

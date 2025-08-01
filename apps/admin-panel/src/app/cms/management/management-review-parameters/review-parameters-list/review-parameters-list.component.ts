import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TagColorService } from '../../../../@services/tag-color/tag-color.service';
import { Observable } from 'rxjs';
import { ApolloQueryResult } from '@apollo/client/core';
import { ReviewParametersListQuery } from '../../../../../generated/graphql';
import { map } from 'rxjs/operators';
import { TableService } from '../../../../@services/table-service';

@Component({
  standalone: false,
  selector: 'app-review-parameters-list',
  templateUrl: './review-parameters-list.component.html',
})
export class ReviewParametersListComponent implements OnInit {
  query?: Observable<ApolloQueryResult<ReviewParametersListQuery>>;

  constructor(
    private route: ActivatedRoute,
    public tableService: TableService,
    private router: Router,
    public tagColor: TagColorService,
  ) {}

  ngOnInit(): void {
    this.query = this.route.data.pipe(map((data) => data.reviewParameters));
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';
import { ViewOrderQuery } from '../../../../../generated/graphql';
import { map, Observable } from 'rxjs';

@Component({
  standalone: false,
  selector: 'app-request-view-chats',
  templateUrl: './request-view-chats.component.html',
})
export class RequestViewChatsComponent implements OnInit {
  query?: Observable<ApolloQueryResult<ViewOrderQuery>>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.query = this.route.parent?.data.pipe(map((data) => data.order));
  }
}

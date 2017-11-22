import { Component, OnInit } from '@angular/core';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

interface User {
  id: number;
  username: string;
}

interface QueryResponse {
  users: User[]
}

@Component({
  selector: 'fi-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[];

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.apollo.watchQuery<QueryResponse>({
      query: gql`
      {
        users {
          id
          username
        }
      }
      `,
    })
    .valueChanges
    .subscribe(({data}) => {
      this.users = data.users;
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { User } from 'app/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'fi-user-list',
  templateUrl: './user-list.component.html',
  styles: []
})
export class UserListComponent implements OnInit {
  users: User[];

  constructor(
    private apollo: Apollo
  ) { }

  ngOnInit() {
    this.apollo.query<User[]>({
      query: gql`query {
        users { id username email }
      }`
    })
    .subscribe(val => {
      this.users = val.data;
    });
  }

}

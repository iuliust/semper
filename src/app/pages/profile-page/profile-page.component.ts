import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular/Apollo';
import gql from 'graphql-tag';
import { User, AuthService } from 'app/core';

@Component({
  selector: 'fi-profile-page',
  templateUrl: './profile-page.component.html',
  // styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  user: User;
  user$ = this.apollo.query<{user: User}>({
    query: gql`query($id: Int!) {
      user(id: $id) { id email username }
    }`,
    variables: { id: this.auth.user.id },
  })
  .map(response => this.user = response.data.user)

  constructor(private apollo: Apollo, private auth: AuthService) { }

  ngOnInit() {
    const user: User = this.auth.user;
    if (!user) { return }
    this.apollo.query<{user: User}>({
      query: gql`query($id: Int!) {
        user(id: $id) { id email username }
      }`,
      variables: { id: user.id },
    })
    .subscribe(response => this.user = response.data.user);
  }
}

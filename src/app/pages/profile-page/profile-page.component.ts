import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { User, AuthService } from 'app/core';

@Component({
  selector: 'fi-profile-page',
  templateUrl: './profile-page.component.html',
})
export class ProfilePageComponent implements OnInit {
  file: File;
  user: User;
  allFiles$ = this.apollo.watchQuery({
    query: gql`
      query {
        uploads { id path filename }
      }`
  })
  .valueChanges
  .map((response: any) => response.data.uploads);

  user$ = this.apollo.query<{user: User}>({
    query: gql`query($id: Int!) {
      user(id: $id) { id email username }
    }`,
    variables: { id: this.auth.user.id },
  })
  .map(response => this.user = response.data.user)

  constructor(
    private apollo: Apollo,
    private auth: AuthService,
    private snack: MatSnackBar,
  ) { }

  ngOnInit() {
    const user: User = this.auth.user;
    if (!user) { return }
    this.apollo.query<{user: User}>({
      query: gql`query($id: Int!) {
        user(id: $id) { id email username profilePicture { path } }
      }`,
      variables: { id: user.id },
    })
    .subscribe(response => this.user = response.data.user);
  }

  setFile(file: File) {
    this.apollo.mutate({
      mutation: gql`mutation sendFile($file: Upload!, $userId: ID!, $withPic: Boolean!) {
        addUserProfilePicture(file: $file, userId: $userId) {
          id
          email
          username
          profilePicture @includes(if: $withPic){
            path
          }
        }
      }`,
      variables: {file, userId: this.auth.user.id, withPic: this.auth.user.profilePicture}
    })
    .subscribe(res => {
      this.user = res.data.addUserProfilePicture;
    })
    this.file = file;
  }

  removeProfilePicture() {
    this.apollo.mutate({
      mutation: gql`mutation removeUserProfilePicture($userId: ID!) {
        removeUserProfilePicture(userId: $userId) {
          id email
        }
      }`,
      variables: {userId: this.user.id}
    })
    .subscribe(response => response.data.removeUserProfilePicture);
  }

  removeFile(fileId: number) {
    this.apollo.mutate({
      mutation: gql`mutation removeFile($fileId: ID!) {
        removeFile(fileId: $fileId)
      } `,
      variables: {fileId}
    })
    .subscribe(response => response.data.removeFile);
  }
}

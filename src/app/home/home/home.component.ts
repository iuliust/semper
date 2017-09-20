import { ApolloQueryObservable } from 'apollo-angular/build/src';
import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

type Genre = 'f' | 'm';
interface Photo {
  id: number;
  name: string;
  description: string;
  filename: string,
  views: number,
  isPublished: boolean;
}
const photos = gql`
{
  photos {
    id
    name
    description
    filename
    views
    isPublished
  }
}
`;

interface QueryResponse {
  photos: Photo[];
}

@Component({
  selector: 'fi-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  genre: Genre = 'm';
  photos: Photo[];

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.apollo.watchQuery<QueryResponse>({
      query: photos
    })
    .subscribe(({data}) => {
      this.photos = data.photos;
    })
  }

  male() {
    this.genre = 'm';
  }

  female() {
    this.genre = 'f';
  }
}

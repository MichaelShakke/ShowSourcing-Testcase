import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import gql from 'graphql-tag';

import { Product, Products} from '../../models/product.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

    private products: Observable<Product[]>;

    constructor(private apollo: Apollo) { }

    ngOnInit() {
      this.products = this.apollo.watchQuery<Products>({
        query : gql`
          {
            products(take: 10) {
              id
              name
            }
        }
        `
      }).valueChanges
      .pipe(
        map(result => result.data.products)
      );
    }
}

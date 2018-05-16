import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { map } from 'rxjs/operators';

import { Product, Products } from '../models/product.model';
import { Category, Categories } from '../models/category.model';
import { URLUtilities } from '../utilities/URLUtilities';
import { ProductQuery } from '../utilities/queries/product.query';
import { CategoryQuery } from '../utilities/queries/category.query';

@Injectable()
export class ListService {

  private products: Observable<Product[]>;
  private QRef: QueryRef<any>;

  constructor(private apollo : Apollo) { }

  getProducts() : Observable<Product[]> {
     this.QRef = this.apollo.watchQuery<Products>({
      query: ProductQuery.query_allProducts
    });
    let products = this.QRef.valueChanges.map((data) => data.data.products);

    this.QRef.subscribeToMore({
      document: ProductQuery.subscription_allProducts,
      updateQuery: (prev, {subscriptionData}) => {
        if (!subscriptionData.data) {
          return prev;
        }
        const newProdList = subscriptionData.data.products;
        return Object.assign({}, prev, {
          products: [ ...newProdList ]
        });
      }
    });

    return products;
  }

  getCategories() : Observable<Category[]> {
    let categories = this.apollo.watchQuery<Categories>({
      query : CategoryQuery.query_allCategories
    }).valueChanges.map((data) => data.data.categories);
    return categories;
  }

  mutateCategory(replace: string, replaced: string) : Observable<any> {
    return this.apollo.mutate({
      mutation: ProductQuery.mutation_category,
      variables : {
        idp: replace,
        idc: replaced
      }
    }).map(a => a.data);
  }

}

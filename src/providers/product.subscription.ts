import { Component, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { Product, Products } from '../models/product.model';
import { URLUtilities } from '../utilities/URLUtilities';
import { ProductQuery } from '../utilities/queries/product.query';

//This class was supposed to be a service provider of subsciptions, couldn't make it work,
//same it would have been for the catefory class.
@Injectable()
export class ProductSubscription {
  private products: Product[];
  private prodQR: QueryRef<any>;
  private prodSubs: Subscription;
    constructor(private apollo : Apollo) {

    }

    public subscribeAllProducts(){

      this.prodQR = this.apollo.watchQuery({
        query: ProductQuery.query_allProducts
      });

      this.prodSubs = this.prodQR.valueChanges.subscribe( ({data}) => {
        this.products = [...data.products]
        .filter(prod => prod.images.length > 0);
      });

      this.prodQR.subscribeToMore({
        document: ProductQuery.subscription_allProducts,
        updateQuery: (prev, {subscriptionData}) => {
          if (!subscriptionData.data) {
            return prev;
          }

          const newProdList = subscriptionData.data.products;

          return Object.assign({}, prev, {
            products: [...prev['products'], newProdList ]
          });
        }
      });

      return this.products;
    }
}

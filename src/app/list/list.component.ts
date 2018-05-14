import { Component, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import { map } from 'rxjs/operators';

import { Product, Products } from '../../models/product.model';
import { Category, Categories } from '../../models/category.model';
import { URLUtilities } from '../../utilities/URLUtilities';
import { ProductQuery } from '../../utilities/queries/product.query';
import { CategoryQuery } from '../../utilities/queries/category.query';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css', '../app.component.css']
})
export class ListComponent implements OnInit {

    private imgUrls = URLUtilities.img_urls;
    private prodQR: QueryRef<any>;
    private prodSubs: Subscription;
    private products: Product[] = [];
    private categories: Category[];

    constructor(private apollo: Apollo) { }

    ngOnInit() {
      this.productSubscription();

    }

    mutateProduct(prod : Product, name_category) {

    }

    private productSubscription() {
      this.prodQR = this.apollo.watchQuery({
        query: ProductQuery.getProductsList
      });

      this.prodSubs = this.prodQR.valueChanges.subscribe( ({data}) => {
        this.products = [...data.products]
        .filter(prod => prod.images.length > 0);
      });

      this.prodQR.subscribeToMore({
        document: ProductQuery.subscriptionProd,
        updateQuery: (prev, {subscriptionData}) => {
          if (!subscriptionData.data) {
            return prev;
          }

          const newProdList = subscriptionData.data.products;

          return Object.assign({}, prev, {
            products: [...prev, newProdList ]
          });
        }
      });
    }

    private categorySubscription() {
      this.prodQR = this.apollo.watchQuery({
        query: ProductQuery.getProductsList
      });

      this.prodSubs = this.prodQR.valueChanges.subscribe( ({data}) => {
        this.products = [...data.products]
        .filter(prod => prod.images.length > 0);
      });

      this.prodQR.subscribeToMore({
        document: ProductQuery.subscriptionProd,
        updateQuery: (prev, {subscriptionData}) => {
          if (!subscriptionData.data) {
            return prev;
          }

          const newProdList = subscriptionData.data.products;

          return Object.assign({}, prev, {
            products: [...prev, newProdList ]
          });
        }
      });
    }

}

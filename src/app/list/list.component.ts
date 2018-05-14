import { Component, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import { map } from 'rxjs/operators';
//import { ProductSubscription } from '../../providers/product.subscription'; //Read productionsubscription.ts

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
    private QRef: QueryRef<any>;
    private subsc: Subscription;
    private products: Product[];
    private categories: Category[];
    private selected: any;

    constructor(private apollo: Apollo) { // private prodSubscription : ProductSubscription
    }

    ngOnInit() {
      this.subscribeAllProducts();
      this.queryAllCategories();
    }

    //the supscription is applied to all products and all fields used for this product on this testcase
    private subscribeAllProducts() {
      this.QRef = this.apollo.watchQuery({
        query: ProductQuery.query_allProducts
      });

      this.subsc = this.QRef.valueChanges.subscribe( ({data}) => {
        this.products = [...data.products]
        .filter(prod => prod.images.length > 0);
      });

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
    }

    private queryAllCategories() {
      this.apollo.watchQuery<Categories>({
        query : CategoryQuery.query_allCategories
      }).valueChanges
      .subscribe( ({data}) => {
       this.categories = data.categories;
     });
    }
}

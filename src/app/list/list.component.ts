import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
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
    private title: string = "Product List";
    private products: Observable<Product[]>;
    private categories: Observable<Category[]>;

    constructor(private apollo: Apollo) { }

    ngOnInit() {
      this.products = this.apollo.watchQuery<Products>({
        query : ProductQuery.getProductsList
      }).valueChanges
      .pipe(
        map(result => result.data.products
          .filter(prod => prod.images.length > 0) //No null images
        )
      );

      this.categories = this.apollo.watchQuery<Categories>({
        query : CategoryQuery.getCategories
      }).valueChanges
      .pipe(
        map(result => result.data.categories)
      );
    }
}

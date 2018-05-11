import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Product, Products} from '../../models/product.model';
import { URLUtilities } from '../../utilities/URLUtilities';
import { ProductQuery } from '../../utilities/queries/product.query';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

    private imgUrls = URLUtilities.img_urls;
    private title: string = "Product List";
    private products: Observable<Product[]>;

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
    }
}

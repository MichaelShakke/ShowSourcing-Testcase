import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Product, Products} from '../../models/product.model';
import { GlobalInterface } from '../../utilities/globalinterface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

    private imgUrls = GlobalInterface.img_urls;
    private title: string = "Product List";
    private products: Observable<Product[]>;

    constructor(private apollo: Apollo) { }

    ngOnInit() {
      this.products = this.apollo.watchQuery<Products>({
        query : GlobalInterface.queryProducts
      }).valueChanges
      .pipe(
        map(result => result.data.products)
      );
    }
}

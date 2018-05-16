import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { map } from 'rxjs/operators/map';
import "rxjs/add/operator/takeWhile";
import { ListService } from '../../providers/list.service';

import { Product, Products } from '../../models/product.model';
import { Category, Categories } from '../../models/category.model';
import { URLUtilities } from '../../utilities/URLUtilities';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css', '../app.component.css']
})
export class ListComponent implements OnInit, OnDestroy {

    private imgUrls = URLUtilities.img_urls;
    private QRef: QueryRef<any>;
    private products: Observable<Product[]>;
    private categories: Observable<Category[]>;
    private alive: boolean = true;

    constructor(private apollo: Apollo, private listService : ListService) {
    }

    ngOnInit() {
      this.getProducts();
      this.getCategories();
    }

    getProducts() {
      this.products = this.listService.getProducts();
      this.products
        .takeWhile(() => this.alive)
        .subscribe();
    }

    getCategories() {
      this.categories = this.listService.getCategories();
      this.categories
        .takeWhile(() => this.alive)
        .subscribe();
    }

    //replace is the product we want to keep,
    //replaced is the id of the category we are replacing
    replaceCategory(replace : Product, replaced: string) {
      this.listService.mutateCategory(replace.id, replaced)
      .takeWhile(() => this.alive)
        .subscribe();
    }
    
    ngOnDestroy() {
      this.alive = false;
    }
}

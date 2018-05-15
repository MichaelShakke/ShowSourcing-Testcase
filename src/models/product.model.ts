import { Image } from './image.model';
import { Category } from './category.model';
import { Supplier } from './supplier.model';
import { Price } from './price.model';
import { ProductStatus } from './productstatus.model';

//Declared only the variables we need for the testcase
export interface Product {
  id: string;
  images: Image[];
  name: string;
  category: Category;
  supplier: Supplier;
  price: Price;
  status: ProductStatus;
}

export interface Products {
  products: Product[];
}

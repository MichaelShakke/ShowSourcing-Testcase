import { Image } from './image.model';
import { Category } from './category.model';
import { Supplier } from './supplier.model';
import { Price } from './price.model';
import { ProductStatus } from './productstatus.model';

export type Product = {
  id: string;
  images: Image[];
  name: string;
  category: Category;
  supplier: Supplier;
  price: Price;
  status: ProductStatus;
}

export type Products = {
  products: Product[];
}

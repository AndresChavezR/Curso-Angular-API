import { Component, OnInit } from '@angular/core';

import { Product, CreateProductDTO, UpdateProductDTO } from '../../models/product.model';

import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  myShoppingCart: Product[] = [];
  total = 0;
  products: Product[] = [];
  showProductDetail = false;
  product: Product ={
    id: 'string',
    title: 'string',
    price: 0,
    images: [],
    description: '',
    category: {
      id: '',
      name: ''
    }
  };
  limit = 10
  offset = 0

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    // this.productsService.getAllProducts()
    // .subscribe((data: Product[]) => {
    //   this.products = data;
    // });

    this.productsService.getProductsByPage(10, 0).subscribe((data: Product[]) => {
      this.products = data
    })
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toogleProductDetail(){
    this.showProductDetail = !this.showProductDetail
  }
  
  onShowDetail(id: string){
    this.productsService.getProductById(id).subscribe((product: Product) =>{
      console.log(product)
      this.toogleProductDetail()
      this.product = product
    })
  }

  createNewProduct(){
    const productCreated: CreateProductDTO = {
      title: 'Nuevo Producto',
      description: 'esto es una decripción',
      images: [`https://placeimg.com/640/480/any?random=${Math.random()}`],
      price: 1000,
      categoryId: 2
    }
    this.productsService.createProduct(productCreated).subscribe((product: Product) => {
      console.log(product)
      this.products.unshift(product)
    })

  }

  updateProducto(){
    const changes: UpdateProductDTO = {
      title: 'Change title'
    }
    const id = this.product.id
    this.productsService.updateProduct(id, changes).subscribe((data: Product) => {
      console.log('Change product ->  ',data)
      const productFindIndex = this.products.findIndex(item  => item.id  == this.product.id)
      this.products[productFindIndex] = data
      this.product = data
    })
  }
  deleteProduct(){
    const id = this.product.id
    this.productsService.deleteProduct(id).subscribe(() =>{
      const productFindIndex = this.products.findIndex(item  => item.id  == this.product.id)
      this.products.splice(productFindIndex, 1)
      this.showProductDetail = false
    });
  }

  loadMore(){
    this.productsService.getProductsByPage(this.limit, this.offset).subscribe((data: Product[]) => {
      this.products.push(...data)
      this.offset += this.limit
    })
  }
}

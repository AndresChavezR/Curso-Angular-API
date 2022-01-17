import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Product } from './../models/product.model';
import { CreateProductDTO, UpdateProductDTO } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'https://young-sands-07814.herokuapp.com/api/products'

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(limit?: number, offset?: number) {
    let params = new HttpParams();
    if(limit !== undefined && offset !== undefined ){
      params = params.set('limit', limit)
      params = params.set('offset', offset)
      return this.http.get<Product[]>('https://young-sands-07814.herokuapp.com/api/products',{ params});
    }else{
      return this.http.get<Product[]>('https://young-sands-07814.herokuapp.com/api/products');
    }
  }
  getProductById(id: string){
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
  }
  createProduct(data: CreateProductDTO){
    return this.http.post<Product>(this.apiUrl, data);
  }
  updateProduct(id: string ,data: UpdateProductDTO){
    //put deberias siempre enviar toda la información del producto, sin importar que hayamos cambiado solo un valor
    //patch la edición de un atributo
    return this.http.put<Product>(`${this.apiUrl}/${id}`, data);
  }
  deleteProduct(id: string){
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`)
  }

  getProductsByPage(limit: number, offset: number){
    return this.http.get<Product[]>(`${this.apiUrl}`, {
      params : {limit, offset}
    })
  }
}

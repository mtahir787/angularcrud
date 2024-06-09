import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  postProduct(product: any) {
    return this.http.post<any>('http://localhost:3000/productsList/', product);
  }
  getProduct() {
    return this.http.get<any>('http://localhost:3000/productsList/');
  }
  editProduct(data: any, id: number) {
    return this.http.put<any>('http://localhost:3000/productsList/' + id, data);
  }
  deleteProduct(id: number) {
    return this.http.delete<any>('http://localhost:3000/productsList/' + id);
  }
}

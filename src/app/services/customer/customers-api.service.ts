import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CustomersApiService {
  customers: any;

  constructor(private http: HttpClient) {}

  getCustomers() {
    return this.http.get<any>('http://localhost:3000/customers/');
  }
  postCustomer(customer: any) {
    return this.http.post<any>('http://localhost:3000/customers/', customer);
  }
  editCustomer(data: any, id: number) {
    return this.http.put<any>('http://localhost:3000/customers/' + id, data);
  }
  deleteCustomer(id: number) {
    return this.http.delete<any>('http://localhost:3000/customers/' + id);
  }
}

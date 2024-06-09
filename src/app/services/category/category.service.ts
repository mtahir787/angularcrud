import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<any>('http://localhost:3000/categories/');
  }
  getOneCategory(id: number) {
    return this.http.get<any>(`http://localhost:3000/categories/${id}`);
  }
  postCategory(data: any) {
    return this.http.post<any>('http://localhost:3000/categories/', data);
  }
  putCategory(id: number, data: any) {
    return this.http.put<any>(`http://localhost:3000/categories/${id}`, data);
  }
  deleteCategory(id: number) {
    return this.http.delete<any>('http://localhost:3000/categories/' + id);
  }
}

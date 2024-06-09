import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VendorApiService {
  vendorEditData: any;
  constructor(private http: HttpClient) {}
  getVendors() {
    return this.http.get<any>('http://localhost:3000/vendors');
  }
  postVendor(data: any) {
    return this.http.post<any>('http://localhost:3000/vendors', data);
  }
  editVendor(data: any) {
    this.vendorEditData = data;
  }
  updateVendor(data: any, id: number) {
    return this.http.put<any>('http://localhost:3000/vendors/' + id, data);
  }
  deleteVendor(id: number) {
    return this.http.delete<any>('http://localhost:3000/vendors/' + id);
  }
}

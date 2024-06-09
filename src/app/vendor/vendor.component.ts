import { Router } from '@angular/router';
import { VendorApiService } from './../services/vendor/vendor-api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss'],
})
export class VendorComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'vendorName',
    'address',
    'city',
    'mobile',
    'balance',
    'actions',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private vendorApiService: VendorApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getVendors();
  }

  getVendors() {
    this.vendorApiService.getVendors().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(res);
      },
      error: (err) => {
        console.log(`Vendors Get Error ${err}`);
      },
    });
  }

  editVendor(data: any) {
    this.vendorApiService.vendorEditData = data;
    this.router.navigateByUrl('/vendor/vendorform');
  }

  deleteVendor(id: number) {
    this.vendorApiService.deleteVendor(id).subscribe({
      next: (res) => {
        alert('Vendor has deleted Successfully');
        this.getVendors();
      },
      error: (err) => {
        console.log(`Vendor deletion failed ${err}`);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

import { CustomerDialogComponent } from './../customer-dialog/customer-dialog.component';
import { CustomersApiService } from './../services/customer/customers-api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  customers: any;

  displayedColumns: string[] = [
    'id',
    'customerName',
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
    private customersApiService: CustomersApiService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getCustomers();
  }
  getCustomers() {
    this.customersApiService.getCustomers().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
    });
  }

  editCustomer(data: any) {
    this.dialog
      .open(CustomerDialogComponent, {
        width: '70%',
        height: '600px',
        data,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'updated') {
          this.getCustomers();
          console.log('from updated');
        }
      });
  }
  deleteCustomer(id: number) {
    this.customersApiService.deleteCustomer(id).subscribe({
      next: (res) => {
        alert(`Customer has deleted succesfully`);
        console.log(res);

        this.getCustomers();
      },
      error: (err) => {
        alert('Customer Deletion Failed');
        console.log(`Customer Deletion Error: ${err}`);
      },
    });
  }

  openDialog() {
    this.dialog
      .open(CustomerDialogComponent, {
        width: '70%',
        height: '600px',
      })
      .afterClosed()
      .subscribe((val) => {
        this.getCustomers();
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

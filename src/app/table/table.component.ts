import { DialogComponent } from './../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from './../services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'productName',
    'category',
    'date',
    'freshness',
    'price',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private api: ApiService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllProducts();
  }
  getAllProducts() {
    this.api.getProduct().subscribe({
      next: (res) => {
        // console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.log('get product Error!:' + err);
      },
    });
  }
  editProduct(row: any) {
    this.dialog
      .open(DialogComponent, {
        width: '70%',
        height: '600px',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        this.getAllProducts();
      });
  }
  deleteProduct(id: number) {
    this.api.deleteProduct(id).subscribe({
      next: (res) => {
        alert('product has deleted successfuly');
        this.getAllProducts();
      },
      error: (err) => {
        alert('product deletion failed');
        console.log('product delete error:' + err);
      },
    });
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '70%',
      height: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getAllProducts();
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

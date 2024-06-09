import { ApiService } from './services/api.service';
import { DialogComponent } from './dialog/dialog.component';
import { Component, HostBinding, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TableComponent } from './table/table.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angularcrud';
  isDark: boolean = true;
  // @HostBinding('class')
  // get themeMode() {
  //   return this.isDark ? 'theme-dark' : 'theme-light';
  // }
  @ViewChild(TableComponent) TableComponent: any;

  constructor(private dialog: MatDialog, private api: ApiService) {}

  ngOnInit(): void {}

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '30%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.TableComponent.getAllProducts();
    });
  }
}

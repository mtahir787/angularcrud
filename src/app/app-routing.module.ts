import { AccountsFormComponent } from './accounts-form/accounts-form.component';
import { AccountsListComponent } from './accounts-list/accounts-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryComponent } from './category/category.component';
import { VendorFormComponent } from './vendor-form/vendor-form.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { VendorComponent } from './vendor/vendor.component';
import { CustomerComponent } from './customer/customer.component';
import { TableComponent } from './table/table.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/customers', pathMatch: 'full' },
  { path: 'customers', component: CustomerComponent, title: 'Customers Page' },
  {
    path: 'accounts-list',
    component: AccountsListComponent,
    title: 'Accounts List Page',
  },
  {
    path: 'accounts/:mode',
    component: AccountsFormComponent,
    title: 'Accounts Form Page',
  },
  {
    path: 'accounts/:mode/:accountId',
    component: AccountsFormComponent,
    title: 'Accounts Form Page',
  },
  {
    path: 'category-list',
    component: CategoryComponent,
    title: 'Category List Page',
  },
  {
    path: 'category/:mode',
    component: CategoryFormComponent,
    title: 'Category Form Page',
  },
  {
    path: 'category/:mode/:categoryid',
    component: CategoryFormComponent,
    title: 'Category Form Page',
  },
  { path: 'products', component: TableComponent, title: 'Products Page' },
  { path: 'vendor', component: VendorComponent, title: 'Vendor Page' },
  {
    path: 'vendor/vendorform',
    component: VendorFormComponent,
    title: 'Vendor Form Page',
  },
  { path: '**', component: NotFoundComponent, title: 'Customers Page' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

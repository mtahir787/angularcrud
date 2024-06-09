import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomersApiService } from './../services/customer/customers-api.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-dialog',
  templateUrl: './customer-dialog.component.html',
  styleUrls: ['./customer-dialog.component.scss'],
})
export class CustomerDialogComponent implements OnInit {
  customerForm!: FormGroup;
  actionButton: string = 'Save';

  constructor(
    public formBuilder: FormBuilder,
    private customerApi: CustomersApiService,
    private dialogRef: MatDialogRef<CustomerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public customerEditData: any
  ) {}

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      customerName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      mobile: ['', Validators.required],
      balance: ['', Validators.required],
    });
    if (this.customerEditData) {
      this.actionButton = 'Update';
      this.customerForm.controls['customerName'].setValue(
        this.customerEditData.customerName
      );
      this.customerForm.controls['address'].setValue(
        this.customerEditData.address
      );
      this.customerForm.controls['city'].setValue(this.customerEditData.city);
      this.customerForm.controls['mobile'].setValue(
        this.customerEditData.mobile
      );
      this.customerForm.controls['balance'].setValue(
        this.customerEditData.balance
      );
    }
  }
  addCustomer() {
    if (this.customerForm.invalid) {
      this.customerForm.markAllAsTouched();
      return;
    }
    if (this.customerEditData) {
      if (this.customerForm.valid) {
        this.updateCustomer();
      }
    } else {
      if (this.customerForm.valid) {
        this.customerApi.postCustomer(this.customerForm.value).subscribe({
          next: (res) => {
            console.log(JSON.stringify(res));

            alert(`Customer "${res.customerName}" has created succesfully`);
            this.customerForm.reset();
            this.dialogRef.close('save');
          },
          error: (err) => {
            console.log(`Create customer error ${err}`);
          },
        });
      }
    }
  }

  updateCustomer() {
    this.customerApi
      .editCustomer(this.customerForm.value, this.customerEditData.id)
      .subscribe({
        next: (res) => {
          alert('Customer has Updated Succesfully');
          this.customerForm.reset();
          this.dialogRef.close('updated');
        },
        error: (err) => {
          console.log(`Customer Update Error ${err}`);
        },
      });
  }
}

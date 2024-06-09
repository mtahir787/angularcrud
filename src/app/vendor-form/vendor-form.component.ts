import { VendorApiService } from './../services/vendor/vendor-api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor-form',
  templateUrl: './vendor-form.component.html',
  styleUrls: ['./vendor-form.component.scss'],
})
export class VendorFormComponent implements OnInit {
  vendorForm!: FormGroup;
  actionButton: string = 'Save';
  constructor(
    private formBuilder: FormBuilder,
    private vendorApiService: VendorApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.vendorForm = this.formBuilder.group({
      vendorName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      mobile: ['', Validators.required],
      balance: ['', Validators.required],
    });
    if (this.vendorApiService.vendorEditData) {
      this.actionButton = 'Update';
      this.vendorForm.controls['vendorName'].setValue(
        this.vendorApiService.vendorEditData.vendorName
      );
      this.vendorForm.controls['address'].setValue(
        this.vendorApiService.vendorEditData.address
      );
      this.vendorForm.controls['city'].setValue(
        this.vendorApiService.vendorEditData.city
      );
      this.vendorForm.controls['mobile'].setValue(
        this.vendorApiService.vendorEditData.mobile
      );
      this.vendorForm.controls['balance'].setValue(
        this.vendorApiService.vendorEditData.balance
      );
    }
  }
  addVendor() {
    if (this.vendorApiService.vendorEditData) {
      this.updateVendor();
    } else {
      if (this.vendorForm.valid) {
        this.vendorApiService.postVendor(this.vendorForm.value).subscribe({
          next: (res) => {
            alert('Vendor has created succesfully');
            this.vendorForm.reset();
            this.router.navigateByUrl('/vendor');
            console.log(`Vendor Created ${res}`);
          },
          error: (err) => {
            console.log(`Vendor Create Error ${err}`);
          },
        });
      }
    }
  }
  updateVendor() {
    if (this.vendorForm.valid) {
      this.vendorApiService
        .updateVendor(
          this.vendorForm.value,
          this.vendorApiService.vendorEditData.id
        )
        .subscribe({
          next: (res) => {
            alert(`Vendor has Updated Successfully`);
            this.vendorForm.reset();
            this.actionButton = 'Save';
            this.vendorApiService.vendorEditData = '';
            this.router.navigateByUrl('/vendor');
          },
          error: (err) => {
            console.log(`Vedor Update Error ${err}`);
          },
        });
    }
  }
}

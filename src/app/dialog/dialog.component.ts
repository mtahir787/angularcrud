import { CategoryService } from './../services/category/category.service';
import { ApiService } from './../services/api.service';
import { Component, Inject, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  freshnessList = ['Brand New', 'Second Hand', 'Refurnished'];
  productForm!: FormGroup;
  actionBtn: string = 'Save';
  categories: any;
  prodPageTitle = 'Add new Product';
  // selectedProdCategory!: string;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      date: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
    });
    // console.log(this.editData);
    this.categoryService.getCategories().subscribe({
      next: (res) => {
        this.categories = res;
        if (!this.editData) {
          this.productForm.controls['category'].setValue(
            this.categories[0].categoryName
          );
        }
      },
      error: (err) => {
        console.log(`error in get categories ${err}`);
      },
    });
    // console.log(this.editData);

    if (this.editData) {
      this.actionBtn = 'Update';
      this.prodPageTitle = 'Edit Current Product';
      this.productForm.controls['productName'].setValue(
        this.editData.productName
      );
      // this.selectedProdCategory = this.editData.category;

      this.productForm.controls['category'].setValue(this.editData.category);
      // console.log(this.selectedProdCategory);
      // console.log(this.productForm.controls['category'].getRawValue());

      this.productForm.controls['date'].setValue(this.editData.date);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comment'].setValue(this.editData.comment);
    }
  }

  addProduct() {
    // console.log(this.productForm.value);
    if (this.editData) {
      this.updateProduct();
    } else {
      if (this.productForm.valid) {
        this.api.postProduct(this.productForm.value).subscribe({
          next: (res) => {
            alert('Product has been added successfully.');
            this.productForm.reset();
            this.dialogRef.close('save');
          },
          error: (err: any) => {
            alert('Failed to add product');
            console.log(err);
          },
        });
      }
    }
  }
  updateProduct() {
    this.api.editProduct(this.productForm.value, this.editData.id).subscribe({
      next: (res) => {
        alert('product has updated successfully');
        this.productForm.reset();
        this.dialogRef.close('updated');
      },
      error: (err) => {
        alert('product updation failed');
        console.log('product update error:' + err);
      },
    });
  }

  // openDialog() {
  //   const dialogRef = this.dialog.open(DialogComponent, {
  //     width: '30%',
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }
}

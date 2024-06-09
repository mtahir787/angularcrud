import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from './../services/category/category.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit {
  categoryForm!: FormGroup;
  actionButton = 'Save';
  mode: string = '';
  categoryId!: number;
  btnColorClass: string = 'success';
  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log(`id ${this.categoryId}`);
    this.categoryForm = this.formBuilder.group({
      categoryName: ['', Validators.required],
    });
    this.activatedRoute.paramMap.subscribe((param) => {
      this.categoryId = Number(param.get('categoryid'));
      this.mode = param.get('mode') as string;
      console.log(`mode => ${this.mode}`);
      console.log(`ID => ${this.categoryId}`);
    });
    if (this.categoryId && this.mode === 'edit') {
      this.categoryService.getOneCategory(this.categoryId).subscribe({
        next: (res) => {
          console.log(`edit id data ${JSON.stringify(res)}`);
          this.categoryForm.controls['categoryName'].setValue(res.categoryName);
          this.actionButton = 'Update';
          this.btnColorClass = 'success';
        },
        error: (err) => {
          console.log(`edit id data error ${err}`);
        },
      });
    } else if (this.categoryId && this.mode === 'delete') {
      this.categoryService.getOneCategory(this.categoryId).subscribe({
        next: (res) => {
          console.log(`delete id data ${JSON.stringify(res)}`);
          this.categoryForm.controls['categoryName'].setValue(res.categoryName);
          this.actionButton = 'Delete';
          this.btnColorClass = 'danger';
        },
        error: (err) => {
          console.log(`delete id data error ${err}`);
        },
      });
    }
  }
  addCategory() {
    if (this.categoryForm.valid) {
      if (this.mode === 'create') {
        this.categoryService.postCategory(this.categoryForm.value).subscribe({
          next: (res) => {
            alert('Product created Successfully');
            this.categoryForm.reset();
            this.router.navigateByUrl('/category-list');
            this.mode = '';
          },
          error: (err) => {
            console.log(`Category create error ${err}`);
          },
        });
      } else if (this.mode === 'edit' && this.categoryId) {
        this.editCategory();
        // console.log('edit called');
      } else if (this.mode === 'delete' && this.categoryId) {
        this.deleteCategory();
      }
    }
  }
  editCategory() {
    this.categoryService
      .putCategory(this.categoryId, this.categoryForm.value)
      .subscribe({
        next: (res) => {
          console.log(`Category has Updated Succesfully`);
          this.categoryId = 0;
          this.mode = '';
          this.categoryForm.reset();
          this.router.navigateByUrl('category-list');
        },
        error: (err) => {
          console.log(`Edit Error => ${JSON.stringify(err)}`);
        },
      });
  }
  deleteCategory() {
    this.categoryService.deleteCategory(this.categoryId).subscribe({
      next: (res) => {
        alert('Catergory has deleted');
        this.router.navigateByUrl('/category-list');
      },
      error: (err) => {
        alert(`Category delete error ${err}`);
      },
    });
  }
  getClass() {
    return this.btnColorClass;
  }
}

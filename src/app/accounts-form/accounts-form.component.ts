import { Router, ActivatedRoute } from '@angular/router';
import { AccountsApiService } from './../services/accounts/accounts-api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accounts-form',
  templateUrl: './accounts-form.component.html',
  styleUrls: ['./accounts-form.component.scss'],
})
export class AccountsFormComponent implements OnInit {
  accountsTypes = ['Assets', 'Liabilities', 'Expenses', 'Capital', 'Revenue'];
  accountsCategories = [
    'Cash',
    'Bank',
    'Customer',
    'Inventory',
    'Fixed Assets',
    'Directors',
    'Vendor',
    'Payroll',
    'Other',
  ];
  bsPlTypes = ['Balance Sheet', 'Profit & Loss'];
  buttonAction = 'Save';
  buttonColorClass = 'success';
  AccountsPageTitle = 'Create New Account';

  mode!: string;
  accountId!: number;
  accountsForm!: FormGroup;
  dataDeleteUpdate: any;
  deleteMessage!: string;

  constructor(
    private formBuilder: FormBuilder,
    private accountsApiService: AccountsApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.accountsForm = this.formBuilder.group({
      accountCode: [{ value: '', disabled: true }],
      accountName: ['', Validators.required],
      accountType: ['', Validators.required],
      accountCategory: ['', Validators.required],
      bsPlType: ['', Validators.required],
    });

    // getting parameters from Route

    this.activatedRoute.paramMap.subscribe((param) => {
      this.mode = param.get('mode') as string;
      this.accountId = Number(param.get('accountId'));
      // console.log(this.mode);
      // console.log(this.accountId);
    });

    // update values on condition base

    if (this.mode && this.mode === 'create') {
      this.buttonAction = 'Save';
      this.buttonColorClass = 'success';
      this.accountsForm.controls['accountType'].setValue(this.accountsTypes[0]);
      this.accountsForm.controls['accountCategory'].setValue(
        this.accountsCategories[0]
      );
      this.accountsForm.controls['bsPlType'].setValue(this.bsPlTypes[0]);
      // console.log(
      //   this.accountsForm.controls['accountType'].getRawValue(),
      //   this.accountsForm.controls['accountCategory'].getRawValue(),
      //   this.accountsForm.controls['bsPlType'].getRawValue()
      // );
    } else if (this.mode && this.mode === 'edit') {
      this.buttonAction = 'Update';
      this.buttonColorClass = 'success';
      this.accountsApiService.getAccount(this.accountId).subscribe({
        next: (res) => {
          this.dataDeleteUpdate = res;
          this.setFormData();
        },
        error: (err) => {
          console.log(`Error in getting data ${err}`);
        },
      });
    } else if (this.mode && this.mode === 'delete') {
      this.buttonAction = 'Delete';
      this.buttonColorClass = 'danger';
      this.AccountsPageTitle = 'Edit Current Account';
      this.deleteMessage =
        'Are you sure to delete Account,if yes press delete button';
      this.accountsApiService.getAccount(this.accountId).subscribe({
        next: (res) => {
          this.dataDeleteUpdate = res;
          this.setFormData();
          // console.log(res);
        },
        error: (err) => {
          console.log(`Error in getting data ${err}`);
        },
      });
    }
  }

  // Create, Edit and Delete Method
  onSubmit() {
    if (this.mode === 'create') {
      if (this.accountsForm.valid) {
        this.accountsApiService
          .getMaxId(this.accountsForm.controls['accountType'].value)
          .then((id) => {
            this.accountsForm.controls['accountCode'].setValue(id);
            this.accountsApiService
              .postAccount(this.accountsForm.value)
              .subscribe({
                next: (res) => {
                  alert('Account has created Scuccesfylly');
                  this.accountsForm.reset();
                  this.router.navigateByUrl('/accounts-list');
                },
                error: (err) => {
                  alert(`Account Creation Error ${err}`);
                },
              });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else if (this.mode === 'edit' && this.accountId) {
      if (this.accountsForm.valid) {
        this.accountsApiService
          .putAccount(this.accountsForm.value, this.accountId)
          .subscribe({
            next: (res) => {
              alert(`Account has Updated Successfully`);
              this.accountId = 0;
              this.mode = '';
              this.router.navigateByUrl('/accounts-list');
            },
            error: (err) => {
              console.log(`Account Updation Error ${err}`);
            },
          });
      }
    } else if (this.mode === 'delete' && this.accountId) {
      if (this.accountsForm.valid) {
        this.accountsApiService.deleteAccount(this.accountId).subscribe({
          next: (res) => {
            alert(`Account has deleted Successfully`);
            this.accountId = 0;
            this.mode = '';
            this.router.navigateByUrl('/accounts-list');
          },
          error: (err) => {
            console.log(`Account deletion Error ${err}`);
          },
        });
      }
    }
  }
  //  method to update button color and text
  getClass() {
    if (this.mode === 'create' && !this.accountsForm.valid) {
      this.buttonColorClass = 'disabledButton';
      return this.buttonColorClass;
    } else if (this.mode === 'create') {
      this.buttonColorClass = 'success';
    }
    return this.buttonColorClass;
  }

  // change account type when account category dropdown value changes
  onAccountCategoryChange(value: string) {
    // console.log(value);
    if (
      value === 'Cash' ||
      value === 'Bank' ||
      value === 'Customer' ||
      value === 'Inventory' ||
      value === 'Fixed Assets' ||
      value === 'Directors'
    ) {
      this.accountsForm.controls['accountType'].setValue('Assets');
    } else if (value === 'Vendor') {
      this.accountsForm.controls['accountType'].setValue('Liabilities');
    } else if (value === 'Payroll') {
      this.accountsForm.controls['accountType'].setValue('Expenses');
    } else if (value === 'Other') {
      this.accountsForm.controls['accountType'].setValue('Capital');
    }
  }

  // set form data in update delete case
  setFormData() {
    this.accountsForm.controls['accountCode'].setValue(
      this.dataDeleteUpdate.accountCode
    );
    this.accountsForm.controls['accountName'].setValue(
      this.dataDeleteUpdate.accountName
    );
    this.accountsForm.controls['accountType'].setValue(
      this.dataDeleteUpdate.accountType
    );
    this.accountsForm.controls['accountCategory'].setValue(
      this.dataDeleteUpdate.accountCategory
    );
    this.accountsForm.controls['bsPlType'].setValue(
      this.dataDeleteUpdate.bsPlType
    );
  }
}

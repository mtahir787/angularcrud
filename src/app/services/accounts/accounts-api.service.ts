import { filter, map, max, Observable, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface AccountType {
  value: string;
  viewValue: string;
}
export interface AccountCategory {
  value: string;
  viewValue: string;
}
export interface BsPlType {
  value: string;
  viewValue: string;
}
export interface Account {
  accountCode: string;
  accountName: string;
  accountType: string;
  accountCategory: string;
  bsPlType: string;
}

@Injectable({
  providedIn: 'root',
})
export class AccountsApiService {
  constructor(private http: HttpClient) {}

  getAllAccounts(): Observable<void | any> {
    return this.http.get<any>('http://localhost:3000/accounts/');
  }
  getAccount(id: number) {
    return this.http.get<any>(`http://localhost:3000/accounts/${id}`);
  }
  postAccount(data: Account) {
    console.log(data.accountCode);
    return this.http.post<any>('http://localhost:3000/accounts/', data);
  }
  putAccount(data: Account, id: number) {
    return this.http.put<any>(`http://localhost:3000/accounts/${id}`, data);
  }
  deleteAccount(id: number) {
    return this.http.delete<any>(`http://localhost:3000/accounts/${id}`);
  }

  getMaxId(accountType: string): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      let nextAccountCode = '';
      this.getAllAccounts().subscribe({
        next: (result) => {
          let accountCodesArray = result
            .filter((acc: Account) => {
              return acc.accountType === accountType;
            })
            .map((acc: Account) => {
              return acc.accountCode;
            });
          let maxAccountCode =
            accountCodesArray.length > 0 ? Math.max(...accountCodesArray) : 0;
          console.log(
            `checking account code => ${maxAccountCode} and acount type is ${accountType}`
          );

          if (maxAccountCode > 0) {
            ++maxAccountCode;
          } else {
            switch (accountType) {
              case 'Assets':
                maxAccountCode = 100000;
                break;
              case 'Liabilities':
                maxAccountCode = 200000;
                break;
              case 'Capital':
                maxAccountCode = 300000;
                break;
              case 'Expenses':
                maxAccountCode = 400000;
                break;
              case 'Revenue':
                maxAccountCode = 500000;
                break;
              default:
                break;
            }
            maxAccountCode += 1;
          }
          nextAccountCode = maxAccountCode.toString();
          console.log(nextAccountCode);
          resolve(nextAccountCode);

          // if (accountType === 'Assets' && maxAccountCode != 0) {
          //   ++maxAccountCode;
          // } else if (accountType === 'Assets' && maxAccountCode == 0) {
          //   maxAccountCode = 100000;
          // } else if (accountType === 'Liabilities' && maxAccountCode != 0) {
          //   ++maxAccountCode;
          // } else if (accountType === 'Liabilities' && maxAccountCode == 0) {
          //   maxAccountCode = 200000;
          // } else if (accountType === 'Capital' && maxAccountCode != 0) {
          //   ++maxAccountCode;
          // } else if (accountType === 'Capital' && maxAccountCode == 0) {
          //   maxAccountCode = 300000;
          // } else if (accountType === 'Expenses' && maxAccountCode != 0) {
          //   ++maxAccountCode;
          // } else if (accountType === 'Expenses' && maxAccountCode == 0) {
          //   maxAccountCode = 400000;
          // } else if (accountType === 'Revenue' && maxAccountCode != 0) {
          //   ++maxAccountCode;
          // } else if (accountType === 'Revenue' && maxAccountCode == 0) {
          //   maxAccountCode = 500000;
          // }
        },
        error: (err) => {
          reject('Error in getting code' + err);
        },
      });
    });
    return promise;
  }
}

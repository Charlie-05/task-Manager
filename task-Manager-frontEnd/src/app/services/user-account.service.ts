import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAccount } from '../Models/userAccount';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {


  constructor(private http : HttpClient) { }

  getUsers() {
    return this.http.get<any[]>("http://localhost:5022/api/Users");
  }

  createUserAccount(userAccount :UserAccount){
    return this.http.post<UserAccount>("http://localhost:5022/api/UserAccount/Register-User" , userAccount)
  }

  logIn(userAccount : UserAccount){
    return this.http.post<UserAccount>("http://localhost:5022/api/UserAccount/Log-In" , userAccount)
  }
}
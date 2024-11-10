import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IToken, UserAccount } from '../Models/userAccount';
import { jwtDecode } from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class UserAccountService {


  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<any[]>("http://localhost:5022/api/Users");
  }
  createUserAccount(userAccount: UserAccount) {
    return this.http.post<UserAccount>("http://localhost:5022/api/UserAccount/Register-User", userAccount)
  }
  logIn(userAccount: UserAccount) {
    return this.http.post<IToken>("http://localhost:5022/api/UserAccount/Log-In", userAccount)
  }

  isLoggedIn() {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded: any = jwtDecode(token);
        localStorage.setItem('user', JSON.stringify(decoded));
      }
      return true;
    }
    return false;
  }

}

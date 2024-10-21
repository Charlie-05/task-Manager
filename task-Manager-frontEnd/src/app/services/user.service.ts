import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  getUsers() {
    return this.http.get<User[]>("http://localhost:5022/api/Users");
  }

  createuser(user :User){
    return this.http.post("http://localhost:5022/api/Users" , user)
  }

  deleteUser(userId : number){
    return this.http.delete("http://localhost:5022/api/Users/" + userId)
  }

  getUserById(userId : number){
    return this.http.get<User>("http://localhost:5022/api/Users/" + userId)
  }

  editUser(user : User , userId : number){
    return this.http.put("http://localhost:5022/api/Users/" + userId , user);
  }
}

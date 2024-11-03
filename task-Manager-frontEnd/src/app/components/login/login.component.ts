import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserAccountService } from '../../services/user-account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  logInData : any;
onLogIn() {
  this.logInData = this.logInForm.value; 
  this.userAccountService.logIn(this.logInData).subscribe(data => {
    console.log(data);
  })
}

  logInForm : any;
   constructor(private fb : FormBuilder , private userAccountService : UserAccountService){
    this.logInForm = this.fb.group({
      email : [''],
      password : ['']
    })
   }
}

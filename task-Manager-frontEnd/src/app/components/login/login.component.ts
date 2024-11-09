import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserAccountService } from '../../services/user-account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  logInData: any;


  onLogIn() {
    this.logInData = this.logInForm.value;
    this.userAccountService.logIn(this.logInData).subscribe(data => {
      console.log(data);
      localStorage.setItem('token' , data.token)
      this.toastr.success("Log in Successful...")
      this.router.navigate(['admin/tasks']);
    }, error =>{
      // console.log(error.error);
      this.toastr.error(error.error);
    })
  }

  logInForm: any;
  constructor(private fb: FormBuilder, private userAccountService: UserAccountService , private router : Router , private toastr : ToastrService) {
    this.logInForm = this.fb.group({
      email: [''],
      password: ['']
    })
  }
}

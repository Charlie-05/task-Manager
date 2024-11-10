import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserAccountService } from '../../services/user-account.service';
import { Roles, UserAccount } from '../../Models/userAccount';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  passwordInput!: string;
  registerForm: any;
  userAccount! : UserAccount;

  checkPassword(event: any) {
    if (event.target.value != this.passwordInput) {
      console.log(false);
    } else {
      console.log(true);
    }
  }
  onRegister() {
   this.userAccount = this.registerForm.value;
   this.userAccount.role = parseInt(this.userAccount.role);
   this.userAccountService.createUserAccount(this.userAccount).subscribe(data =>{
    console.log(data);
   })
  }


  constructor(private fb: FormBuilder , private userAccountService : UserAccountService) {
    this.registerForm = this.fb.group({
      fullName: ['' , [Validators.required]],
      email: ['' , [Validators.required , Validators.email]],
      password: ['' , [Validators.required]],
      role: ['' , [Validators.required]],
    })
  }

}

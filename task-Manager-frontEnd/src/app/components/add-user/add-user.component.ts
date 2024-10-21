import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { User } from '../../Models/user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  addUserForm: any;
  user: any;
  currentUserId: any;
  currentUser: User | undefined;
  isEditForm : boolean = false;

  constructor(private route: ActivatedRoute, private userService: UserService, private fb: FormBuilder, private router: Router, private toastr: ToastrService) {
    this.currentUserId = this.route.snapshot.paramMap.get("id");
    if(this.currentUserId){
      this.isEditForm = true;
    }
    this.addUserForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
      email: [''],
      phone: [''],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    if(this.isEditForm){
      this.userService.getUserById(this.currentUserId).subscribe(data => {
        this.currentUser = data;
        console.log(data);
        this.addUserForm.patchValue(data);
      })
    }
  }


  onAddUser() {
    this.user = (this.addUserForm.value);
    this.user.id = 0;
    this.userService.createuser(this.user).subscribe(data => {
      this.toastr.success("successfully added", "Success")
      this.router.navigate(['/users']);
    })
  }

  onEditUser() {
    let user = (this.addUserForm.value);
    this.userService.editUser(user, this.currentUser ? this.currentUser.id : 0).subscribe(data => {
      this.toastr.success('successfully updated', 'Success');
      this.router.navigate(['/users']);
    });
  }
}

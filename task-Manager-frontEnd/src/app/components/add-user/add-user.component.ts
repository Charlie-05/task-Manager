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
  currentUser!: User;
  isEditForm: boolean = false;
  isSubmmited: boolean = false;
  loadingIndicator: boolean = false;

  constructor(private route: ActivatedRoute, private userService: UserService, private fb: FormBuilder, private router: Router, private toastr: ToastrService) {
    this.currentUserId = this.route.snapshot.paramMap.get("id");
    if (this.currentUserId) {
      this.isEditForm = true;
    }
    this.addUserForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
      email: ['', [Validators.email]],
      phone: [''],
      password: ['', [Validators.required]],
      address: this.fb.group({
        addressLine1: ['', Validators.required],
        addressLine2: [''],
        city: ['']
      })
    })
  }

  ngOnInit(): void {
    if (this.isEditForm) {
      this.userService.getUserById(this.currentUserId).subscribe(data => {
        this.currentUser = data;
        console.log(data);
        this.addUserForm.patchValue(data);
      })
    }
  }


  onAddUser() {
    this.isSubmmited = true;
    this.loadingIndicator = true;
    this.user = (this.addUserForm.value);

    if (this.addUserForm.valid) {
      this.user.id = 0;
      // this.userService.createuser(this.user).subscribe(data => {
      //   this.toastr.success("successfully added", "Success");
      //   this.router.navigate(['/users']);
      //   this.isSubmmited = false;

      // })
      this.userService.createuser(this.user).subscribe({
        next: (res: any) => {
          this.toastr.success("successfully added", "Success");
        },
        complete: () => {
          this.router.navigate(['/users']);
          this.isSubmmited = false;
          this.loadingIndicator = false;

        },
        error: (err: any) => {
          this.isSubmmited = false;
          this.loadingIndicator = false;

        }
      })
    } else if (this.isEditForm == true) {
      let user = (this.addUserForm.value);
      this.userService.editUser(user, this.currentUser.id).subscribe(data => {
        this.isSubmmited = false;
        this.toastr.success('successfully updated', 'Success');
        this.router.navigate(['/users']);
      });
    }
    else {
      this.isSubmmited = false;
      this.loadingIndicator = false;
    }



  }

}

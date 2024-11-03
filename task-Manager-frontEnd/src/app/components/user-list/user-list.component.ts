import { Component, TemplateRef } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../Models/user';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

  constructor(private userService: UserService, private modalService: BsModalService, private toastr: ToastrService) {

  }

  users: User[] = [];
  features = {
    searchUser: ''
  }

  delUserId: number = 0;

  modalRef?: BsModalRef;

  ngOnInit(): void {
    this.loadUsers();
  }

  onDeleteUser(userId: number, template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
    this.delUserId = userId;
  }

  loadUsers() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    })
  }

  confirm(): void {
    this.userService.deleteUser(this.delUserId).subscribe(data => {
      this.loadUsers();
      this.toastr.success("successfully deleted", "Success");
      this.modalRef?.hide();
    })

  }

  decline(): void {
    this.modalRef?.hide();
  }
}

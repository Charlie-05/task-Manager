import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../Models/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

  constructor(private userService : UserService){

  }

  users : User[] = [];
  features = {
    searchUser : ''
  }
 

  ngOnInit() : void{
    this.loadUsers();
  }

  onDeleteUser(userId : number){
    if(confirm("Do you want to delete this user?")){
      this.userService.deleteUser(userId).subscribe(data => {
        this.loadUsers();
       })
    }
  }

  loadUsers(){
    this.userService.getUsers().subscribe(data =>{
      this.users = data;
    })
  }

  // modalRef?: BsModalRef;
  // message?: string;
  // constructor(private modalService: BsModalService) {}
 
  // openModal(template: TemplateRef<void>) {
  //   this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  // }
 
  // confirm(): void {
  //   this.message = 'Confirmed!';
  //   this.modalRef?.hide();
  // }
 
  // decline(): void {
  //   this.message = 'Declined!';
  //   this.modalRef?.hide();
  // }
}

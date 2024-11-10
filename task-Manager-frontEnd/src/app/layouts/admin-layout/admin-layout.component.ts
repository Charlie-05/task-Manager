import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {
  constructor(private router: Router, private modalService: BsModalService) { }

  bsModalRef?: BsModalRef;

  openModalWithComponent() {
    const initialState: ModalOptions = {
      initialState: {
        list: ['Open a modal with component', 'Pass your data', 'Do something else', '...'],
        title: 'Modal with component'
      }
    };
    this.bsModalRef = this.modalService.show(ModalContentComponent, initialState);
    this.bsModalRef.content.closeBtnName = 'Close';
  }
  onLogOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login'])
  }

}
/* This is a component which we pass in modal*/

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title pull-left">{{ title }}</h4>
      <button type="button" class="btn-close close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
        <span aria-hidden="true" class="visually-hidden">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <ul *ngIf="list.length">
        <li *ngFor="let item of list">{{ item }}</li>
      </ul>
      <div>
       <h6>Name : {{user.Name}}</h6>
       <h6>Email : {{user.Email}}</h6>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-default" (click)="bsModalRef.hide()">{{ closeBtnName }}</button>
    </div>
  `
})
export class ModalContentComponent implements OnInit {
  title?: string;
  closeBtnName?: string;
  list: string[] = [];
  user!: IUserToken;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.list.push('PROFIT!!!');
    let user: IUserToken = JSON.parse(localStorage.getItem("user") || '');
    this.user = user
  }
}

export interface IUserToken {
  Email: string,
  Name: string,
  Role: string,
  UserId: string,
}

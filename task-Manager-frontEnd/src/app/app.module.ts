import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TaskListComponent } from './components/task-list/task-list.component';
import { CommonModule } from '@angular/common';
import { TaskAddComponent } from './components/task-add/task-add.component';
import { TaskEditComponent } from './components/task-edit/task-edit.component';
import { FormArray, FormsModule, ReactiveFormsModule, UntypedFormArray } from '@angular/forms';
import { SearchTaskPipe } from './pipes/search-task.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { UserListComponent } from './components/user-list/user-list.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { SearchUserPipe } from './pipes/search-user.pipe';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MyInterceptorService } from './interceptors/my-interceptor.service';




@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TaskAddComponent,
    TaskEditComponent,
    SearchTaskPipe,
    UserListComponent,
    AddUserComponent,
    SearchUserPipe,
    RegisterComponent,
    LoginComponent,
    BlankLayoutComponent,
    AdminLayoutComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    //TooltipModule.forRoot(),
    BsDatepickerModule,

  ],
  providers: [BsModalService, provideAnimationsAsync(), {
    provide : HTTP_INTERCEPTORS , useClass : MyInterceptorService , multi : true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

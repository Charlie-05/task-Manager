import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskAddComponent } from './components/task-add/task-add.component';
import { TaskEditComponent } from './components/task-edit/task-edit.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [


  {
    path: 'admin', component: AdminLayoutComponent,
    canActivate : [AuthGuard],
    children: [
      { path: 'tasks', component: TaskListComponent },
      { path: 'users', component: UserListComponent },
      { path: 'add-user', component: AddUserComponent },
      { path: 'add-task', component: TaskAddComponent },
      { path: 'edit-task/:id', component: TaskEditComponent },
      { path: 'edit-user/:id', component: AddUserComponent },
    ]
  }, {
    path: '', component: BlankLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      {path : '**' , redirectTo : 'login' , pathMatch : 'full'}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
;

import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { Task } from '../../Models/task';
import { User } from '../../Models/user';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrl: './task-add.component.css'
})
export class TaskAddComponent implements OnInit{

  addTaskForm: any;
  task!: Task;
  users! : User[];
  constructor(private fb: FormBuilder, private taskService: TaskService, private router: Router, private toastr: ToastrService, private userService: UserService) {
    this.addTaskForm = this.fb.group({
      title: ['', [Validators.required]],
      description: [''],
      dueDate: [''],
      priority: ['', [Validators.required]],
      assigneeId : [''],
      checkLists : this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data =>{
     // console.log(data);
      this.users = data;
    })
  }
  get myCheckLists(): FormArray {
    return this.addTaskForm.get('checkLists') as FormArray;
  }

  addCheckList(){
    this.myCheckLists.push(this.fb.group({
      name : ['',[Validators.required]],
      isDone : [false]
    }))
  }
  
  removeCheckList(index : number){
    this.myCheckLists.removeAt(index);
  }

  onAddTask() {
    this.task = (this.addTaskForm.value);
    this.taskService.createtask(this.task).subscribe(data => {
      this.toastr.success("successfully added", "Success")
      this.router.navigate(['/tasks']);
    })
  }



}

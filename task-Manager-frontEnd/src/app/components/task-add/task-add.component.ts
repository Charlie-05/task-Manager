import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrl: './task-add.component.css'
})
export class TaskAddComponent {

  addTaskForm : any ;

  constructor(private fb : FormBuilder , private taskService : TaskService , private router : Router , private toastr : ToastrService){
    this.addTaskForm = this.fb.group({
      title : ['' , [Validators.required]],
    description : [''],
    dueDate : [''],
    priority : ['' , [Validators.required]]
    })
  }

  task : any;
  onAddTask(){
    this.task = (this.addTaskForm.value);
    this.taskService.createtask(this.task).subscribe(data => {
      this.toastr.success("successfully added" , "Success")
      this.router.navigate(['/']);
    })
  }



}

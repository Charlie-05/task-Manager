import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Task } from '../../Models/task';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { User } from '../../Models/user';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.css'
})
export class TaskEditComponent {

  currentTaskId: any;
  currentTask: Task | undefined;
  editTaskForm: any;
  users! : User[];

  constructor(private route: ActivatedRoute, private taskService: TaskService, private fb: FormBuilder , private router : Router , private toastr : ToastrService ,  private userService : UserService) {
    this.currentTaskId = this.route.snapshot.paramMap.get("id");
    this.editTaskForm = this.fb.group({
      id: [''],
      title: ['', [Validators.required]],
      description: [''],
      dueDate: [''],
      priority: ['', [Validators.required]],
      assigneeId : ['']
    })
  }

  ngOnInit(): void {
    this.taskService.getTaskById(this.currentTaskId).subscribe(data => {
      this.currentTask = data;
      this.editTaskForm.patchValue(data);
      this.editTaskForm.get('dueDate').patchValue( new Date(data.dueDate).toISOString().slice(0,10));
    })
      this.userService.getUsers().subscribe(data =>{
        console.log(data);
        this.users = data;
      })
    
  }

  onEditTask() {
    let task = (this.editTaskForm.value);
    this.taskService.editTask(task , this.currentTask ? this.currentTask.id : 0 ).subscribe(data => {
      this.toastr.success('successfully updated', 'Success');
      this.router.navigate(['/tasks']);
    });
  }
}

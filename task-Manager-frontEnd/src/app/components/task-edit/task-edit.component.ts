import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Task } from '../../Models/task';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.css'
})
export class TaskEditComponent {

  currentTaskId: any;
  currentTask: Task | undefined;
  editTaskForm: any;

  constructor(private route: ActivatedRoute, private taskService: TaskService, private fb: FormBuilder , private router : Router , private toastr : ToastrService) {
    this.currentTaskId = this.route.snapshot.paramMap.get("id");
    this.editTaskForm = this.fb.group({
      id: [''],
      title: ['', [Validators.required]],
      description: [''],
      dueDate: [''],
      priority: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.taskService.getTaskById(this.currentTaskId).subscribe(data => {
      this.currentTask = data;
      this.editTaskForm.patchValue(data);
      this.editTaskForm.get('dueDate').patchValue( new Date(data.dueDate).toISOString().slice(0,10));
    })
  }

  onEditTask() {
    let task = (this.editTaskForm.value);
    this.taskService.editTask(task , this.currentTask ? this.currentTask.id : 0 ).subscribe(data => {
      this.toastr.success('successfully updated', 'Success');
      this.router.navigate(['/']);
    });
  }
}

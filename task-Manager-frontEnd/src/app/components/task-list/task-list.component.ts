import { Component, TemplateRef } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../Models/task';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {

  constructor(private taskService: TaskService, private modalService: BsModalService, private toastr: ToastrService) {

  }

  tasks: Task[] = [];
  features = {
    searchTask: ''
  }

  isDelete: string = "";
  modalRef?: BsModalRef;
  delTaskId: number = 0;

  ngOnInit(): void {
    this.loadTasks();
  }

  onDeleteTask(taskId: number, template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
    this.delTaskId = taskId;

  }

  loadTasks() {
    this.taskService.getTasks().subscribe(data => {
      this.tasks = data;
      console.log(data);
    })
  }

  confirm(): void {
    this.taskService.deleteTask(this.delTaskId).subscribe(data => {
      this.toastr.success("Successfully Deleted", "Success")
      this.modalRef?.hide();
      this.loadTasks();
    })
  }

  decline(): void {
    this.modalRef?.hide();
  }

}

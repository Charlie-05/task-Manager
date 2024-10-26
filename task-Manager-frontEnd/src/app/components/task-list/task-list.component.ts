import { Component, TemplateRef } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../Models/task';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {

  constructor(private taskService: TaskService, private modalService: BsModalService) {

  }

  tasks: Task[] = [];
  features = {
    searchTask: ''
  }

  isDelete : string = "";
  modalRef?: BsModalRef;
  message?: string;

  ngOnInit(): void {
    this.loadTasks();
  }

  onDeleteTask(taskId: number , template: TemplateRef<void>) {
     if(confirm("Do you want to delete this?")){
      this.taskService.deleteTask(taskId).subscribe(data => {
        this.loadTasks();
        this.message = 'Confirmed!';
        console.log(true)
      })
    }
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(data => {
      this.tasks = data;
      console.log(data);
    })
  }



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

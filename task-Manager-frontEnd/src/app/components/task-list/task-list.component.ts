import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../Models/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {

  constructor(private taskService : TaskService){

  }

  tasks : Task[] = [];
  features = {
    searchTask : ''
  }
 

  ngOnInit() : void{
    this.loadTasks();
  }

  onDeleteTask(taskId : number){
    if(confirm("Do you want to delete this task?")){
      this.taskService.deleteTask(taskId).subscribe(data => {
        this.loadTasks();
       })
    }
  }

  loadTasks(){
    this.taskService.getTasks().subscribe(data =>{
      this.tasks = data;
    })
  }


}

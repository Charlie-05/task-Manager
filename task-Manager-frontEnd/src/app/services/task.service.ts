import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../Models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http : HttpClient) { }

  getTasks() {
    return this.http.get<Task[]>("http://localhost:5022/api/TaskItems");
  }

  createtask(task :Task){
    return this.http.post("http://localhost:5022/api/TaskItems" , task)
  }

  deleteTask(taskId : number){
    return this.http.delete("http://localhost:5022/api/TaskItems/" + taskId)
  }

  getTaskById(taskId : number){
    return this.http.get<Task>("http://localhost:5022/api/TaskItems/" + taskId)
  }

  editTask(task : Task , taskId : number){
    return this.http.put("http://localhost:5022/api/TaskItems/" + taskId , task);
  }
}

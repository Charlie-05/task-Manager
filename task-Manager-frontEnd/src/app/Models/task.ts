export interface Task {
    id : number;
    title : string ;
    description : string ;
    dueDate : string;
    priority : string ;

    // constructor(obj : any){
    //     this.id = obj.id != null ? obj.id : null;
    //     this.title = obj.title != null ? obj.title : null;
    //     this.description = obj.description != null ? obj.description : null;
    //     this.dueDate = obj.dueDate != null ? obj.dueDate : null;
    //     this.priority = obj.priority != null ? obj.priority : null;
    // }
}
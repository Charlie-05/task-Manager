import { Address } from "./address";
import { Task } from "./task";

export interface User {
    id : number;
    name : string ;
    email : string ;
    phone : string;
    password : string ;
    address? : Address;
    tasks : Task[];
}
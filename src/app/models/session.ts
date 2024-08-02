import { Licence } from "./licence";
import { User } from "./user";

export interface Session{
    id:number,
    startTime:Date,
    endTime:Date,
    licence?:Licence,
    user?:User,
    course?:string,
    userNotes?:string,
    
}
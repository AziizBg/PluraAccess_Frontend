import { Session } from "./session";

export interface Licence{
    id:number,
    email?:string,
    currentSession?:Session,
    bookedByUserId?:number
}
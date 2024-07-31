import { Session } from "./session";

export interface User{
    id:number,
    name:string,
    sessions?:Session[],
}
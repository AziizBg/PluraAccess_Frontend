import { Session } from "./session";

export interface User{
    id:number,
    name:string,
    sessions?:Session[],
    isStudying?:boolean,
    isRequesting?:boolean,
    queuePosition?:number,
}
import { Licence } from "./licence";

export interface Session{
    id:number,
    startTime:Date,
    endTime:Date,
    licence?:Licence,
    
}
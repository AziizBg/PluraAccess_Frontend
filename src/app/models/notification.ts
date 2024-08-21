export interface Notification {
    title:string;
    message:string;
    createdAt?:Date;
    userId?: number;
    licenceId?:number;
}

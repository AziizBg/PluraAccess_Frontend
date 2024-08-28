import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseSchema } from '../dto/response.schema';
import { Session } from '../models/session';
import { PaginationDto } from '../dto/pagination';
import { PaginatedResponseSchema } from '../dto/paginated-response.schema';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http:HttpClient) { }

  getAll(user_id:number, pagination:PaginationDto){
    let params = new HttpParams();

    // Check if pageIndex is not null or undefined
    params = pagination.pageIndex != null ? params.set('pageIndex', pagination.pageIndex) : params;
    params = pagination.pageSize != null ? params.set('pageSize', pagination.pageSize) : params;

    return this.http.get<PaginatedResponseSchema>('https://localhost:7189/api/Session/user/'+user_id, {params});
  }

  editSession(session:Session){
    console.log('in sessions service');
    delete session.licence;
    delete session.user;
    return this.http.put<ResponseSchema>('https://localhost:7189/api/Session/'+session.id, session);
  }

  deleteSession(session:Session){
    console.log('in sessions service');
    return this.http.delete<ResponseSchema>('https://localhost:7189/api/Session/'+session.id);
  }
}

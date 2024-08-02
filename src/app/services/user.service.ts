import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseSchema } from '../models/response.schema';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  getUser(){
        return this.http.get('https://localhost:7189/api/User/'+USER_ID);
  }
}
export const USER_ID = 1;
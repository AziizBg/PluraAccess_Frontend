import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseSchema } from '../models/response.schema';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http:HttpClient) { }

  getAll(){
        return this.http.get<ResponseSchema>('https://localhost:7189/api/Session');
  }
}

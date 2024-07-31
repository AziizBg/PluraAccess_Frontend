import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Licence } from '../models/licence';
import { ResponseSchema } from '../models/response.schema';

@Injectable({
  providedIn: 'root'
})
export class LicenceService {

  constructor(private http:HttpClient) { }

  getAll(){
    // return this.http.get<Licence[]>('https://localhost:7189/api/Licence');
        return this.http.get<ResponseSchema>('https://localhost:7189/api/Licence');

  }
}

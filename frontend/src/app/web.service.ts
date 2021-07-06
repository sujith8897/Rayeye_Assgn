import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import Date from './models/dates';


@Injectable({
  providedIn: 'root'
})
export class WebService {
  readonly ROOT_URL;
  constructor(private http: HttpClient) { 
    this.ROOT_URL = "http://localhost:3000";
  }

  get(){
   var a = this.http.get<Date[]>(`${this.ROOT_URL}`);
   return a;
  }

}

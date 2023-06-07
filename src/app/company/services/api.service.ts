import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers:new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

const apiURL="http://localhost:3000/api/"

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  login(email:string, password:string)
  {
    const body='{"email": "'+ email+'", "password":"'+ password+'"}'
    return this.http.post(apiURL, body, httpOptions)
  }

  register(body:any)
  {
    return this.http.post(apiURL, body, httpOptions)
  }
}

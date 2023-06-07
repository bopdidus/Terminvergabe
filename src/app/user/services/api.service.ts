import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers:new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

const apiURL="http://192.168.1.103:3000/users"

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

  register(body:string)
  {
    const params = JSON.parse(body)
    return this.http.post(apiURL, params, httpOptions)
  }

}

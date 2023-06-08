import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers:new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

const apiURL="http://localhost:3000/"

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  setAppointment(date: string){
    const body='{"date":'+ date + '", "time":"13:00"'
    return this.http.post(apiURL, body, httpOptions)
  }
  
  login(email:string, password:string)
  {
    const body='{"email": "'+ email+'", "password":"'+ password+'"}'
    console.log(body)
    return this.http.post(apiURL+"login", body, httpOptions)
  }

  register(body:string)
  {
    const params = JSON.parse(body)
    return this.http.post(apiURL+"users", params, httpOptions)
  }
}

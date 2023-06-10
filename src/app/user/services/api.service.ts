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

  setAppointment()
  {
    const body='{"date":"23/07/23", "time":"13:00", "userID":"11111", "clerkID":"99999"}' // id of Users in appointment
    console.log(body)
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

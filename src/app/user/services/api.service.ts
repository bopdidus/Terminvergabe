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
  
  setAppointment(body: string)
  {
    const params = JSON.parse(body)
    return this.http.post(apiURL+"appointments", params, httpOptions)
  }
  
  getClerks(){ //UserControlle allClerks !!!
    return this.http.get(apiURL+"users-clerks", httpOptions)
  }

  getTimes(id: string){
    return this.http.get(apiURL + "disponibilitiesByUser/" + id, httpOptions)
  }

  getUsersAppointments(id: string){
    return this.http.get(apiURL + "appointments-user/" + id + "/all", httpOptions)
  }

  getAvailibility(id: string){
    return this.http.get(apiURL + "appointment/" + id, httpOptions)
  }
}

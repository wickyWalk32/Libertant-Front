import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IServerResponse } from '../shared/entity.interfaces.js';

@Injectable({
  providedIn: 'root'
})
export class LogInService {

constructor(private http: HttpClient) {}  

postLogIn(usuarioLogIn:{user_name:string, password:string,recapchaToken:string}){
  return this.http.post<IServerResponse>("http://localhost:8080/log-in", usuarioLogIn)
}

}

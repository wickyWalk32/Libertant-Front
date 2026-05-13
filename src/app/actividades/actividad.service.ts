import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { IActividad, IServerResponse } from '../shared/entity.interfaces.js';
import { Observable } from 'rxjs';
//import dotenv from 'dotenv'

@Injectable({
  providedIn: 'root'
})
export class ActividadService {

  refresh = signal(0);

  actividadAgregada() {
    this.refresh.update(v => v + 1);
  }

actividadd!:IActividad

constructor(private http: HttpClient) {}


getActividades():Observable<IActividad[]> {
  return this.http.get<IActividad[]>("http://localhost:8080/actividades")
}

getOneActividad(id:number):Observable<IActividad> {
  return this.http.get<IActividad>("http://localhost:8080/actividades/"+`${id}`)
}

postActividad(nueva_actividad:IActividad){
  return this.http.post<IServerResponse>("http://localhost:8080/actividades",nueva_actividad)
}

putActividad(id:number,actividad_modificada:IActividad){
  return this.http.put<IServerResponse>("http://localhost:8080/actividades/"+`${id}`,actividad_modificada)
}

inscripcion(id:number,actividad_modificada:IActividad){
  return this.http.put<IServerResponse>("http://localhost:8080/actividades/"+`${id}`+'/inscripcion',actividad_modificada)
}

deleteActividad(id:number):Observable<IServerResponse>{
  return this.http.delete<IServerResponse>("http://localhost:8080/actividades/"+`${id}`)
}






setActividad(act:IActividad){
  console.log("actividad seteada")
  this.actividadd = act
}
getActividad(){
  return this.actividadd
}

}

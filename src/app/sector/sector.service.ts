import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { ISector, IServerResponse, ITurno } from '../shared/entity.interfaces.js';
import { isPlatformServer } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SectorService {

constructor(private http: HttpClient) {}  
sector!:ISector
selectedSector = signal<ISector | null>(null);
refresh = signal(0);
sectorAgregado() {
  this.refresh.update(v => v + 1);
}

setSector(sector:ISector){
  this.sector = sector
}

getSector(){
  return this.sector
}


getAll():Observable<ISector[]> {
  return this.http.get<ISector[]>("http://localhost:8080/sectores")
}
deleteOne(cod_sector:string):Observable<IServerResponse>{
  return this.http.delete<IServerResponse>("http://localhost:8080/sectores/"+ cod_sector)
}

getOneSector(id:any) {
  return this.http.get<any | JSON>("http://localhost:8080/sectores/"+`${id}`)
}
postSector(sector:ISector):Observable<IServerResponse>{
  return this.http.post<IServerResponse>("http://localhost:8080/sectores",sector)
}
putSector(sector:ISector, cod_sector:string):Observable<IServerResponse>{
  return this.http.post<IServerResponse>("http://localhost:8080/sectores/"+cod_sector,sector)
}
// CELDAS
getCeldasDSeSector(id:any) {
  return this.http.get<any | JSON>("http://localhost:8080/sectores/" + `${id}` + "/celdas/")
}


// TURNOS
getAllSectoresConTurnosPorFecha(fecha_turnos:string = (new Date()).toISOString().split("T")[0])
:Observable<ISector[]> {
  return this.http.get<ISector[]>("http://localhost:8080/sectores/turnos/" + `${fecha_turnos}/`)
}
  getAllTurnosBySectorAndDate(fecha:string = new Date().toISOString()):Observable<ITurno[]>{
    return this.http.get<ITurno[]>("http://localhost:8080/turnos/"+`cod_sector/`+`fecha`)
  }


// asistencia del guardia para el turno

postTurno(turno:ITurno):Observable<IServerResponse>{
  return this.http.post<IServerResponse>("http://localhost:8080/turnos",turno)
}



}

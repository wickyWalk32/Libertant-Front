import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SectorService } from '../../sector/sector.service.js';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { IGuardia, ISector, ITurno } from '../../shared/entity.interfaces.js';
import { GuardiasService } from '../../guardias/guardias.service.js';
import { ToastrService } from 'ngx-toastr';
import { CdkDragDrop, CdkDropList, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TurnosService } from '../../turnos/turnos.service.js';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-menu-administrador',
  standalone: true,
  imports: [NgFor,NgIf,CommonModule, DragDropModule,CdkDropList,FormsModule],
  templateUrl: './menu-administrador.component.html',
  styleUrl: './menu-administrador.component.css'
})
export class MenuAdministradorComponent implements OnInit {
constructor(private router:Router,
  public _service_sector: SectorService,
  public _service_guardia: GuardiasService,
  public _service_turno: TurnosService,
  private toastr: ToastrService
){}

sectores:ISector[]=[]
guardias:IGuardia[]=[]

sectores_custom:{
  nombre:string,
  cod_sector:string,
  guardiasTurnoManana:IGuardia[],
  guardiasTurnoTarde:IGuardia[],
  guardiasTurnoNoche:IGuardia[],
  }[] = [];

guardiasList:string[]=[];
dates: string[] = [];
selectedDate!:string

fecha_cronograma:string = new Date().toISOString().split("T")[0];


ngOnInit(){
  const today = new Date();
  today.setDate(today.getDate() - 10);
  for (let i = 0; i <= 20; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    this.dates.push(d.toISOString().split('T')[0]); // yyyy-mm-dd
    //if(new Date().toISOString().split('T')[0] === this.dates[i]){
    //  this.dates[i] = this.dates[i]+ ' (Hoy)'
    //}
  }
  for (let index = 0; index < this.dates.length; index++) {
    const [year,month,day] = this.dates[index].split("-")
    this.dates[index] = day + '-' + month + '-' + year
  }
  this.dates[10] = this.dates[10] + ' (Hoy)'
  this.selectedDate = this.dates[10]

    // sectores con guardias y turnos
  this.getSectores()
    // guardias disponibles
  this.getGuardias()
}   

agregarSectores(allSectores:ISector[]){
  let nombre:string
  let cod_sector:string
  let guardiasTurnoManana:IGuardia[]=[]
  let guardiasTurnoTarde:IGuardia[]=[]
  let guardiasTurnoNoche:IGuardia[]=[]
  const tipoTurnos = ['M', 'T', 'N'];  

  this.guardiasList = [
    'guardias-list',
    ...this.sectores.flatMap(sector =>
      tipoTurnos.map(t => `sector-${sector.cod_sector}-${t}`)
    )
  ];

    allSectores.forEach((sector,idx)=>{
      nombre = sector.nombre
      cod_sector = sector.cod_sector.toString()
      if("turnos" in sector){
        sector.turnos?.forEach((turno)=>{
          if(turno.tipo_turno==="M") guardiasTurnoManana.push(turno.guardia as IGuardia)
          if(turno.tipo_turno==="T") guardiasTurnoTarde.push(turno.guardia as IGuardia)
          if(turno.tipo_turno==="N") guardiasTurnoNoche.push(turno.guardia as IGuardia)
        })
      }
      this.sectores_custom.push({
        nombre:nombre,
        cod_sector:cod_sector,
        guardiasTurnoManana:guardiasTurnoManana,
        guardiasTurnoTarde:guardiasTurnoTarde,
        guardiasTurnoNoche:guardiasTurnoNoche
      })
      guardiasTurnoManana = []
      guardiasTurnoTarde = []
      guardiasTurnoNoche = []
    })
}
selected(){
  console.log("selected")
}   
drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      console.log(event)
      if(event.container.data.length===2){
        this.toastr.error("No se permiten mas Guardias")
        return
      }
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      const cod_guardia =  event.container.data[event.currentIndex].cod_guardia
      const [sectorSting,cod_sector,tipo_turno] = event.container.id.split("-")
      this.crearTurno(this.fecha_cronograma,tipo_turno,cod_sector,cod_guardia)
    }
  }

onDateChange(event:Event){
  let fecha = (event.target as HTMLInputElement).value
  this.fecha_cronograma = this.formatDate(fecha)
  this.sectores_custom = []
  this.getSectores(this.fecha_cronograma)
  this.getGuardias()
}

getGuardias(){
  this._service_guardia.getAllGuardiasSinTurnoEnFecha(this.fecha_cronograma).subscribe({
   next:(data)=>{
     this.guardias = data
     console.log("Guardias sin Turno en fecha:",data)
   },
   error:(e)=>{
    console.log(e)
    this.toastr.error(e.error.message)
    } })
}

getSectores(fecha?:string){
  this._service_sector.getAllSectoresConTurnosPorFecha(fecha).subscribe({
   next:(data)=>{
     console.log("sectores obtenidos",data)
     this.sectores = data
     this.agregarSectores(this.sectores)
   },
   error:(e)=>{
    console.log(e)
    this.toastr.error("No se encontraron sectores")
    } })
}



eliminarTurno(cod_guardia:number|undefined,cod_sector:string|undefined,
              tipo_turno:string){
  if(cod_guardia!=undefined && cod_sector!=undefined){

  this._service_turno.deleteTurnos(this.fecha_cronograma,tipo_turno,cod_sector,cod_guardia).subscribe({
   next:(data)=>{
     this.toastr.success(data.message)
     this.sectores_custom.forEach((sector)=>{
      if(sector.cod_sector === cod_sector){
        if(tipo_turno === 'M'){
          console.log("Turno mañana")
          sector.guardiasTurnoManana = sector.guardiasTurnoManana.filter(
            (guardia)=>{ 
              if(guardia.cod_guardia===cod_guardia)this.guardias.push(guardia)
              return guardia.cod_guardia!=cod_guardia } )
          
        }
        if(tipo_turno === 'T'){
          sector.guardiasTurnoTarde = sector.guardiasTurnoTarde.filter(
            (guardia)=>{ 
              if(guardia.cod_guardia===cod_guardia)this.guardias.push(guardia)
              return guardia.cod_guardia!=cod_guardia } )
        }
        if(tipo_turno === 'N'){
          sector.guardiasTurnoNoche = sector.guardiasTurnoNoche.filter(
            (guardia)=>{ 
              if(guardia.cod_guardia===cod_guardia)this.guardias.push(guardia)
              return guardia.cod_guardia!=cod_guardia } )
        }
      }
     })
   },
   error:(e)=>{
    console.log(e)
    this.toastr.error(e.error.message)
    } })
  }else{
    console.log("Guardia o sector no encontrado")
  }
}

crearTurno(fecha:string,tipo_turno:string,cod_sector:string,cod_guardia:number){
  const date = new Date(fecha).toISOString().split("T")[0]
  const turno:ITurno={fecha:date,tipo_turno:tipo_turno,cod_sector:cod_sector,cod_guardia:cod_guardia}
  this._service_turno.postTurno(turno).subscribe({
    next: (data)=>{
        this.toastr.success("Turno Creado Con Exito")
    },
    error: (e)=>{
      console.log(e)
      this.toastr.error(e.message)
    }
  })
}

formatDate(dateStr:string) {
  if(dateStr.split(' ')[1]=' (Hoy)') dateStr = dateStr.split(' ')[0]
  const [day, month, year] = dateStr.split('-');
  return `${year}-${month}-${day}`;
}


}


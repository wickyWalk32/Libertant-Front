import { NgFor, NgIf } from '@angular/common';
import { AfterViewInit, Component, effect, OnInit } from '@angular/core';
import { IGuardia, ISector, ITurno } from '../../shared/entity.interfaces.js';
import { ToastrService } from 'ngx-toastr';
import { SectorService } from '../../sector/sector.service';
import { TurnosService } from '../turnos.service';
import { BuscarGuardiaDinamicoComponent } from '../../guardias/buscar-guardia-dinamico/buscar-guardia-dinamico.component';
import { GuardiasService } from '../../guardias/guardias.service';
// declare var bootstrap: any;
@Component({
  selector: 'app-menu-turnos',
  standalone: true,
  imports: [NgFor,NgIf,BuscarGuardiaDinamicoComponent],
  templateUrl: './menu-turnos.component.html',
  styleUrl: './menu-turnos.component.css'
})
export class MenuTurnosComponent implements OnInit,AfterViewInit{
  sectores:ISector[] = []
  selectedTurno:string=''
  selectedSector:string=''
  selectedDays:number[] = []
  selectedGuardias:IGuardia[]=[]
  turnosData!: (ITurno|string)[]
  //selectedSector:ISector[] = []
constructor(private toastr:ToastrService,
    private _service_sector:SectorService,
    private _service_turno:TurnosService,
    private _service_guardia:GuardiasService
  ){
  effect(() => {
    this.selectGuardia()
  });
  }
  ngOnInit(){
    this._service_guardia.selectedGuardia.set(null)
    this._service_sector.getAll().subscribe({
      next:(data)=>{
        this.sectores = data
      },
      error:(e)=>{
        console.log(e)
        this.toastr.error("No se Pudieron cargar los Sectores")
      }
    })
  }
  ngAfterViewInit(): void {
    //document
    //  .querySelectorAll('[data-bs-toggle="tooltip"]')
    //  .forEach(el => new bootstrap.Tooltip(el));
  }
selectGuardia(){
  const guardia = this._service_guardia.selectedGuardia();
  const isRepeated = this.selectedGuardias.some((g)=>g.cod_guardia===(guardia as IGuardia).cod_guardia)
  if (guardia && !isRepeated){
    this.selectedGuardias.push(guardia)
  } 
}
selectSector(cod_sector:string){
  this.selectedSector=cod_sector
}
selectTurno(tipo_turno:string){
  this.selectedTurno = tipo_turno
}
selectWeekDays(dia_semana:number){
 if(this.selectedDays.includes(dia_semana)){
  this.selectedDays = this.selectedDays.filter(v => v !== dia_semana);
 }else{
 if(this.selectedDays.length===5){
  this.toastr.error("Máximo de 5 Días o 40 Horas Semanales")
  return }
 this.selectedDays.push(dia_semana) 
 }
 
}


crearTurnos(){
  if(this.selectedTurno==='') this.toastr.error("Debe seleccionar 1 turno")
  if(this.selectedDays.length!==5) this.toastr.error("Debe seleccionar 5 dias")
  if(this.selectedSector==='') this.toastr.error("Debe seleccionar 1 sector")
  if(this.selectedGuardias.length === 0) this.toastr.error("Debe seleccionar al menos 1 guardia")
  if(this.selectedTurno===''||this.selectedDays.length!==5||this.selectedSector===''
  || this.selectedGuardias.length === 0
  ) return;
  const turno_data = {
    tipo_turno:this.selectedTurno,
    dias:this.selectedDays,
    cod_sector:this.selectedSector,
  guardias:this.selectedGuardias}
  this._service_turno.postTurnosBatch(turno_data).subscribe({
    next: (data)=>{
      this.turnosData = data.data
      console.log(data)
      this.toastr.success(data.message)
    },
    error: (e)=>{
      console.log(e)
      this.toastr.error(e.error.message)
    }
  })
}

}

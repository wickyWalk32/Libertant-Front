import { NgFor, NgIf } from '@angular/common';
import { Component, effect} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SectorService } from '../sector.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-formulario-sector',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,NgFor,NgIf],
  templateUrl: './formulario-sector.component.html',
  styleUrl: './formulario-sector.component.css'
})
export class FormularioSectorComponent {
  form_sector!:FormGroup
  crear_o_editar = "NUEVO"
  isReadonly = false
  btn_action = "Crear Nuevo Sector"
  constructor(
    private formb:FormBuilder,
    private _service_sector:SectorService,
    private toastr:ToastrService){
      this.form_sector = this.formb.group({
      cod_sector:["",[Validators.required,Validators.pattern(/^[a-zA-Z]+$/),
                      Validators.minLength(1),Validators.maxLength(2)]],
      nombre:["",Validators.required],
      descripcion:["",Validators.required]
     })
  effect(() => {
    const sector = this._service_sector.selectedSector();
    if (sector) {
    this.form_sector.reset(sector);
    this.crear_o_editar = "EDITAR"
    this.btn_action = "Editar Sector"
    this.isReadonly = true
    }
  });
}

guardarSector(){
if(this._service_sector.selectedSector()){
  this._service_sector.putSector(this.form_sector.value,this.form_sector.value.cod_sector).subscribe({
    next:(data)=>{
      this.toastr.success("Sector Editado")
      this._service_sector.sectorAgregado()
      this.form_sector.reset()
    },
    error: (e)=>{
      console.log(e)
      this.toastr.error(e.error.message)
    }
  })
  this.form_sector.reset()
  this.isReadonly = false
  this.crear_o_editar = "NUEVO"
  this.btn_action = "Crear Nuevo Sector"
  this._service_sector.selectedSector.set(null)
} else {
  this._service_sector.postSector(this.form_sector.value).subscribe({
    next:(data)=>{
      this.toastr.success("Sector Guardado")
      this._service_sector.sectorAgregado()
      this.form_sector.reset()
    },
    error: (e)=>{
      console.log(e)
      this.toastr.error(e.error.message)
    }
  })
} }

get control_cod_sector() {
  return this.form_sector.get('cod_sector')!;
}
get control_nombre_sector() {
  return this.form_sector.get('nombre')!;
}
}

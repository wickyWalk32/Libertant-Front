import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import {  FormGroup, FormsModule, ReactiveFormsModule, Validators,FormBuilder } from '@angular/forms';
import { ReclusosService } from '../reclusos.service';

import { CommonModule, NgFor } from '@angular/common';
import { FormularioReclusoComponent } from '../formulario-recluso/formulario-recluso.component';
import { FormularioCondenaComponent } from '../../condena/formulario-condena/formulario-condena.component';
import { ICondena, IPena, IRecluso } from '../../shared/entity.interfaces.js';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-alta-reclusos',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,NgFor,FormularioReclusoComponent,FormularioCondenaComponent,
    CommonModule
  ],
  templateUrl: './alta-reclusos.component.html',
  styleUrl: './alta-reclusos.component.css'
})

export class AltaReclusosComponent implements OnInit{
  @ViewChild(FormularioReclusoComponent) form_recluso_comp!:FormularioReclusoComponent
  @ViewChildren(FormularioCondenaComponent) form_condena_comps!:QueryList<FormularioCondenaComponent>


  form_recluso:FormGroup
  constructor (private _service_recluso : ReclusosService,
    private form: FormBuilder, private toastr:ToastrService){


  this.form_recluso = this.form.group({
      fecha_nac:['',[Validators.required]],
      nombre:['',Validators.required],
      apellido:['',Validators.required],
      dni:['',[Validators.required,Validators.minLength(8)]]
      //cod_sentencia:['',]
  })
}
recluso!:IRecluso
recluso_creado=false
cant_condenas = 1
numbers :any
condenas:ICondena[] = []
btn_alta = false
nuevo_recluso!:IRecluso


ngOnInit(): void {
  this.numbers=Array.from({length:this.cant_condenas},(_,i)=>i)
    }

recibirRecluso(nuevo_recluso:IRecluso){ 
  console.log("Nuevo Recluso: ",nuevo_recluso)
  this.nuevo_recluso = nuevo_recluso
  this.btn_alta = true
}

nuevaCondena(){
  this.cant_condenas = this.cant_condenas+1;
  this.numbers=Array.from({length:this.cant_condenas},(_,i)=>i)
}

addCondena(nueva_condena:ICondena){
  //const condena:ICondena = {...nueva_condena,nro_condena:this.condenas.length+1}
  const condena:ICondena = {...nueva_condena}
  this.condenas.push(condena)
}

altaRecluso(){
  if(this.condenas.length===0){
    this.toastr.error("Error: Para dar de alta el Recluso necesita al menos una condena")
  }else{
    const penas:IPena[] = [{fecha_ini:new Date(),condenas:this.condenas}]
    const recluso = {...this.nuevo_recluso,penas:penas}
    console.log(recluso)
  this._service_recluso.postReclusoYCondenas(recluso,this.condenas).subscribe({
    next: (data)=>{
        console.log("Recluso Creado con Exito",data)
        this.toastr.success("Recluso Ha Sido Dado de Alta")
        this.recluso_creado=true
        this.resetForms()
    }
    ,error: (e)=>{
      this.toastr.error(e.error.message)
      console.log(e)
    }
  })
  }

}

resetForms(){
  this.form_recluso_comp.form_recluso.reset()
  this.form_recluso_comp.form_recluso.enable()
  this.form_condena_comps.forEach(f_condena_comp => {
    f_condena_comp.form_condena.reset()
    f_condena_comp.form_condena.enable()
  });
  this.cant_condenas=0
  this.condenas=[]
  this.numbers=Array.from({length:0},(_,i)=>i)
  this.btn_alta=false
}


}


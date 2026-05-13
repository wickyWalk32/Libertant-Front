import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IRecluso } from '../../shared/entity.interfaces';
import { ToastrService } from 'ngx-toastr';
import { ReclusosService } from '../reclusos.service';
import { FormularioReclusoComponent } from '../formulario-recluso/formulario-recluso.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-modificar-recluso',
  standalone: true,
  imports: [FormularioReclusoComponent,NgFor],
  templateUrl: './modificar-recluso.component.html',
  styleUrl: './modificar-recluso.component.css'
})
export class ModificarReclusoComponent implements OnInit {
@Input() recluso!:IRecluso
@ViewChild(FormularioReclusoComponent) form_recluso_comp!:FormularioReclusoComponent

condenas!:any[]|undefined
constructor(private _service_recluso:ReclusosService, private toastr:ToastrService){

}
ngOnInit(){
console.log("inicializado de modificar recluso")

}


modificarRecluso(recluso_editado:IRecluso){
  console.log(recluso_editado)
  this._service_recluso.modificarRecluso(this.recluso.cod_recluso,recluso_editado).subscribe({
    next: (data)=>{
        console.log(data)
        this.toastr.success(data.message)
    },
    error: (e)=>{
      console.log(e)
      this.toastr.error(e.error.message)
    }
  })
}

liberarRecluso(recluso_editado:IRecluso){

  this._service_recluso.putLiberarRecluso(recluso_editado.cod_recluso as number,recluso_editado).subscribe({
    next:(data)=>{
      console.log(data)
      this.toastr.success(data.message)
      this.form_recluso_comp.recluso_liberado = true
    },
    error:(e)=>{
      if(e.status===404) this.toastr.error("Token NO Encontrado")
      if(e.status===401) this.toastr.error("Usuario No Autorizado")
      if(e.status===500) this.toastr.error("Error Inesperado")
      console.log(e)
    }
  })
}


}

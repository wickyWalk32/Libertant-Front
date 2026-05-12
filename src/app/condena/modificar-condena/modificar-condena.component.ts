import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICondena } from '../../shared/entity.interfaces.js';
import { CondenasService } from '../condenas.service';
import { ToastrService } from 'ngx-toastr';
import { FormularioCondenaComponent } from '../formulario-condena/formulario-condena.component';

@Component({
  selector: 'app-modificar-condena',
  standalone: true,
  imports: [FormularioCondenaComponent],
  templateUrl: './modificar-condena.component.html',
  styleUrl: './modificar-condena.component.css'
})
export class ModificarCondenaComponent {
  @Input() condena!:ICondena


  constructor(private _service_condena:CondenasService, private toastr:ToastrService){}

modificarCondena(condena_modificada:ICondena){
  this._service_condena.putCondena(this.condena.nro_condena,condena_modificada).subscribe({
    next: (data)=>{
      this.toastr.success(data.message)
    },
    error: (e)=>{
      console.log("error en modificacion de condena")
      this.toastr.error(e.message)
    }
  })
}

}

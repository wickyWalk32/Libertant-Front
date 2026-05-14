import { Component, effect, OnInit } from '@angular/core';
import { SectorService } from '../sector.service';
import { RouterLink , ActivatedRoute, Router} from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { ISector } from '../../shared/entity.interfaces.js';
import { toastrService } from '../../shared/toastr.service.config.js';
import { ToastrService } from 'ngx-toastr';
import { FormularioActividadComponent } from '../../actividades/formulario-actividad/formulario-actividad.component.js';
import { FormularioSectorComponent } from '../formulario-sector/formulario-sector.component';

@Component({
  selector: 'app-menu-sector',
  standalone: true,
  imports: [RouterLink,NgFor,NgIf,FormularioSectorComponent],
  templateUrl: './menu-sector.component.html',
  styleUrl: './menu-sector.component.css'
})
export class MenuSectorComponent implements OnInit{
  sectores:ISector[]=[]
  constructor (public _service_sector : SectorService,
    private toastr:ToastrService,
    private router:Router,
    private route:ActivatedRoute){

  effect(() => {
    this._service_sector.refresh();
    this.cargarSectores();
  });
}

ngOnInit(): void {}


verDetalleSector(cod_sector:any){
  this.router.navigate([`${cod_sector}` + "/detalle-sector"], { relativeTo: this.route });
}

cargarSectores(){
  this._service_sector.getAll().subscribe({
    next:(data)=>{
      console.log("sectores obtenidos",data)
      this.sectores=data
    },
    error:(e)=>{console.log(e)
      console.log(e.message)
    }
  })
}

eliminarSector(cod_sector:string){
 this._service_sector.deleteOne(cod_sector).subscribe({
   next:(data)=>{
    this.toastr.success(data.message)
    this.cargarSectores()

   },
   error:(e)=>{
    console.log(e)
    console.log(e.message)
    this.toastr.error(e.message)
   }
 })
}

editarSector(sector: ISector) {
  console.log(sector)
  this._service_sector.selectedSector.set(sector);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
}

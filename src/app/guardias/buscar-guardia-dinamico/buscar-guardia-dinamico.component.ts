import { Component, OnInit } from '@angular/core';
import { IGuardia } from '../../shared/entity.interfaces.js';
import { GuardiasService } from '../guardias.service';
import { NgFor, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-buscar-guardia-dinamico',
  standalone: true,
  imports: [NgFor],
  providers:[TitleCasePipe],
  templateUrl: './buscar-guardia-dinamico.component.html',
  styleUrl: './buscar-guardia-dinamico.component.css'
})
export class BuscarGuardiaDinamicoComponent implements OnInit{
guardias!:IGuardia[]
filtered_guardias!:IGuardia[]
guardias_html:string[]=[]


constructor(private _service_guardia:GuardiasService,
  private titleCase:TitleCasePipe
){}
ngOnInit(){
    this._service_guardia.getAll().subscribe({
    next: (data)=>{
      this.guardias = data
      //this.guardias[0].nombre = 'Carlos'
    },
    error: (e)=>{
      console.log(e)
    }
  })
}

buscar(event: Event): void {
  this.guardias_html = []
  const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
  if(searchTerm.trim()==='') return
    this.filtered_guardias = this.guardias.filter((g)=>{
      g.nombre = this.titleCase.transform(g.nombre);
      g.apellido = this.titleCase.transform(g.apellido);
     return (g.nombre.toLowerCase()+' '+ g.apellido.toLowerCase() + ' ' + g.cod_guardia?.toString() ).includes(searchTerm)
    })
    this.filtered_guardias.forEach((guard)=>{
    const regex = new RegExp(`(${searchTerm})`, 'gi'); // 'g': global (find all matches),'i':case-insensitive
    const text = guard.nombre+' '+guard.apellido+' '+guard.cod_guardia?.toString()
    const highlighted_guardia = text.replace(regex, `<strong>$1</strong>`);
    this.guardias_html.push(highlighted_guardia)
  })
  if(this.guardias_html.length===0&&searchTerm.trim()!=='')this.guardias_html.push("No se encontro ningun guardia")
}


select(guardia_string:string){
  const cod_guardia = guardia_string.split(' ').at(-1)?.replace(/<[^>]+>/g, '')
  if(cod_guardia!=='guardia'){
  this.filtered_guardias.forEach((guardia)=>{
    if(guardia.cod_guardia===Number(cod_guardia)) this._service_guardia.selectedGuardia.set(guardia)
    this.guardias_html=[]
  })
  }
}


}


import { Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component.js';


//Guardias
import { AltaGuardiaComponent } from './guardias/alta-guardia/alta-guardia.component.js';
import { BuscarGuardiaComponent } from './guardias/buscar-guardia/buscar-guardia.component.js';
import { ModificarGuardiaComponent } from './guardias/modificar-guardia/modificar-guardia.component.js';
import { MostrarGuardiaComponent } from './guardias/mostrar-guardia/mostrar-guardia.component.js';


//RECLUSOS
import { AltaReclusosComponent } from './reclusos/alta-reclusos/alta-reclusos.component.js';
import { DetalleReclusoComponent } from './reclusos/detalle-recluso/detalle-recluso.component.js';
import { BuscarReclusosComponent } from './reclusos/buscar-reclusos/buscar-reclusos.component.js';
import { AltaActividadComponent } from './actividades/alta-actividad/alta-actividad.component.js';
import { ModificarActividadComponent } from './actividades/modificar-actividad/modificar-actividad.component.js';
import { MostrarActividadComponent } from './actividades/mostrar-actividad/mostrar-actividad.component.js';


// TURNOS
import { MenuTurnosComponent } from './turnos/menu-turnos/menu-turnos.component.js';


import { MenuSectorComponent } from './sector/menu-sector/menu-sector.component.js';



// MENU
import { MenuGuardiaComponent } from './guardias/menu-guardia/menu-guardia.component.js';
import { MenuReclusosComponent } from './reclusos/menu-reclusos/menu-reclusos.component.js';
import { MenuActividadComponent } from './actividades/menu-actividad/menu-actividad.component.js';


import { DetalleSectorComponent } from './sector/detalle-sector/detalle-sector.component.js';
import { DetalleActividadComponent } from './actividades/detalle-actividad/detalle-actividad.component.js';
import { MenuAdministradorComponent } from './administrador/menu-administrador/menu-administrador.component.js';

export const routes: Routes = [
    //log in
    {path: '',redirectTo: 'log-in',pathMatch:'full'},
    {path: 'log-in', component: LogInComponent},

    //usuario
  

    //guardia
    {path: 'menu/guardias', component: MenuGuardiaComponent},
    {path: 'menu/guardias/alta-guardia', component:AltaGuardiaComponent },
    {path: 'menu/guardias/buscar-guardia', component:BuscarGuardiaComponent },
    {path: 'menu/guardias/:id/modificar', component: ModificarGuardiaComponent},
    {path: 'menu/guardias/mostrar-guardia', component:MostrarGuardiaComponent },
    
    //turno
    {path: 'menu/turnos', component: MenuTurnosComponent},

    //administrador
    {path: 'menu/administrador', component: MenuAdministradorComponent},


    //recluso
    {path: 'menu/recluso', component: MenuReclusosComponent},
    {path: 'menu/recluso/alta-recluso', component:AltaReclusosComponent },
    {path: 'menu/recluso/:cod_recluso', component:DetalleReclusoComponent },
    {path: 'menu/recluso/buscar-recluso', component: BuscarReclusosComponent},


    //actividad
    {path: 'menu/actividad', component: MenuActividadComponent},
    {path: 'menu/actividad/alta-actividad', component: AltaActividadComponent},
    {path: 'menu/actividad/modificar-actividad', component: ModificarActividadComponent},
    {path: 'menu/actividad/mostrar-actividad', component: MostrarActividadComponent},
    {path: 'menu/actividad/:id/detalle-actividad', component: DetalleActividadComponent},


    //sector
    {path: 'menu/sector', component: MenuSectorComponent},
    {path: 'menu/sector/:sector/detalle-sector', component: DetalleSectorComponent},
    
    
];

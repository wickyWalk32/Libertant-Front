import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet} from '@angular/router';
import { BotonAtrasComponent } from './boton-atras/boton-atras.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,BotonAtrasComponent,NavBarComponent,NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  isLoginPage = false
  title = 'Libertant-FrontEnd'
  constructor(private router:Router){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        document.body.className = '';
       console.log(event.url)
        if (event.url.includes('login')) {
          //document.body.classList.add('login-bg');
          console.log(" in login")
        }
      }
    });
  }

ngOnInit(){
  this.router.events.subscribe(()=>{
    this.isLoginPage = this.router.url === '/log-in';
  })
}
}

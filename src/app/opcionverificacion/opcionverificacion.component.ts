import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-opcionverificacion',
  templateUrl: './opcionverificacion.component.html',
  styleUrls: ['./opcionverificacion.component.scss']
})
export class OpcionverificacionComponent {

  
  constructor(private router: Router) {}

  correo(){
    this.router.navigate(['/correo']);
  }
  telefono(){
    this.router.navigate(['/telefono']);
  }
}

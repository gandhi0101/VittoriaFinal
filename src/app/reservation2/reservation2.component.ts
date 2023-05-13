import { Component, Input, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { CitasService } from '../citas.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservation2',
  templateUrl: './reservation2.component.html',
  styleUrls: ['./reservation2.component.scss']
})
export class Reservation2Component implements OnInit {
  @Input() fecha2: string;
  @Input() hora2: string;
  @Input() personas2: string;
  nombre:string="";
  correo:string="";
  cliente: Cliente;

  constructor(private citaService:CitasService, private router: Router) { 
    this.cliente = this.citaService.nuevoCliente();
    this.fecha2="";
    this.hora2="";
    this.personas2="";
  }

  ngOnInit() {
    this.cliente = this.citaService.nuevoCliente();
    this.cliente.fecha = this.fecha2;
    this.cliente.hora = this.hora2;
    this.cliente.personas = this.personas2;
    
  }

  nuevoCliente(): void {
    this.citaService.agregarCliente(this.cliente);
    this.cliente = this.citaService.nuevoCliente();
    this.router.navigateByUrl('/');
  }
  showModal(){
    Swal.fire({
      title: 'Gracias por reservar.',
      width: 600,
      padding: '3em',
      color: '#fff',
      background: '#fff url(../../assets/media/col.jpg)',
    })
  }
  
}



import { Component, Input, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { CitasService } from '../citas.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CitaService } from '../cita.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-reservation2',
  templateUrl: './reservation2.component.html',
  styleUrls: ['./reservation2.component.scss'],
})
export class Reservation2Component implements OnInit {
  @Input() fecha2: string;
  @Input() hora2: string;
  @Input() personas2: string;
  nombre: string = '';
  correo: string = '';
  UID: string = '';
  cliente: Cliente;

  constructor(
    private citaService: CitasService,
    private cita: CitaService,
    private router: Router,
    private afAtth: AngularFireAuth
  ) {
    this.cliente = this.citaService.nuevoCliente();
    this.fecha2 = '';
    this.hora2 = '';
    this.personas2 = '';
  }

  ngOnInit() {
    this.cliente = this.citaService.nuevoCliente();
    this.cliente.fecha = this.fecha2;
    this.cliente.hora = this.hora2;
    this.cliente.personas = this.personas2;
    this.afAtth.authState.subscribe((user) => {
      this.cliente.UID = user?.uid ?? '';
      this.cliente.clave = user?.uid ?? '';
    });
  }

  nuevoCliente(): void {
    this.citaService.agregarCliente(this.cliente);
    this.cliente = this.citaService.nuevoCliente();
    this.router.navigateByUrl('/');
  }

  async onSubmit() {
    console.log(this.cliente);
    const response = await this.cita.addCliente(this.cliente);
    console.log(response);
    Toast.fire({
      icon: 'success',
      title: 'Cita agregada con exito'
    })
    this.router.navigateByUrl('/');
  }
}

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

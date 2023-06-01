import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { CitasService } from '../citas.service';
import { CitaService } from '../cita.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dates',
  templateUrl: './dates.component.html',
  styleUrls: ['./dates.component.scss'],
})
export class DatesComponent implements OnInit {
  displayedColumns = [
    'Nombre',
    'Correo',
    'Fecha',
    'Hora',
    'Personas',
    'Edad',
    'Sexo',
    'a',
  ];
  dataSource: Cliente[] = [];
  tam: string = '';
  isUpdate = false;

  clientes: Cliente[] = [];
  citaCliente: Cliente[] = [];

  constructor(
    private clientesService: CitasService,
    private clientSer: CitaService,
    private afAtth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.clientSer.getCliente().subscribe((cliente) => {
      this.clientes = cliente;
      var i = 0;
      this.afAtth.authState.subscribe((user) => {
        if (user?.email == 'admin@gmail.com') {
          this.citaCliente=cliente;
        } else {
          cliente.forEach((element: Cliente) => {

            if (element.clave === user?.uid) {
              this.citaCliente[i] = element;
              i++;
            }
          });
          this.isUpdate=true;
        }
      });
    });
  }

  async onClickDelete(cliente: Cliente) {
    const response = await this.clientSer.deleteCliente(cliente);
    Toast.fire({
      icon: 'success',
      title: 'La cita se elimino con exito'
    })
    console.log(response);
  }

  retornarTam() {
    if (this.clientes.length <= 3) {
      return (this.tam = '200px');
    } else if (this.clientes.length >= 4 && this.clientes.length <= 8) {
      return (this.tam = '400px');
    } else {
      return (this.tam = '600px');
    }
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


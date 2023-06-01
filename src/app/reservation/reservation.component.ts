import { Component, OnInit, Input } from '@angular/core';
import { CitasService } from '../citas.service';
import Swal from 'sweetalert2';
import { CitaService } from '../cita.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
})
export class ReservationComponent implements OnInit {
  paso2 = true;
  fechahoy: string = '';
  fecha: string = '';
  hora: string = '';
  personas: string = '';
  numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  horasDisponibles: string[] = [];
  fechaDisponible: string = '';
  spiner: boolean = false;
  datos: any;

  constructor(private citas: CitasService, private cita: CitaService) {
    this.horasDisp();
  }

  ngOnInit() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    this.fechahoy = formattedDate;
  }

  fechaCambiada() {
    this.horasDisp();
  }

  horasDisp() {
    const fechaActual = new Date();
    const horaActual = fechaActual.getHours();
    const minutosActuales = fechaActual.getMinutes();
    this.horasDisponibles = [];

    // Verificamos si la fecha actual es diferente a la fecha seleccionada
    if (this.fechahoy !== this.fecha) {
      // Si es diferente, definimos la hora de inicio y de fin para la lista de horas disponibles
      const horaInicio = 8;
      const horaFin = 20;

      // Creamos un bucle para agregar las horas disponibles a la lista
      for (let hora = horaInicio; hora < horaFin; hora++) {
        const horaString = hora.toString().padStart(2, '0');
        this.horasDisponibles.push(`${horaString}:00`);
        this.horasDisponibles.push(`${horaString}:30`);
      }
    } else if (horaActual >= 8) {
      let hora = horaActual;
      let minutos = minutosActuales >= 30 ? 30 : 0; // Redondeamos a la hora o a la media hora siguiente

      // Creamos un bucle para agregar las horas disponibles a la lista

      while (hora < 20) {
        const horaString = hora.toString().padStart(2, '0');
        const minutosString = minutos.toString().padStart(2, '0');
        this.horasDisponibles.push(`${horaString}:${minutosString}`);

        minutos += 30; // Agregamos 30 minutos
        if (minutos === 60) {
          minutos = 0;
          hora += 1; // Sumamos una hora cada vez que llegamos a los 60 minutos
        }
      }
    }
  }

  revisarPaso2() {
    this.cita.getCliente().subscribe((cliente) => {
      this.datos = cliente;
      if (this.datos) {
        const exists = this.datos.some(
          (obj: MyObj) => obj.fecha === this.fecha && obj.hora === this.hora
        );
        if (exists) {
          this.fechaDisponible = 'Fecha no disponible SELECCIONE OTRA';
        } else {
          this.spiner = true;
          this.fechaDisponible = 'La fecha si esta disponible';
            this.paso2 = false;
        }
      } else {
        this.fechaDisponible = 'La fecha si esta disponible';
        this.spiner = true;
        this.paso2 = false;
      }
    });
  }
}
interface MyObj {
  nombre: string;
  fecha: string;
  hora: string;
  personas: string;
  correo: string;
}

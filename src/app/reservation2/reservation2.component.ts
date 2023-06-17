import { Component, Input, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { CitasService } from '../citas.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CitaService } from '../cita.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MailService } from '../mail.service';

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
  datosMAIl = {
    user: '',
    subject: 'Cita En Vittoria',
    text: '',
    nombre: '',
    telefono: '',
    showAlert: false,
    mensaje: ``,
    cita: '',
  };
  constructor(
    private citaService: CitasService,
    private cita: CitaService,
    private router: Router,
    private afAtth: AngularFireAuth,
    private mailService: MailService
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
    this.insertar()
    this.router.navigateByUrl('/');
  }

  /////correo cuando se registra cita
  insertar(): void {
    this.llenarDatos()
    if (this.datosMAIl.nombre !== undefined || this.datosMAIl.user !== undefined) {
      this.datosMAIl.mensaje = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Contacto</title>
      <style>
        /* Estilos generales */
        body {
          font-family: Arial, sans-serif;
          background-color: #fff;
          margin: 0;
          padding: 0;
        }
    
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #ffffff;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
    
        h1 {
          color: #333333;
        }
    
        p {
          color: #555555;
        }
    
        a {
          color: #007bff;
          text-decoration: none;
        }
    
        /* Estilos específicos del correo */
        .header {
          text-align: center;
          padding-bottom: 20px;
          border-bottom: 1px solid #dddddd;
        }
    
        .logo {
          max-width: 150px;
        }
    
        .content {
          margin-top: 20px;
        }
    
        .button {
          display: inline-block;
          background-color: #007bff;
          color: #ffffff;
          padding: 10px 20px;
          border-radius: 4px;
          text-decoration: none;
        }
    
        .footer {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid #dddddd;
          text-align: center;
          color: #777777;
        }
      </style>
    </head>
    
    <body>
      <div class="container">
        <div class="header">
          <img class="logo" src="https://gandhi0101.github.io/Vittoria/favicon.ico" alt="Logo">
          <h1>¡Hola soy ${this.datosMAIl.nombre}!</h1>
        </div>
        <div class="content">
          <p>Estimado(a) ${this.datosMAIl.nombre},</p>
          <p>queremos imformaler sobre su Cita </p>
          <p><strong>$${this.datosMAIl.cita}}</strong> </p>
  
          <p>sus datos son los siguientes</p>
          <p> La reservacion se hizo a nombre de  ${this.datosMAIl.nombre}</p>
          <h3>Fecha:<strong> ${this.cliente.fecha} </strong>&nbsp&nbsp&nbsp&nbsp&nbsp <strong>Hora: ${this.cliente.hora}</strong> </h3> 
          <h4>Reservacion para <strong>${this.cliente.personas} </strong></h4>
          <p>Email: ${this.datosMAIl.user}</p>
          <hr>
          
          <p><br> Pedimos puntiaidad y que disfrute su comida </p>
          <p> Saludos y buen dia </p>
          <hr>
        </div>
        <div class="footer">
          <p>Este correo electrónico fue enviado por Vittoria al administrador del contacto</p>
          <p>Puedes contactarnos en Peachycooold@gmail.com o visitar nuestro sitio web:vittoria.com</p>
          
        </div>
      </div>
    </body>
    
    </html>
    `;
      let body = {
        user: this.datosMAIl.user,
        subject: this.datosMAIl.subject,
        text: this.datosMAIl.mensaje,
        //text: this.text+`<br> nombre: ${this.nombre} <br> telefono: ${this.telefono} <br>correo:${this.user}`
      };
      console.log(body);
      this.datosMAIl.showAlert = this.enviar(body);
      //this.form.reset();
    } else {
      console.log("al parecer quieres mandar datos undefined \n" + this.datosMAIl.nombre);
    }
  }
  enviar(body: any): boolean {
    console.log(body);
    this.mailService.sendMail('http://localhost:3000/mail/citas', body)
      .then((data) => {
        console.log(data);
        return true;
        //this.datosMAIl.showAlert = true; // Mostrar el alert
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
    return false;
  }
  llenarDatos(): void {
    this.datosMAIl.nombre = this.cliente.nombre;
    this.datosMAIl.user = this.cliente.correo;
    this.datosMAIl.telefono = '';
    this.datosMAIl.text = `para comprobar si si se registro una cita en el correo edad: ${this.cliente.edad} fecha: ${this.cliente.fecha} hora: ${this.cliente.hora}  persona: ${this.cliente.personas}  sexo: ${this.cliente.sexo}`;
    console.log(this.datosMAIl);
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


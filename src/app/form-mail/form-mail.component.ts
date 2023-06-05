import { Component } from '@angular/core';
import { MailService } from '../mail.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { from } from 'rxjs';



@Component({
  selector: 'app-form-mail',
  templateUrl: './form-mail.component.html',
  styleUrls: ['./form-mail.component.scss']
})
export class FormMailComponent {
  contactForm!: FormGroup;

  datosFormulario = {
    user: undefined,
    subject: 'Formulario de contacto 🐵🦁',
    text: undefined,
    nombre: undefined,
    telefono: undefined,
    showAlert: false,
    mensaje: ``,
  };


  constructor(private mailService: MailService, private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.contactForm = this.llenaForm();

  }

  insertar(): void {
    this.llenarDatos();
    if (this.datosFormulario.nombre !== undefined || this.datosFormulario.user !== undefined) {
      this.datosFormulario.mensaje = `<!DOCTYPE html>
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
            <h1>¡Hola soy ${this.datosFormulario.nombre}!</h1>
          </div>
          <div class="content">
            <p>Estimado(a) ADMIN,</p>
            <p>queremos responderle al sr(ta) ${this.datosFormulario.nombre}</p>
            <p><strong>tiene una duda:</strong> </p>
    
            <p>sus datos son los siguientes</p>
            <p>Nombre: ${this.datosFormulario.nombre}</p>
            <p>Telefono: ${this.datosFormulario.telefono}</p>
            <p>Email: ${this.datosFormulario.user}</p>
            <hr>
            <p><strong>su comunicado es el siguiente:</strong></p>
            <p><br> ${this.datosFormulario.text}</p>
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
        user: 'Gandhi2000@outlook.com',
        subject: this.datosFormulario.subject,
        text: this.datosFormulario.mensaje,
        //text: this.text+`<br> nombre: ${this.nombre} <br> telefono: ${this.telefono} <br>correo:${this.user}`
      };
      this.reset();
      console.log(body);
      this.datosFormulario.showAlert = this.enviar(body);
      //this.form.reset();
    } else {
      console.log("al parecer quieres mandar datos undefined \n" + this.datosFormulario.nombre);
    }
  }
  reset(): void {//borra los campoks del formulario
    this.datosFormulario.showAlert = false;
    this.datosFormulario.text = undefined;
    this.datosFormulario.nombre = undefined;
    this.datosFormulario.telefono = undefined;
    this.datosFormulario.user = undefined;

    this.contactForm.reset()
    this.llenarDatos
    console.log(this.contactForm)
  }
  //HACER UQE SE BORRERN LOS DATOS MANDADOS DEL FORMULARIO!!! <<<<<<<<<<<<<<<<<<<<<<<<<<<<------------

  enviar(body: any): boolean {
    console.log(body);
    this.mailService.sendMail('http://localhost:3000/mail', body)
      .then((data) => {
        console.log(data);
        return true;
        //this.datosFormulario.showAlert = true; // Mostrar el alert
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
    return false;
  }
  llenaForm(): FormGroup {
    return this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      user: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.minLength(10), Validators.pattern('^[0-9]+$')]],
      text: ['', [Validators.required, Validators.minLength(15)]]
    })
  }
  llenarDatos(): void {
    this.datosFormulario.nombre = this.contactForm.value.nombre;
    this.datosFormulario.user = this.contactForm.value.user;
    this.datosFormulario.telefono = this.contactForm.value.telefono;
    this.datosFormulario.text = this.contactForm.value.text;
  }

}

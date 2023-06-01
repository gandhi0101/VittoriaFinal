import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import firebase from 'firebase/compat/app';

declare global {
  interface Window{
    recaptchaVerifier: firebase.auth.RecaptchaVerifier;
    confirmationResult:any;
    grecaptcha:any;
  }
}

@Component({
  selector: 'app-registrartelefono',
  templateUrl: './registrartelefono.component.html',
  styleUrls: ['./registrartelefono.component.scss']
})
export class RegistrartelefonoComponent implements OnInit{
  validacion:string="";

  ngOnInit(): void {
      this.captchaCreator();
  }
  constructor(private fb: FormBuilder, private afAtth: AngularFireAuth ,private router: Router ){
    
  }

  mandarCodigo(numero:string, appVerified:any){
      this.afAtth.setPersistence('local').then(()=>{
        this.afAtth.signInWithPhoneNumber(numero, appVerified ).then(confirmation =>{
          window.confirmationResult = confirmation;
          Toast.fire({
            icon: 'success',
            title: 'Se envio un codigo a su telefono'
          })
          this.router.navigate(['/telefonologin']);
        }).catch(error=>{
          console.log(error)
        })

      })
  }

  mandar(numero:string){
    this.mandarCodigo(numero, window.recaptchaVerifier);
  }

  captchaCreator(){
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container')
    window.recaptchaVerifier.render();
  }




  firebaseError(code: string){

    switch(code){
      case 'auth/invalid-email':
      return 'Correo invalido';
      case 'auth/missing-password':
        return 'Introduzca la contraseña';
      case 'auth/user-not-found':
        return 'Usurio no encontrado'
      case 'auth/wrong-password':
        return 'Contraseña incorrecta'
      default:
      return 'Error desconocido';
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
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})
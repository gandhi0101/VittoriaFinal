import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.scss']
})
export class RegistrarUsuarioComponent {

  registrarUsuario: FormGroup;
  loading:boolean= false;
  validacion:string="";

  constructor(private fb: FormBuilder, private afAtth: AngularFireAuth ,private router: Router ){
    this.registrarUsuario = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      repetirPassword: ['', Validators.required]
    })
  }

  registrar(){
    const username = this.registrarUsuario.value.nombre;
    const email = this.registrarUsuario.value.email;
    const password = this.registrarUsuario.value.password;
    const repetirPassword = this.registrarUsuario.value.repetirPassword;

    if(password !== repetirPassword){
        this.validacion="Las contraseñas no coinsiden"
      return;
    }

    this.loading=true;
    this.afAtth.createUserWithEmailAndPassword(email, password)
    .then((user)=>{
      this.loading=false;
      this.verificarCorreo();
      const us = user.user;
      return us?.updateProfile({
        displayName: username
      });
    }).catch((error)=>{
      this.loading=false;
      this.validacion=this.firebaseError(error.code);
    })
  }

  verificarCorreo(){
    this.afAtth.currentUser
    .then((user=> user?.sendEmailVerification()))
    .then(()=>{
      Toast.fire({
        icon: 'success',
        title: 'Se envio un correo para su verificacion'
      })
      this.router.navigate(['/correologin']);
    })
  }

  firebaseError(code: string){

    switch(code){
      case 'auth/email-already-in-use':
      return 'El usuario ya existe';
      case 'auth/missing-email':
        return 'Debe de llenar el correo';
      case 'auth/missing-password':
        return 'Debe de llenar el password';
      case 'auth/weak-password':
        return 'La contraseña debe de tener 6 minimo';
      case 'auth/invalid-email':
        return 'Correo invalido';
      default:
      return 'Error desconocido';
    }
  }

  login(){
      this.router.navigate(['/correologin']);
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



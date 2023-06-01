import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginUsuario: FormGroup;
  validacion:string="";
  

  
  constructor(private fb: FormBuilder, private afAtth: AngularFireAuth ,private router: Router ){
    this.loginUsuario = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login(){
    const email = this.loginUsuario.value.email;
    const password = this.loginUsuario.value.password;
      this.afAtth.setPersistence('local').then(()=>{
      this.afAtth.signInWithEmailAndPassword(email,password).then((user) =>{
        if(user.user?.emailVerified || user.user?.email == 'admin@gmail.com'){
          this.router.navigate(['/inicio']);
        }else{
          Toast.fire({
            icon: 'success',
            title: 'Revisa tu correo y verifica, vuelve a intentalo'
          })
          this.router.navigate(['/correologin']);
        }
      }).catch((error) =>{
        this.validacion=this.firebaseError(error.code);
      })
    })

    

  }

  volver(){
    this.router.navigate(['/correo'])
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

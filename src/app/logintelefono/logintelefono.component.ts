import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
@Component({
  selector: 'app-logintelefono',
  templateUrl: './logintelefono.component.html',
  styleUrls: ['./logintelefono.component.scss']
})
export class LogintelefonoComponent {

  constructor(private afAtth: AngularFireAuth, private router: Router){}

  verificarCodigo(codigo:string){
    window.confirmationResult.confirm(codigo).then((result:any)=>{
      let credenciales = firebase.auth.PhoneAuthProvider.credential(window.confirmationResult.verificationId, codigo)
      this.afAtth.setPersistence('local').then(()=>{
        this.afAtth.signInWithCredential(credenciales).then((user)=>{
          console.log(user);
        });
        this.router.navigate(['/inicio']);
      })


    })
  }
}

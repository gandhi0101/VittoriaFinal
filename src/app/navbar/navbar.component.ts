import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {


  usuarioValido:boolean=false;
  isAdmin:boolean=false;
  nombreUsuario:string='';
  constructor(private router: Router, private afAtth: AngularFireAuth) {}

  reLogin(){
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.afAtth.authState.subscribe((user)=>{
      this.nombreUsuario = user?.displayName ?? '';
      if(user?.email == 'admin@gmail.com' ){
        this.isAdmin=true;
      }
      if ((user?.emailVerified || user?.phoneNumber) && user) {
          this.usuarioValido=true;
        console.log('El correo electrónico está verificado');
      } else {
        console.log('El correo electrónico no está verificado');
      }

    });
  }



  logOut(){
    this.afAtth.signOut()
  .then(() => {
    this.usuarioValido=false;
    this.isAdmin=false;
    this.router.navigate(['/inicio']);
    
    
  })
  .catch((error) => {
    // Ocurrió un error al cerrar sesión
  });
  }
}

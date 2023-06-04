import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WhyUsComponent } from './why-us/why-us.component';
import { ContactComponent } from './contact/contact.component';
import { CitasComponent } from './citas/citas.component';
import { RegistrarUsuarioComponent } from './registrar-usuario/registrar-usuario.component';
import { MainlayoutComponent } from './mainlayout/mainlayout.component';
import { OpcionverificacionComponent } from './opcionverificacion/opcionverificacion.component';
import { LoginComponent } from './login/login.component';
import { RegistrartelefonoComponent } from './registrartelefono/registrartelefono.component';
import { LogintelefonoComponent } from './logintelefono/logintelefono.component';
import { GraficasComponent } from './graficas/graficas.component';
import { FormMailComponent } from './form-mail/form-mail.component';

const routes: Routes = [
  {
    path: 'inicio',
    component: MainlayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'about', component: WhyUsComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'citas', component: CitasComponent },
      { path: 'graficas', component: GraficasComponent },
      { path: 'about/:id/:user', component: WhyUsComponent },
      { path: 'formulario-conacto', component: FormMailComponent },
      { path: '**', pathMatch: 'full', redirectTo: 'home' }
    ]
  },
  {
    path: 'login',
    component: OpcionverificacionComponent,
    children: [

    ]
  },
  { path: 'correo', component: RegistrarUsuarioComponent },
  { path: 'correologin', component: LoginComponent },
  { path: 'telefono', component: RegistrartelefonoComponent },
  { path: 'telefonologin', component: LogintelefonoComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'inicio' }
];






@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WhyUsComponent } from './why-us/why-us.component';
import { ContactComponent } from './contact/contact.component';
import { CitasComponent } from './citas/citas.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'about', component: WhyUsComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'citas', component: CitasComponent},
  {path: 'about/:id/:user', component: WhyUsComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

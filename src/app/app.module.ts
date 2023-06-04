import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule } from '@angular/fire/compat'



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactComponent } from './contact/contact.component';
import { WhyUsComponent } from './why-us/why-us.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ReservationComponent } from './reservation/reservation.component';
import { CitasService } from './citas.service';
import { Reservation2Component } from './reservation2/reservation2.component';
import { DatesComponent } from './dates/dates.component';
import { SearchDatesComponent } from './search-dates/search-dates.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTableModule} from '@angular/material/table';
import {MatStepperModule} from '@angular/material/stepper';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import { CitasComponent } from './citas/citas.component';
import { SeachComponent } from './seach/seach.component';
import { HttpClientModule } from '@angular/common/http';
import { VideoPipe } from './why-us/video.pipe';
import { RegistrarUsuarioComponent } from './registrar-usuario/registrar-usuario.component';
import { LoginComponent } from './login/login.component';
import { environment } from 'src/environments/environment';
import { MainlayoutComponent } from './mainlayout/mainlayout.component';
import { OpcionverificacionComponent } from './opcionverificacion/opcionverificacion.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { RegistrartelefonoComponent } from './registrartelefono/registrartelefono.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { LogintelefonoComponent } from './logintelefono/logintelefono.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';

import { CitaService } from './cita.service';
import { GraficasComponent } from './graficas/graficas.component';
import { CargandoComponent } from './cargando/cargando.component';
import { Chart } from 'chart.js/dist';
import { FormMailComponent } from './form-mail/form-mail.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ContactComponent,
    WhyUsComponent,
    NavbarComponent,
    HomeComponent,
    ReservationComponent,
    Reservation2Component,
    DatesComponent,
    SearchDatesComponent,
    CitasComponent,
    SeachComponent,
    VideoPipe,
    RegistrarUsuarioComponent,
    LoginComponent,
    MainlayoutComponent,
    OpcionverificacionComponent,
    SpinnerComponent,
    RegistrartelefonoComponent,
    LogintelefonoComponent,
    GraficasComponent,
    CargandoComponent,
    FormMailComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatTableModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatExpansionModule,
    MatGridListModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())
  ],
  providers: [CitasService, CitaService],
  bootstrap: [AppComponent]
})
export class AppModule { 

  
}

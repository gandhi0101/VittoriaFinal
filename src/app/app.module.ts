import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';



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
    VideoPipe
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
    HttpClientModule
  ],
  providers: [CitasService],
  bootstrap: [AppComponent]
})
export class AppModule { 

  
}

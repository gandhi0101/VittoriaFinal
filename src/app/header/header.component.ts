import { Component } from '@angular/core';
import { AccesibilidadComponent } from '../accesibilidad/accesibilidad.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
 
accs = new AccesibilidadComponent()
  
}

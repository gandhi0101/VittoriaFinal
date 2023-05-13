import { Component } from '@angular/core';
import { Cliente } from '../cliente';
import { CitasService } from '../citas.service';

@Component({
  selector: 'app-dates',
  templateUrl: './dates.component.html',
  styleUrls: ['./dates.component.scss']
})
export class DatesComponent {

  displayedColumns = ['Nombre', 'Correo', 'Fecha', 'Hora', 'Personas'];
  dataSource;
  tam: string = '';

  clientes: Cliente[];

  constructor(private clientesService: CitasService) {
    this.clientes = this.clientesService.getClientes();
    this.dataSource = this.clientesService.getClientes();
  }

  retornarTam(){
    if(this.clientes.length <= 3){
      console.log(this.tam)
      return this.tam = "200px";
    }else if(this.clientes.length >=4 && this.clientes.length <=8 ){
      console.log(this.tam)
     return  this.tam = "400px";
    }else{
      console.log(this.tam)
     return this.tam ="600px";
    }
  }

}

import { Component } from '@angular/core';
import { Cliente } from '../cliente';
import { CitasService } from '../citas.service';
@Component({
  selector: 'app-search-dates',
  templateUrl: './search-dates.component.html',
  styleUrls: ['./search-dates.component.scss']
})
export class SearchDatesComponent {

  clientes:Cliente[];
  index:number=-1;
  datos!: Cliente;
  mensaje:string="";

  constructor(public servicio: CitasService){
    this.clientes=this.servicio.getClientes();
  }


  
  ver(aux:string){
    this.index = this.clientes.findIndex( p => p.nombre === aux);
    console.log(this.index);
    if(this.index !== -1 ){
      this.datos = this.clientes[this.index];
    }else{
      this.mensaje="El heroe no existe";
      setTimeout(() =>{
        this.mensaje="";
      },2000);
    }

  }

}

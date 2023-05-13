import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
@Injectable({
  providedIn: 'root'
})
export class CitasService {

  private clientes: Cliente[];

  constructor() {
    this.clientes=JSON.parse( localStorage.getItem("data") || '[]' );
   }

   getClientes() {
    return this.clientes;
  }

  agregarCliente(cliente: Cliente) {
    this.clientes.push(cliente);
    localStorage.setItem('data',JSON.stringify(this.clientes));
  }

  nuevoCliente(): Cliente {
    return {
      nombre: "",
      fecha: "",
      hora:"",
      personas: "",
      correo: ""
    };
  }
}

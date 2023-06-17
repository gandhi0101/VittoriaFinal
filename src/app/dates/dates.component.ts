import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { CitasService } from '../citas.service';
import { CitaService } from '../cita.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import Swal from 'sweetalert2';

import {collection, addDoc, doc, deleteDoc, WhereFilterOp} from 'firebase/firestore';
import { query, where, getDocs } from "firebase/firestore";
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-dates',
  templateUrl: './dates.component.html',
  styleUrls: ['./dates.component.scss'],
})
export class DatesComponent implements OnInit {
  
  sexo:string="";
  edad:number=0;
  personas:number=0;

  displayedColumns = [
    'Nombre',
    'Correo',
    'Fecha',
    'Hora',
    'Personas',
    'Edad',
    'Sexo',
    'a',
  ];
  dataSource: Cliente[] = [];
  tam: string = '';
  isUpdate = false;
  opcion:string="";

  clientes: Cliente[] = [];
  citaCliente: Cliente[] = [];
  citas: any[] = [];
  isAdmin:boolean=false;

  constructor(
    private clientesService: CitasService,
    private clientSer: CitaService,
    private afAtth: AngularFireAuth,
    private firestore: Firestore
  ) {}

  ngOnInit(): void {
    this.clientSer.getCliente().subscribe((cliente) => {
      
      var i = 0;
      this.afAtth.authState.subscribe((user) => {
        if (user?.email == 'admin@gmail.com') {
          this.citaCliente=cliente;
          this.isUpdate=true;
          this.isAdmin=true;
        } else {
          cliente.forEach((element: Cliente) => {

            if (element.clave === user?.uid) {
              this.citaCliente[i] = element;
              i++;
            }
          });
          this.isUpdate=true;
        }
      });
    });
  }

  async onClickDelete(cliente: Cliente) {
    const response = await this.clientSer.deleteCliente(cliente);
    Toast.fire({
      icon: 'success',
      title: 'La cita se elimino con exito'
    })
    console.log(response);
  }

  async filtroSexo(){
      this.citas=[];
      const q = query(collection(this.firestore, "citas"), where("sexo", "==", this.sexo));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        this.citas.push(doc.data()); 
      });
  }

  async filtroEdad(){
    this.citas=[];
    const q = query(collection(this.firestore, "citas"), where("edad", "==", this.edad));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      this.citas.push(doc.data()); 
    });
}

async filtroPersonas(){
  this.citas=[];
  const q = query(collection(this.firestore, "citas"), where("personas", "<", this.personas));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    this.citas.push(doc.data()); 
  });
}

  mostrar(){
    switch (this.opcion) {
      case 'edad':
        this.filtroEdad();
        break;
      case 'sexo':
        this.filtroSexo();
        break;
      case 'personas':
        this.filtroPersonas();
      break;
      default:
        
        break;
    }
    
  }




}

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});


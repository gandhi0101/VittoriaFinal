import { Injectable } from '@angular/core';
import { Firestore, collectionData, Query  } from '@angular/fire/firestore';
import { Cliente } from './cliente';
import { collection, addDoc, doc, deleteDoc} from 'firebase/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  constructor(private firestore: Firestore) { }

  addCliente(cliente: Cliente){
    const clienteRef = collection(this.firestore, 'citas');
    return addDoc(clienteRef, cliente);
  }

  getCliente(): Observable<Cliente[]>{
    const clienteRef = collection(this.firestore, 'citas');
    return collectionData(clienteRef, {idField: 'UID'}) as Observable<Cliente[]>
    }

    deleteCliente(cliente:Cliente){
      const clientDocRef = doc(this.firestore,`citas/${cliente.UID}`)
      return deleteDoc(clientDocRef);
    }


}

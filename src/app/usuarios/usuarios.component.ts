import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent {

  usuarios: any;
  isUpdate = false;

  constructor(private http: HttpClient) { 
    this.http.get('https://apiusersvittory.onrender.com/api/users').subscribe((data) => {
      this.usuarios = data;
      console.log(data);
      this.isUpdate=true;
    }, (error) => {
      console.log('Error al obtener los datos de la API:', error);
    });
  }


}

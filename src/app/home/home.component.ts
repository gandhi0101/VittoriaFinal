import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccesibilidadComponent } from '../accesibilidad/accesibilidad.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit{
  url="https://my-json-server.typicode.com/juanMa281/api1/db";
  httpData: any;
  array:any[]=[];
  homeaccs= new HeaderComponent
  
  
  constructor(private httpclient:HttpClient){
    this.httpclient.get(this.url).subscribe( data => {
      this.httpData=data;
      this.array=this.httpData.menu;
    });
  }
  ngOnInit(): void {
    console.log(AccesibilidadComponent)
    throw new Error('Method not implemented.');
  }

}
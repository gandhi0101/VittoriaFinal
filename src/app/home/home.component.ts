import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  url="https://my-json-server.typicode.com/juanMa281/api1/db";
  httpData: any;
  array:any[]=[];
  
  
  constructor(private httpclient:HttpClient){
    this.httpclient.get(this.url).subscribe( data => {
      this.httpData=data;
      this.array=this.httpData.menu;
    });
  }
}
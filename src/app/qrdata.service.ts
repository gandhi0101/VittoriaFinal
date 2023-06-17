import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QrdataService {

  constructor( private httpClient: HttpClient) {
  }
  reciveData(url:string){

    return this.httpClient.get(url);
  
  }
}

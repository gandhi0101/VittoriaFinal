import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QrdataService {

  constructor( private httpClient: HttpClient) {
  }
  reciveData(url:string, body:any ){
    return this.httpClient.post(url, body).toPromise()
  }
}

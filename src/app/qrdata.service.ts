import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QrdataService {

  constructor( private httpClient: HttpClient) {
  }
  reciveData(url:string ){
<<<<<<< HEAD
    return this.httpClient.get(url);
=======
    return this.httpClient.get(url).toPromise()
>>>>>>> 7b4ba19b8c0648efa3ef7a86fe5704b2fa9df577
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  constructor(private httpClient: HttpClient) { }

  sendMail(url:string,body: any) {
    return this.httpClient.post(url, body).toPromise()
  }
}

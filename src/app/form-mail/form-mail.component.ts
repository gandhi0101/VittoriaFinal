import { Component } from '@angular/core';
import { MailService } from '../mail.service';

@Component({
  selector: 'app-form-mail',
  templateUrl: './form-mail.component.html',
  styleUrls: ['./form-mail.component.scss']
})
export class FormMailComponent {
  user?: string;
  Subject?: string;
  text?: string;

  constructor(private mailService: MailService) { }

  ngOnInit(): void {
    
  }
  insertar(): void {
    let body = {
      user: this.user,
      Subject: this.Subject,
      text: this.text
    };
    this.mailService.sendMail('http://localhost:3000/mail', body)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      })
  }

}

import { Component } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { QrdataService } from '../qrdata.service';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.scss']
})
export class QrcodeComponent {
  mostrar!: boolean;
  public name: any;
  public foto: any;
  public myAngularxQrCode: any  ;

  public qrCodeDownloadLink: SafeUrl = '';
  constructor(private qrdataService: QrdataService ) { }
  onChangeURL(url: SafeUrl) {
    let data = this.consultaDatos(`http://localhost:3000/qrcode`);
    console.log(data);
    this.qrCodeDownloadLink = url;///link de desarrollo y adaptar el objeto
  }
  

  consultaDatos(url:string):any{
    return this.qrdataService.reciveData(url);
  }

  borrarComponente() {
    this.mostrar = false;
  }
  lanzarQr() {
    this.mostrar = true;
  }

}

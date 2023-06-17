import { Component } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { QrdataService } from '../qrdata.service';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.scss']
})
export class QrcodeComponent {
  datos = {
    name: undefined,
    foto: undefined,
    QrCode: ''
  }

  public qrCodeDownloadLink: SafeUrl = '';
  mostrar: boolean = false;
  constructor(private qrdata: QrdataService) { }

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
    let dataService
    this.mostrar = true; this.qrdata.reciveData('http:/localhost:3000/qrdata').subscribe((data: any) => {
      dataService = data;
      console.log("datos", dataService);
      // Realiza el procesamiento adicional con los datos recibidos
      this.datos.QrCode = dataService.elemento;
      this.datos.foto = dataService.src
      this.datos.name = dataService.nombre
      this.onChangeURL(this.datos.QrCode);
    });
    //console.log("datos", this.datos);
    
    
  }

}

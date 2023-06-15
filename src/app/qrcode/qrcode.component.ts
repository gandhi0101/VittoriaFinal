import { Component } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.scss']
})
export class QrcodeComponent {
  mostrar!: boolean;
  public name: any;
  public foto: any;
  public myAngularxQrCode: any;
  elementos: string[] = ['https://www.recetasnestle.com.mx/escuela-sabor/recetas-caseras/como-hacer-lasana',
    'recetasderechupete.com/ensalada-caprese-receta-facil-y-rapida-de-esta-ensalada-italiana/49628/',
    'https://www.bonappetit.com/recipe/simple-carbonara',
    'https://www.directoalpaladar.com/recetas-de-arroces/arroz-a-milanesa-receta-italiana-original-risotto-alla-milanese',
    'https://saboryestilo.com.mx/gourmet/ossobuco/'];
  src: string[] = ['../../assets/images/lassaña.jpg', '../../assets/images/capresse.jpg',
    '../../assets/images/pasta-carbonara.webp', '../../assets/images/rissoto.jpg', '../../assets/images/ossobusco.jpg'];

  nombre: string[]=["Lassaña","Capresse","Pasta Carbonara","Rissoto","Ossobusco"]
  public qrCodeDownloadLink: SafeUrl = '';
  constructor() {
    const indiceAleatorio = Math.floor(Math.random() * this.elementos.length);
    this.myAngularxQrCode = this.elementos[indiceAleatorio];
    this.foto = this.src[indiceAleatorio];
    this.name = this.nombre[indiceAleatorio];
    console.log(this.myAngularxQrCode);

  }
  onChangeURL(url: SafeUrl) {
    this.qrCodeDownloadLink = url;
  }

  borrarComponente() {
    this.mostrar = false;
  }
  lanzarQr() {
    this.mostrar = true;
  }

}

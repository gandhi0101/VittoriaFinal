import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  
  
  constructor(private httpclient:HttpClient){
    this.httpclient.get(this.url).subscribe( data => {
      this.httpData=data;
      this.array=this.httpData.menu;
    });
    this.utterance = new SpeechSynthesisUtterance();

  }
//accesibilidad
  //Cambiar la fuente
  texto = 'Texto de ejemplo';
  selectedFont = 'Arial';
  originalFont = 'Arial';
  isAlternateFont = false;

  data: any;
  private utterance: SpeechSynthesisUtterance;


  reanudarLectura() {
    if (this.utterance) {
      speechSynthesis.speak(this.utterance);
    }
  }



  pausarLectura() {
    if (this.utterance) {
      speechSynthesis.pause();
    }
  }

  reiniciarLectura() {
    if (this.utterance) {
      speechSynthesis.cancel();
    }
  }





  ngOnInit() {

    const contenido = document.getElementById('contenido')?.innerText;

    if (contenido) {
      this.utterance = new SpeechSynthesisUtterance(contenido);
    }
  }


  cambiarFuente() {
    if (this.isAlternateFont) {
      this.selectedFont = this.originalFont;
    } else {
      this.selectedFont = 'Verdana';
    }

    this.isAlternateFont = !this.isAlternateFont;
  }

  // Escala de grises
  public grayscale: boolean = false;

  toggleGrayscale() {
    this.grayscale = !this.grayscale;
  }

  // Tamaños de letra
  public fontSize = 16; // Tamaño de letra inicial

  increaseFontSize() {
    this.fontSize += 2; // Incrementa el tamaño de letra en 2
    //console.log(this.fontSize);
  }

  decreaseFontSize() {
    if (this.fontSize > 2) {
      this.fontSize -= 2; // Decrementa el tamaño de letra en 2 (con límite mínimo de 2)
    }
  }


  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

}
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accesibilidad',
  templateUrl: './accesibilidad.component.html',
  styleUrls: ['./accesibilidad.component.scss']
})
export class AccesibilidadComponent implements OnInit {
  // Cambiar la fuente
  texto = 'Texto de ejemplo';
  selectedFont = 'Arial';
  originalFont = 'Arial';
  isAlternateFont = false;

  data: any;
  private utterance: SpeechSynthesisUtterance;

  constructor() {
    this.utterance = new SpeechSynthesisUtterance();
  }


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

import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'video'
})
export class VideoPipe implements PipeTransform {

  constructor(private comida: DomSanitizer){
    
  }

  transform( value: string, url: string): any {
    return this.comida.bypassSecurityTrustResourceUrl( url + value );
  }
   

}

import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-seach',
  templateUrl: './seach.component.html',
  styleUrls: ['./seach.component.scss']
})
export class SeachComponent {
  @Output() nombre = new EventEmitter<string>();

  emitir(msg: string){
    this.nombre.emit(msg);
  }

}

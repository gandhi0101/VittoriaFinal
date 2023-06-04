import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { CitaService } from '../cita.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GraficoService } from './grafico.service';

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.scss']
})
export class GraficasComponent implements OnInit {

  labelEdades:string[]=['18-25', '26-30', '31-35', '36-mas'];
  edades:number[]=[0,0,0,0];
  labelSexo:string[]=['Hombre', 'Mujer'];
  sexo:number[]=[0,0];
  labelPersonas:string[]=['1 Personas', '2 Personas', '3 Personas', '4 Personas', '5 Personas', '6 Personas', '7 Personas' ,'8 Personas', '9 Personas'];
  personas:number[]=[0,0,0,0,0,0,0,0,0];
  mostrar: boolean = false;
  cargado:boolean=false;
  graficaSelecionada:string="";
  graficaCargada:boolean=false;

  constructor(private clientSer: CitaService, private afAtth: AngularFireAuth, private grafico: GraficoService){
    
  }

  ngOnInit(): void {
    this.clientSer.getCliente().subscribe((cliente) => {
      var i = 0;
          cliente.forEach((element: Cliente) => {
            let edad=+element.edad;
            if(edad >= 18 && edad <=25){
              this.edades[0]++;
            }else if(edad >=26 && edad <=30){
              this.edades[1]++;
            }else if(edad >=31 && edad <=35){
              this.edades[2]++;
            }else{
              this.edades[3]++;
            }

            if(element.sexo=='hombre'){
              this.sexo[0]++;
            }else{
              this.sexo[1]++;
            }

            const cantidadPersonas: number = parseInt(element.personas, 10);
            if (!isNaN(cantidadPersonas) && cantidadPersonas >= 1 && cantidadPersonas <= 9) {
              this.personas[cantidadPersonas - 1]++;
            }
          });
    });

      this.cargado=true;
 
  }

  actualizarPersonas(){
    this.graficaCargada=false;
    setTimeout(()=>{
      this.grafico.double("Personas que asistiran por reservacion", 'Personas por reservacion', this.labelPersonas, this.personas, 'barras', 'bar');
      this.graficaCargada=true;
    }, 2000)
    
  }

  actualizarSexo(){
    this.graficaCargada=false;
    setTimeout(()=>{
      this.grafico.double("Sexo", "Sexo M/F", this.labelSexo, this.sexo, "pastel", 'doughnut');
      this.graficaCargada=true;
    }, 2000)
  }

  actualizarEdades(){
    this.graficaCargada=false;
    setTimeout(()=>{
      this.grafico.double("Eades", "Cantidad", this.labelEdades, this.edades, "barras2", 'bar');
      this.graficaCargada=true;
    }, 2000)
    
  }


}

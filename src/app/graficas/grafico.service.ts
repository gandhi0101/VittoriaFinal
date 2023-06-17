import { Injectable } from '@angular/core';
import { Chart } from 'chart.js';
import { registerables } from 'chart.js';
import { Color } from 'chart.js/dist/types/color';

Chart.register(...registerables);

@Injectable({
  providedIn: 'root'
})
export class GraficoService {

  constructor() { }

  double(graphTitle: string, primaryDatasetKey: string ,labels: any, primaryDataset: any, context: string, charttype: any, colores: any){
    var chart = new Chart(context, {
      type: charttype,
      data: {
        labels: labels,
        datasets: [{
          label: primaryDatasetKey,
          backgroundColor: colores,
          data: primaryDataset
        }]

      }
    })
  } 
}

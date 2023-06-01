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

  double(graphTitle: string, primaryDatasetKey: string ,labels: any, primaryDataset: any, context: string, charttype: any){
    var chart = new Chart(context, {
      type: charttype,
      data: {
        labels: labels,
        datasets: [{
          label: primaryDatasetKey,
          backgroundColor: [
            'rgb(54, 162, 235)',
            'rgb(255, 99, 132)',
            'rgb(255, 205, 86)',
            'rgb(255, 99, 60)',
          ],
          data: primaryDataset
        }]

      }
    })
  } 
}

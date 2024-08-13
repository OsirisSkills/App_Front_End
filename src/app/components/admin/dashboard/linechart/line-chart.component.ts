import {Component, Input, OnChanges, ViewChild} from '@angular/core';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnChanges{

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  @Input() lineChartLabels: string[] = [];
  @Input() lineChartTitles: string[] = [];
  @Input() lineChartNumbers: number[][] = [];
  @Input() lineChartColors: string[] = [];
  @Input() lineChartShowTable: boolean = false;

  ngOnChanges() {
    let datasets;

    datasets = this.setDataSets();

    this.lineChartData = {
      labels: this.lineChartLabels,
      datasets
    };
  }

  constructor() {
    Chart.register()
  }

  public lineChartData: ChartConfiguration['data'] = {

    labels: this.lineChartLabels,
    datasets: this.setDataSets()

  };

  setDataSets() {

    const datasets = [];

    for (let i = 0; i < this.lineChartNumbers.length; i++) {
      const data = this.lineChartNumbers[i];
      const backgroundColor = this.lineChartColors[i];
      const title: string = this.lineChartTitles[i];
      datasets.push({ data:data, label:title,  backgroundColor: this.changeAlpha(backgroundColor, 0.1), borderColor: backgroundColor, fill: 'origin' });
    }

    return datasets;

  }

  changeAlpha(color: string, alpha: number) {
    return color.replace(/[^,]+(?=\))/, alpha.toString());
  }



  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      y:
        {
          position: 'left',
        },
    },

    plugins: {
      legend: {display: true}
    }
  };

  public lineChartType: ChartType = 'line';

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    // console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    // console.log(event, active);
  }
}

import {Component, Input, OnChanges, ViewChild} from '@angular/core';
import {BaseChartDirective} from "ng2-charts";
import DatalabelsPlugin from 'chartjs-plugin-datalabels'

import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import {MemberRoleDisplayNamePipe} from "src/app/pipes/member-role-display-name.pipe";
import {ProjectStateDisplayNamePipe} from "src/app/pipes/project-state-display-name.pipe";

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnChanges{


  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  @Input() pieChartLabels: string[] = [];
  @Input() pieChartNumbers: number[] = [];
  @Input() pieChartLegendPosition: string = '';

  @Input() pieChartTitle: string = "";
  @Input() pieChartRecord: Record<string, number> = {};



  // Pie config
  public pieChartConfig: ChartConfiguration['options'] = {};

  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [ { data: [] }]
  };

  public pieChartPlugins = [ DatalabelsPlugin ];


  ngOnChanges() {

    this.pieChartConfig = {}; // <= Initialize the options, do not remove this line

    this.setDataAndLabels();
    this.setAndToggleTitle(this.pieChartTitle);
    this.setAndToggleLegendPosition(this.pieChartLegendPosition);

    this.setDataLabels();

    // Used to transform the key of the record to a more readable format
    const memberRoleDisplayNamePipe = new MemberRoleDisplayNamePipe();
    const projectStatusDisplayNamePipe = new ProjectStateDisplayNamePipe();

    this.pipeManager(memberRoleDisplayNamePipe);
    this.pipeManager(projectStatusDisplayNamePipe);
  }

  /***
   * Transforms the key of the record to a more readable format
   */
  pipeManager(pipe: any) {
    const transformedRecord: Record<string, number> = {};

    let isTransformed = false;

    if (Object.keys(this.pieChartRecord).length > 0) {
      for (const key in this.pieChartRecord) {
        if (this.pieChartRecord.hasOwnProperty(key)) {
          const newKey = pipe.transform(key);
          if (newKey !== key)
            isTransformed = true;
          transformedRecord[newKey] = this.pieChartRecord[key];
        }
      }

      if (isTransformed)
        this.pieChartData = {
          labels: Object.keys(transformedRecord),
          datasets: [{data: Object.values(transformedRecord)}]
        };
    }

    else if(this.pieChartLabels.length > 0) {
      for (const key in this.pieChartLabels) {
        if (this.pieChartLabels.hasOwnProperty(key)) {
          let memberRoleDisplayNamePipe = new MemberRoleDisplayNamePipe();
          const newKey = memberRoleDisplayNamePipe.transform(this.pieChartLabels[key]);
          if (newKey !== this.pieChartLabels[key])
            isTransformed = true;
          transformedRecord[newKey] = this.pieChartNumbers[key];
        }
      }

      if (isTransformed)
        this.pieChartData = {
          labels: Object.keys(transformedRecord),
          datasets: [{data: Object.values(transformedRecord)}]
        };
    }
    else
      return;
  }

  setDataLabels() {
    this.pieChartConfig = this.optSetPieChatOptions();
    this.pieChartConfig.plugins = this.optSetPieChatOptionsPlugins();

    if (!this.pieChartConfig.plugins.datalabels)
      this.pieChartConfig.plugins.datalabels = this.pieChartConfig.plugins.datalabels ?? {};

    this.pieChartConfig.plugins.datalabels.formatter = (value, ctx) => {
      if (ctx.chart.data.labels) {
        return ctx.chart.data.labels[ctx.dataIndex];
      }
    }
  }

  /***
   * Set the data and labels of the pie chart
   * @private
   * @method setDataAndLabels
   * @return void
   */
  setDataAndLabels(): void {
    if (Object.keys(this.pieChartRecord).length > 0) {
      this.pieChartData.labels = Object.keys(this.pieChartRecord);
      this.pieChartData.datasets = [{data: Object.values(this.pieChartRecord)}];
    }
    else if (this.pieChartNumbers.length > 0) {
      this.pieChartData.datasets = [{data: this.pieChartNumbers ?? []}];
      if (this.pieChartLabels.length > 0)
        this.pieChartData.labels = this.pieChartLabels;
    }
    else {
      this.pieChartData.labels = [];
      this.pieChartData.datasets = [{data: []}];
    }
  }

  /***
   * Set the title of the pie chart
   * @private
   * @method setTitle
   * @return void
   */
  setAndToggleTitle(title : string) {
    this.pieChartConfig = this.optSetPieChatOptions();
    this.pieChartConfig.plugins = this.optSetPieChatOptionsPlugins();

    if (!this.pieChartConfig.plugins.title)
      this.pieChartConfig.plugins.title = this.pieChartConfig.plugins.title ?? {};

    this.pieChartConfig.plugins.title.display = title !== '';
    this.pieChartConfig.plugins.title.text = title;
  }

  setAndToggleLegendPosition(position: string): void {

    this.pieChartConfig = this.optSetPieChatOptions();
    this.pieChartConfig.plugins = this.optSetPieChatOptionsPlugins();

    if (!this.pieChartConfig.plugins.legend)
      this.pieChartConfig.plugins.legend = this.pieChartConfig.plugins.legend ?? {};

    this.pieChartConfig.plugins.legend.display = true;

    switch (position) {
      case 'top':
        this.pieChartConfig.plugins.legend.position = 'top';
        break;
      case 'left':
        this.pieChartConfig.plugins.legend.position = 'left';
        break;
      case 'bottom':
        this.pieChartConfig.plugins.legend.position = 'bottom';
        break;
      case 'right':
        this.pieChartConfig.plugins.legend.position = 'right';
        break;
      default:
        this.pieChartConfig.plugins.legend.display = false;
        this.pieChartConfig.plugins.legend.position = undefined;
        break;
    }
  }

  /***
   * Make sure the options are initialized and return them
   */
  optSetPieChatOptions() {
    if(!this.pieChartConfig)
      this.pieChartConfig = this.pieChartConfig ?? {plugins: {}};
    return this.pieChartConfig;
  }

  /***
   * Make sure the options plugins are initialized and return them
   */
  optSetPieChatOptionsPlugins() {
    this.pieChartConfig = this.optSetPieChatOptions();
    if(!this.pieChartConfig.plugins)
      this.pieChartConfig.plugins = this.pieChartConfig.plugins ?? {};
    return this.pieChartConfig.plugins;
  }

  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  changeLabels(): void {
    const words = [ 'hen', 'variable', 'embryo', 'instal', 'pleasant', 'physical', 'bomber', 'army', 'add', 'film',
      'conductor', 'comfortable', 'flourish', 'establish', 'circumstance', 'chimney', 'crack', 'hall', 'energy',
      'treat', 'window', 'shareholder', 'division', 'disk', 'temptation', 'chord', 'left', 'hospital', 'beef',
      'patrol', 'satisfied', 'academy', 'acceptance', 'ivory', 'aquarium', 'building', 'store', 'replace', 'language',
      'redeem', 'honest', 'intention', 'silk', 'opera', 'sleep', 'innocent', 'ignore', 'suite', 'applaud', 'funny' ];
    const randomWord = () => words[Math.trunc(Math.random() * words.length)];
    this.pieChartData.labels = new Array(3).map(_ => randomWord());

    this.chart?.update();
    console.log(this.pieChartData.labels);
    console.log(this.pieChartData.datasets[0].data)
    console.log("------------------");
    console.log(this.pieChartLabels);
    console.log(this.pieChartNumbers);
  }

  addSlice(): void {
    if (this.pieChartData.labels) {
      this.pieChartData.labels.push([ 'Line 1', 'Line 2', 'Line 3' ]);
    }

    this.pieChartData.datasets[0].data.push(400);

    this.chart?.update();
  }

  removeSlice(): void {
    if (this.pieChartData.labels) {
      this.pieChartData.labels.pop();
    }

    this.pieChartData.datasets[0].data.pop();

    this.chart?.update();
  }



  toggleLegend(): void {
    if (this.pieChartConfig?.plugins?.legend) {
      this.pieChartConfig.plugins.legend.display = !this.pieChartConfig.plugins.legend.display;
    }

    // this.chart?.render();
  }



}

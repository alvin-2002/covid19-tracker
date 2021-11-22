import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Chart, registerables } from 'node_modules/chart.js';
import 'chartjs-adapter-moment';
import { GlobalGraphData } from 'src/app/model/global-graph';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  @Input() uniqueId: string = '0';
  displayHeading: string = '';
  status: boolean = true;

  globalData: GlobalGraphData = {
    cases: {},
    deaths: {},
    recovered: {}
  };

  myChart: Chart | any;
  dates: Date[] = [];

  newDataPerDay: number[] = [];
  totalData: number[] = [];

  constructor(private dataService: DataService) { 
    Chart.register(...registerables);
  }

  ngOnInit(): void {

    this.dataService.getGlobalDataGraphing().subscribe((data) => {
      this.globalData = data;

      if (this.uniqueId === 'Cases') {
        this.getMappingData(this.globalData.cases);
        this.isNewCases(this.uniqueId);

      } 

      else if (this.uniqueId === 'Deaths'){
        this.getMappingData(this.globalData.deaths);
        this.isNewCases(this.uniqueId);
      } 

      else {
        this.getMappingData(this.globalData.recovered);
        this.isNewCases(this.uniqueId);
      }
    })
    
  }

  isNewCases(uniqueId: string) {
    if (this.myChart){
      this.myChart.clear();
      this.myChart.destroy();
    }
    this.status = true;
    this.displayHeading = 'Daily ' + this.uniqueId;
    this.createChart(`${uniqueId} per Day`, this.dates,  this.newDataPerDay);
  }

  isTotalCases(uniqueId: string) {
    if (this.myChart){
      this.myChart.clear();
      this.myChart.destroy();
    }
    this.status = false;
    this.displayHeading = 'Total ' + this.uniqueId;
    this.createChart(`Total ${uniqueId}`, this.dates,  this.totalData);
  }

  getMappingData(data: any) {
    let lastDataPoint;

    for (let date in data) {
      if (lastDataPoint) {
        this.dates.push(new Date(date));
        let tdyCase = (+data[date]) - lastDataPoint;

        // recovered api has error, some days, total accumulated recovery is 0
        if (tdyCase < 0) tdyCase = 0;
        this.newDataPerDay.push(tdyCase)
      }
      lastDataPoint = +data[date];
      this.totalData.push(+data[date]);
    }
  }

  createChart(label: string, labels: Date[], datas: number[]) {
    this.myChart = new Chart(this.uniqueId, {
      type: 'bar',
      data: {
          labels: labels,
          datasets: [{
              label: label,
              data: datas,
              borderWidth: 1,
              borderColor: '#000'
          }]
      },
      options: {
        plugins: {
          legend: {
            labels: {
              boxWidth: 0
            }
          }
        },

        scales: {
          x: {
            grid: {
              display: false,
            },
            type: 'time',
            time: {
              displayFormats: {
                quarter: 'MMM YYYY'
              }
            }
          },

          y: {
            grid: {
              drawBorder: false
            },
            ticks: {
              callback: function(value, index, values) {
                if (value >= 1000000) return +value / 1e6 + 'M';
                else if (value >= 1000)  return +value / 1e3 + 'K';
                else return +value;
               
              }
            },

            beginAtZero: true,
          }
        },

        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

}

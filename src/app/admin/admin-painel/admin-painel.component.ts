import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from "ng-apexcharts";
import { ApexNonAxisChartSeries, ApexResponsive, ApexChart } from 'ng-apexcharts';
import {
  ApexAxisChartSeries,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexLegend
} from "ng-apexcharts";
import { eErros } from 'src/app/entidades/eErros';
import { AdminService } from 'src/app/Services/AdminService';

export type ChartDonutOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

export type ChartLineOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  tooltip: any; // ApexTooltip;
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-admin-painel',
  templateUrl: './admin-painel.component.html',
  styleUrls: ['./admin-painel.component.css']
})
export class AdminPainelComponent implements OnInit {

  @ViewChild("chartDonutId") chartDonutController: ChartComponent;
  @ViewChild("chartBarraId") chartBarraController: ChartComponent;
  public chartDonutOptions: Partial<ChartDonutOptions>;
  public chartLineOptions: Partial<ChartLineOptions>;
  public listErros: eErros[] = [];
  public page: number = 0;
  public size: number = 20;
  public pages:number;
  public firstPage: boolean;
  public lastPage: boolean;
  public total: number = 0;

  public listFuncoes:string[];
  public qtdeErrosFuncao:number[];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.chartDonut();
    this.chartBarra();

    this.adminService.getLogsErros(this.page, this.size).subscribe(resposta => {
      this.listErros = resposta['content'];
      this.pages = resposta['totalPages'];
      this.firstPage = resposta['first'];
      this.lastPage = resposta['last'];
      this.total = resposta['totalElements'];},
      
      errorResponse => {
        console.log(errorResponse);
      });
  }


  chartDonut(){
    this.chartDonutOptions = {
      series: [10, 81, 41, 21],
      chart: {
        width: 500,
        height: 500,
        type: "donut"
      },
      labels: ["UsuarioController", "AdminController", "AluguelController", "ProdutoController"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  chartBarra(){
    this.chartLineOptions = {
      series: [
        {
          name: "UsuarioController",
          data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
        },
        {
          name: "AdminController",
          data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35]
        },
        {
          name: "AluguelController",
          data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47]
        },
        {
          name: "ProdutoController",
          data: [81, 54, 35, 68, 43, 62, 13, 23, 67, 43, 75, 56]
        }
      ],
      chart: {
        height: 350,
        type: "line"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 5,
        curve: "straight",
        dashArray: [0, 8, 5]
      },
      title: {
        text: "Qtde Erros Por Mês",
        align: "left"
      },
      legend: {
        tooltipHoverFormatter: function(val, opts) {
          return (
            val +
            " - <strong>" +
            opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
            "</strong>"
          );
        }
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6
        }
      },
      xaxis: {
        labels: {
          trim: false
        },
        categories: [
          "Outubro 2020",
          "Novembro 2020",
          "Dezembro 2020",
          "Janeiro 2021",
          "Março 2021",
          "Abril 2021",
          "Maio 2021",
          "Junho 2021",
          "Julho 2021",
          "Agosto 2021",
          "Setembro 2021",
          "Outubro 2021"
        ]
      },
      tooltip: {
        y: [
          {
            title: {
              formatter: function(val) {
                return val;
              }
            }
          },
          {
            title: {
              formatter: function(val) {
                return val;
              }
            }
          },
          {
            title: {
              formatter: function(val) {
                return val;
              }
            }
          }
        ]
      },
      grid: {
        borderColor: "#f1f1f1"
      }
    };
  }
}

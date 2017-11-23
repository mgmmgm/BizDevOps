import {Component, OnInit, ViewChild} from '@angular/core';
import {GaService} from "./services/bdo.ga.service";
import {NgaService} from "./services/bdo.nga.service";
import {FilterChartDataService} from "./services/bdo.filterChartData.service";
import {BdoLoadingSpinnerService} from "./modules/BdoLoadingSpinner/service/bdo.loadingSpinner.service";
import {BdoData} from "./data/bdo.bdoData";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'app angular 4 works!';
  text = {value: 'abcd'};

  // @ViewChild(BdoPieChartComponent) childPieChartObj:BdoPieChartComponent;
  bdoData:BdoData;
  total:number;
  metricLabel:string;
  ngaModules:any[];
  googleAnalyticsMetrics:any[];
  shouldLoadTrendChart:boolean;
  dataForChart:any;
  dataForTrendChart:any;

  constructor(private gaService:GaService, private ngaService:NgaService, private filterChartDataService:FilterChartDataService, private spinner:BdoLoadingSpinnerService) {

  }

  ngOnInit(): void {
    this.shouldLoadTrendChart = true;
    this.googleAnalyticsMetrics = this.gaService.getMetrics();
    this.ngaModules = this.ngaService.getNgaModules();
    this.bdoData = new BdoData(this.googleAnalyticsMetrics[0].value, this.ngaModules[0].value, this.getFirstDateOfCurrentMonth(), new Date());
    this.loadCharts();
  }

  onChangeNgaModule() {
    this.shouldLoadTrendChart = true;
  }


  loadCharts() {
    setTimeout(() => this.spinner.show(), 1);
    this.getGoogleAnalytics();
    if (this.shouldLoadTrendChart) {
      this.getGoogleAnalyticsTrend();
      this.shouldLoadTrendChart = false;
    }
  }

  private getGoogleAnalytics() {
    this.gaService.getGoogleAnalyticsData(this.bdoData)
			.subscribe((response:any) => {
          let report = response.json().report;
          let values = Object.values(report);
          let result;
          switch (this.bdoData.googleAnalyticsMetric) {
            case 'pageViews': {
              this.metricLabel = 'Page Views';
              result = this.filterChartDataService.filterPageViewsData(values);
              break;
            }
            case 'timeOnPage': {
              this.metricLabel = 'Time On Page';
              result = this.filterChartDataService.filterTimeOnPageData(values);
              break;
            }
          }
          this.dataForChart = {};
          this.dataForChart.metadata = this.bdoData;
          this.dataForChart.series = result[0];
          this.spinner.hide();
          this.total = result[1];
        },
        (error) => {
          console.log(error);
          this.spinner.hide();
        });
  }

  private getGoogleAnalyticsTrend() {
    this.bdoData.startDate = this.getFirstDateOfCurrentMonth();
    this.gaService.getGoogleAnalyticsTrend(this.bdoData)
			.subscribe((response:any) => {
        let report = response.json().report;
        let values = Object.values(report);
        let result;
        switch (this.bdoData.googleAnalyticsMetric) {
          case 'pageViews': {
            this.metricLabel = 'Page Views';
            result = this.filterChartDataService.filterPageViewsTrend(values);
            this.dataForTrendChart = {};
            this.dataForTrendChart.metadata = this.bdoData;
            this.dataForTrendChart.series = result[0];
            break;
          }
          case 'timeOnPage': {
            this.metricLabel = 'Time On Page';
            result = this.filterChartDataService.filterTimeOnPageData(values);
            break;
          }
        }
      });
  }


  private getFirstDateOfCurrentMonth():Date {
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    return new Date(year, month, 1);
  }



  writeText() {
    console.log(`This is the text from input text: ${this.text.value}`);
  }
}

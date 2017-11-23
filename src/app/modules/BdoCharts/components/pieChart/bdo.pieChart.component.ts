/**
 * Created by golanm on 13/11/2017.
 */
import {Component, OnInit, Input, Output, OnChanges, SimpleChanges} from '@angular/core';
import {Chart} from "angular-highcharts";
import {DateFormatPipe} from "angular2-moment";

@Component({
	selector: 'bdo-pie-chart',
	templateUrl: './bdo.pieChart.component.html'
})
export class BdoPieChartComponent implements OnInit, OnChanges {

	chart:any;
	@Input() data:any;

	constructor(private dateFormat:DateFormatPipe) {

	}

	ngOnInit() {

	}

	ngOnChanges(changes: SimpleChanges): void {
		if (!changes.data.firstChange) {
			this.updateChart();
		}
	}


	updateChart(): void {
		let strStartDate = this.dateFormat.transform(this.data.metadata.startDate, 'D/M/YYYY');
		let strEndDate = this.dateFormat.transform(this.data.metadata.endDate, 'D/M/YYYY');
		this.chart = new Chart({
			chart: {
				type: 'pie',
				width: 600,
				backgroundColor: '#2e2e2e',
				options3d: {
					enabled: true,
					alpha: 45
				}
			},
			title: {
				text: `${this.data.metadata.ngaModuleName} ${this.data.metadata.googleAnalyticsMetric}`,
				style: {
					color: '#7cb5d2'
				}
			},
			subtitle: {
				text: `from ${strStartDate} - ${strEndDate}`,
				style: {
					color: '#a8e68c'
				}
			},
			plotOptions: {
				pie: {
					innerSize: 100,
					depth: 45,
				},
				series: {
					dataLabels: {
						color: 'white',
						enabled: true,
						// formatter: function() {
						// 	return Math.round(this.percentage*100)/100 + ' %';
						// },
					}
				}
			},
			credits: {
				enabled: false
			},
			series: [{
				name: this.data.metadata.googleAnalyticsMetric,
				data: this.data.series
			}]
		});

	}



	/*
	 chart = new Chart({
	 chart: {
	 type: 'pie',
	 options3d: {
	 enabled: true,
	 alpha: 45,
	 beta: 0
	 }
	 },
	 title: {
	 text: 'Browser market shares at a specific website, 2014'
	 },
	 tooltip: {
	 pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	 },
	 plotOptions: {
	 pie: {
	 allowPointSelect: true,
	 cursor: 'pointer',
	 depth: 35,
	 dataLabels: {
	 enabled: true,
	 format: '{point.name}'
	 }
	 }
	 },
	 series: [{
	 type: 'pie',
	 name: 'Browser share',
	 data: [
	 ['Firefox', 45.0],
	 ['IE', 26.8],
	 {
	 name: 'Chrome',
	 y: 12.8,
	 sliced: true,
	 selected: true
	 },
	 ['Safari', 8.5],
	 ['Opera', 6.2],
	 ['Others', 0.7]
	 ]
	 }]
	 */



}
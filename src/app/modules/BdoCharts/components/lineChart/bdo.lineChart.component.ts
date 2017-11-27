/**
 * Created by golanm on 15/11/2017.
 */
import {Component, OnChanges, SimpleChanges, Input} from '@angular/core';
import {Chart} from "angular-highcharts";
import {DateFormatPipe} from "angular2-moment";

@Component({
	'selector': 'bdo-line-chart',
	templateUrl: './bdo.lineChart.component.html'
})
export class BdoLineChartComponent implements OnChanges{

	chart:any;
	@Input() data:any;

	constructor(private dateFormat:DateFormatPipe) {

	}

	ngOnChanges(changes: SimpleChanges): void {
		//noinspection TypeScriptUnresolvedVariable
		if (!changes.data.firstChange) {
			this.updateChart();
		}
	}


	updateChart(): void {
		let strStartDate = this.dateFormat.transform(this.data.metadata.startDate, 'D/M/YYYY');
		let strEndDate = this.dateFormat.transform(this.data.metadata.endDate, 'D/M/YYYY');
		this.data.series.map((s:any) => {
			s.pointStart = Date.UTC(this.data.metadata.startDate.getFullYear(), this.data.metadata.startDate.getMonth(), 1); // always start from first day of month
			s.pointInterval = 24 * 3600 * 1000; // one day
		});

		this.chart = new Chart({
			chart: {
				type: 'line',
				width: 600,
				backgroundColor: '#2e2e2e',
				options3d: {
					enabled: true,
					alpha: 45
				}
			},
			title: {
				text: `${this.data.metadata.ngaModuleName} ${this.data.metadata.googleAnalyticsMetric} - Trend`,
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


			},
			credits: {
				enabled: false
			},
			tooltip: {
				// shared: true
			},
			xAxis: {
				type: 'datetime',
				dateTimeLabelFormats: {
					day: '%d %b %Y'    //ex- 01 Jan 2016
				},
				labels: {
					style: {
						color: 'white'
					}
				}
			},
			yAxis: {
				title: {
					text: this.data.metadata.googleAnalyticsMetric,
					style: {
						color: 'white'
					}
				},
				labels: {
					style: {
						color: 'white'
					}
				}
			},
			legend: {
				// layout: 'vertical',
				// align: 'right',
				// verticalAlign: 'middle',
				itemStyle: {
					color: 'white'
				}
			},
			series: this.data.series
			// 	[{
			// 	name: 'Installation',
			// 	data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
			// }, {
			// 	name: 'Manufacturing',
			// 	data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
			// }, {
			// 	name: 'Sales & Distribution',
			// 	data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
			// }, {
			// 	name: 'Project Development',
			// 	data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
			// }, {
			// 	name: 'Other',
			// 	data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
			// }]




		});

	}


}
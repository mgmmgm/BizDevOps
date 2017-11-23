/**
 * Created by golanm on 13/11/2017.
 */
import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Chart} from "angular-highcharts";
import {DateFormatPipe} from "angular2-moment";

@Component({
	selector: 'bdo-column-chart',
	templateUrl: './bdo.columnChart.component.html'
})
export class BdoColumnChartComponent implements OnChanges {

	chart: any;
	@Input() data:any;

	constructor(private dateFormat:DateFormatPipe) {

	}

	ngOnChanges(changes: SimpleChanges): void {
		if (!changes.data.firstChange) {
			this.updateChart();
		}
	}

	updateChart() {
		let strStartDate = this.dateFormat.transform(this.data.metadata.startDate, 'D/M/YYYY');
		let strEndDate = this.dateFormat.transform(this.data.metadata.endDate, 'D/M/YYYY');

		let xNames:any[] = [], xValues:any[] = [];
		this.data.series.forEach((s:any) => {
			xNames.push(s[0]);
			xValues.push(s[1]);
		});

		this.chart = new Chart({
			chart: {
				type: 'column',
				width: 600,
				backgroundColor: '#2e2e2e',
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
			legend: {
				enabled: false
			},
			credits: {
				enabled: false
			},
			xAxis: {
				categories: xNames,
				crosshair: true,
				labels: {
					style: {
						color: 'white'
					}
				}
			},
			yAxis: {
				min: 0,
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
			// tooltip: {
			// 	headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
			// 	pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
			// 	'<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
			// 	footerFormat: '</table>',
			// 	shared: true,
			// 	useHTML: true
			// },
			plotOptions: {
				column: {
					pointPadding: 0.2,
					borderWidth: 0,
					dataLabels: {
						enabled: false
					}
				}
			},
			series: [{
				name: 'Page views',
				data: xValues
			}]
		});
	}

}
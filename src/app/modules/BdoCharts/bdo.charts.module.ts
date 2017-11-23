import {NgModule} from "@angular/core";
import {MomentModule, DateFormatPipe} from "angular2-moment";
import {ChartModule} from "angular-highcharts";
import {BdoPieChartComponent} from "./components/pieChart/bdo.pieChart.component";
import {BdoColumnChartComponent} from "./components/columnChart/bdo.columnChart.component";
import {BdoLineChartComponent} from "./components/lineChart/bdo.lineChart.component";
/**
 * Created by golanm on 22/11/2017.
 */

@NgModule({
	imports: [
		ChartModule,
		MomentModule
	],
	declarations: [
		BdoPieChartComponent,
		BdoColumnChartComponent,
		BdoLineChartComponent
	],
	exports: [
		BdoPieChartComponent,
		BdoColumnChartComponent,
		BdoLineChartComponent
	],
	providers: [DateFormatPipe]
})
export class BdoChartsModule {}
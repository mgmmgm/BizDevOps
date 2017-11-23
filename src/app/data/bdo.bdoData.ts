/**
 * Created by golanm on 22/11/2017.
 */

export class BdoData {
	googleAnalyticsMetric:string;
	ngaModuleName:string;
	startDate:Date;
	endDate:Date;

	constructor(googleAnalyticsMetric:string, ngaModuleName:string, startDate:Date, endDate:Date) {
		this.googleAnalyticsMetric = googleAnalyticsMetric;
		this.ngaModuleName = ngaModuleName;
		this.startDate = startDate;
		this.endDate = endDate;
	}
}
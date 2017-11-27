import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {BdoData} from "../data/bdo.bdoData";
import {HttpClient} from "@angular/common/http";
/**
 * Created by golanm on 12/11/2017.
 */

@Injectable()
export class GaService {

	// example: http://localhost:9999/bdo/ga?start-date=2017-11-03&end-date=2017-11-09

	hostName = 'localhost';
	hostPort = '9999';
	baseUrl = `http://${this.hostName}:${this.hostPort}/bdo/ga`;

	metrics:any[] = [
		{label: 'Page Views', value: 'pageViews'},
		{label: 'Time On Page', value: 'timeOnPage'}
	];

	constructor(private http:HttpClient) {

	}

	getMetrics() {
		return this.metrics;
	}

	getGoogleAnalyticsData(bdoData:BdoData) {
		let startDate = this.convertDateAsServerExpected(bdoData.startDate);
		let endDate = this.convertDateAsServerExpected(bdoData.endDate);
		let url = `${this.baseUrl}/${bdoData.googleAnalyticsMetric}?module-name=${bdoData.ngaModuleName}&start-date=${startDate}&end-date=${endDate}`;
		return this.http.get(url);
	}

	getGoogleAnalyticsTrend(bdoData:BdoData) {
		let startDate = this.convertDateAsServerExpected(bdoData.startDate);
		let endDate = this.convertDateAsServerExpected(bdoData.endDate);
		let requestedMetric = this.capitalizeFirstLetter(bdoData.googleAnalyticsMetric);
		let url = `${this.baseUrl}/trend${requestedMetric}?module-name=${bdoData.ngaModuleName}&start-date=${startDate}&end-date=${endDate}`;
		return this.http.get(url);
	}

	private convertDateAsServerExpected(date:Date): string {
		date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
		return date.toJSON().slice(0, 10);
	}

	private capitalizeFirstLetter(word:string) {
		return word.charAt(0).toUpperCase() + word.slice(1);
	}

}
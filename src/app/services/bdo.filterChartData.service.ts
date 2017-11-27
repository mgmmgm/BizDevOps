import {Injectable} from "@angular/core";
/**
 * Created by golanm on 15/11/2017.
 */

@Injectable()
export class FilterChartDataService {

	filterPageViewsData(values:any):any[] {
		// let pipelineDimensions = values.filter((row:any) => row.dimensions[0].startsWith('ga:pageTitle: ' + moduleName));
		let totals = {
			pageViews: 0,
			users: 0
		}
		let chartData = values.map((pd:any) => {
			let dimension = pd.dimensions[0].replace('ga:pageTitle: ', '');
			let metric = +pd.Metrics['ga:pageviews'];
			let users = +pd.Metrics['ga:users'];
			// let metric = +pd.Metrics.usage.replace('ga:pageviews: ','');
			totals.pageViews += metric;
			totals.users += users;
			return {
					name: dimension,
					y: metric,
					custom: users
				};
		});
		return [chartData, totals];
	}

	filterPageViewsTrend(values:any):any[] {
		// let pipelineDimensions = values.filter((row:any) => row.dimensions[0].startsWith('ga:pageTitle: ' + moduleName));
		let total = 0;
		let chartData = values.map((pd:any) => {
			let dimension = pd.dimensions[0].replace('ga:pageTitle: ', '');
			let day = pd.dimensions[1].replace('ga:day: ', '');
			let metric = +pd.Metrics['ga:pageviews'];
			let users = +pd.Metrics['ga:users'];
			total += metric;
			let newArray = [dimension, [day, metric]];
			return newArray;
		});
		let chartDataGroupedByDimension = this.groupBy(chartData, (c:any) => c[0]);
		let trendData = this.sortByDay(chartDataGroupedByDimension);
		return [trendData, total];
	}

	filterTimeOnPageData(values:any):any[] {
		// let pipelineDimensions = values.filter((row:any) => row.dimensions[0].startsWith('ga:pageTitle: ' + moduleName));
		let total = 0;
		let chartData = values.map((pd:any) => {
			let dimension = pd.dimensions[0].replace('ga:pageTitle: ', '');
			let metric = +pd.Metrics.usage.replace('ga:timeOnPage: ','');
			total += metric;
			let newArray = [dimension, metric];
			return newArray;
		});
		return [chartData, total];
	}

	private groupBy(list:any, keyGetter:any) {
		const map = new Map();
		list.forEach((item:any) => {
			const key = keyGetter(item);
			const collection = map.get(key);
			if (!collection) {
				let newArray = [];
				newArray.push(item[1]);
				map.set(key, newArray);
			} else {
				collection.push(item[1]);
			}
		});
		return map;
	}

	private sortByDay(list:any) {
		let data:any = [];
		list.forEach((items:any, key:any) => {
			items.sort((a:any, b:any) => a[0] !== b[0] ? a[0] > b[0] ? 1 : -1 : 0);
			let startDay = 1;
			let values:any = [];
			items.forEach((b:any) => {
				let day = +b[0];
				if (day === startDay) {
					values.push(b[1]);
					startDay++;
				} else {
					while (day > startDay) {
						values.push(0);
						startDay++;
					}
					values.push(b[1]);
					startDay++;
				}
			});
			data.push({name: key, data: values});
		});
		return data;
	}


	private convertMillisecondsToTime(millisec:number) {
		let seconds:any = (millisec / 1000).toFixed(0);
		let minutes:any = Math.floor(seconds / 60);
		let hours:any = '';
		if (minutes > 59) {
			hours = Math.floor(minutes / 60);
			hours = (hours >= 10) ? hours : '0' + hours;
			minutes = minutes - (hours * 60);
			minutes = (minutes >= 10) ? minutes : '0' + minutes;
		}

		seconds = Math.floor(seconds % 60);
		seconds = (seconds >= 10) ? seconds : '0' + seconds;
		if (hours !== '') {
			return hours + ':' + minutes + ':' + seconds;
		}
		return minutes + ':' + seconds;
	}


}
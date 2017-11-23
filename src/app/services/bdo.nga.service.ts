import {Injectable} from "@angular/core";
/**
 * Created by golanm on 14/11/2017.
 */

@Injectable()
export class NgaService {

	modules = [
		{label: 'PIPELINE', value: 'PIPELINE'},
		{label: 'DEFECT', value: 'DEFECT'},
		{label: 'MY WORK', value: 'MY WORK'},
		{label: 'TEAM BACKLOG', value: 'TEAM BACKLOG'},
		{label: 'Workspaces', value: 'Workspaces'},
		{label: 'DASHBOARD', value: 'DASHBOARD'},
		{label: 'BACKLOG', value: 'BACKLOG'},
		{label: 'QUALITY', value: 'QUALITY'}
	];

	getNgaModules() {
		return this.modules;
	}
}
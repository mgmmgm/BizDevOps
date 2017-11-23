import {Component, OnInit, Input} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import {PostsService} from "../services/bdo.posts.service";
import {GaService} from "../services/bdo.ga.service";

@Component({
	selector: 'bdo-test',
	templateUrl: './bdo.test.component.html',
	styleUrls: ['./bdo.test.component.css']
})
export class BdoTestComponent implements OnInit{

	@Input() name:string = 'aaa';
	posts:string[] = [];
	data:any[] = [];

	constructor(private postsService:PostsService, private gaService:GaService) {

	}

	ngOnInit(): void {
	}


	getPosts() {
		this.postsService.getPosts()
			.subscribe(data => {
				this.posts.push(data);
			});
	}




}
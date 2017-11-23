
import {Http} from "@angular/http";
import {Injectable} from "@angular/core";

@Injectable()
export class PostsService {

	constructor(private http: Http) {

	}

	getPosts() {
		return this.http.get('https://jsonplaceholder.typicode.com/posts')
			.mergeMap(response => response.json())
			.filter((p:any) => p.id < 10)
			.map((p:any, i) => 'Post ' + (i + 1) + ' - ' + p.title);

	}
}
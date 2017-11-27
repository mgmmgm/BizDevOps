
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class PostsService {

	constructor(private http: HttpClient) {

	}

	getPosts() {
		return this.http.get('https://jsonplaceholder.typicode.com/posts')
			.mergeMap((response:any) => response.json())
			.filter((p:any) => p.id < 10)
			.map((p:any, i) => 'Post ' + (i + 1) + ' - ' + p.title);

	}
}
import {OnDestroy, OnInit, Component, Input, ViewEncapsulation} from "@angular/core";
import { Subscription} from 'rxjs/Subscription';
import { BdoLoadingSpinnerService } from './service/bdo.loadingSpinner.service';

@Component({
	selector: 'bdo-loading-spinner',
	templateUrl: './bdo.loadingSpinner.component.html',
	styles: ['./bdo.loadingSpinner.component.css']
})
export class BdoLoadingSpinnerComponent implements OnInit, OnDestroy {

	_template: String = `
  <div style="color: #64d6e2" class="la-ball-clip-rotate-multiple la-3x">
    <div></div>
    <div></div>
    <div></div>
  </div>`;

	@Input() loadingText: String = '';
	@Input() threshold: Number = 500;
	subscription: Subscription;
	showSpinner:boolean = false;

	constructor(private spinnerService: BdoLoadingSpinnerService) {

	}

	ngOnInit(): void {
		this.createServiceSubscription();
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	createServiceSubscription() {
		let timer: any;
		let _this = this;

		this.subscription =
			this.spinnerService.spinnerObservable.subscribe(show => {
				if (show) {
					if(timer)
						return;

					timer = setTimeout(function () {
						timer = null;

						this.showSpinner = show;
					}.bind(_this), _this.threshold);
				}
				else {
					if(timer){
						clearTimeout(timer);

						timer = null;
					}

					_this.showSpinner = false;
				}
			});
	}

}
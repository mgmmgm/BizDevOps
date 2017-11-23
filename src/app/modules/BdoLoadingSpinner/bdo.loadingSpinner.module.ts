import {NgModule} from "@angular/core";
import {BdoLoadingSpinnerService} from "./service/bdo.loadingSpinner.service";
import {BdoLoadingSpinnerComponent} from "./bdo.loadingSpinner.component";
/**
 * Created by golanm on 20/11/2017.
 */

@NgModule({
	imports: [],
	declarations: [BdoLoadingSpinnerComponent],
	exports: [BdoLoadingSpinnerComponent],
	providers: [BdoLoadingSpinnerService]
})
export class BdoLoadingSpinnerModule {}
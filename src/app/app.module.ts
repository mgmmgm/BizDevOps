import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import {BdoTestComponent} from "./test/bdo.test.component";
import {ButtonModule} from "primeng/primeng";
import {PostsService} from "./services/bdo.posts.service";
import {GaService} from "./services/bdo.ga.service";
import {CalendarModule} from "primeng/components/calendar/calendar";
import {NgaService} from "./services/bdo.nga.service";
import {DropdownModule} from "primeng/components/dropdown/dropdown";
import {FilterChartDataService} from "./services/bdo.filterChartData.service";
import {BdoLoadingSpinnerModule} from "./modules/BdoLoadingSpinner/bdo.loadingSpinner.module";
import {BdoChartsModule} from "./modules/BdoCharts/bdo.charts.module";



@NgModule({
  declarations: [
    AppComponent,
    BdoTestComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    BdoLoadingSpinnerModule,
    FormsModule,
    HttpModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    BdoChartsModule
    // ChartModule,
    // MomentModule
  ],
  providers: [PostsService, GaService, NgaService, FilterChartDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }

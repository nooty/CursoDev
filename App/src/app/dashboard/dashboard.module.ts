import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccumulationChartAllModule, ChartAllModule } from '@syncfusion/ej2-angular-charts';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ChartAllModule,
    AccumulationChartAllModule
  ]
})
export class DashboardModule { }

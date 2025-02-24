import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessAccDashboardRoutingModule } from './business-acc-dashboard-routing.module';
import { BusinessAccDashboardComponent } from './business-acc-dashboard/business-acc-dashboard.component';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCommonModule } from '@angular/material/core';


@NgModule({
  declarations: [BusinessAccDashboardComponent],
  imports: [
    CommonModule,
    BusinessAccDashboardRoutingModule, MatIconModule, MatPaginatorModule, FormsModule, ReactiveFormsModule,MatTableModule,
    MatButtonModule,MatSortModule,MatTooltipModule,CommonModule,MatCommonModule
  ]
})
export class BusinessAccDashboardModule { }

import { NgModule } from '@angular/core';
import { TextComponentModule, ButtonComponentModule, ModalComponentModule } from 'projects/components/src/public-api';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';

@NgModule({
  declarations: [AdminDashboardComponent],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    AdminDashboardRoutingModule,
    ButtonComponentModule,
    TextComponentModule,
    ModalComponentModule
  ],
  exports: [AdminDashboardComponent]
})
export class AdminDashboardComponentModule { }

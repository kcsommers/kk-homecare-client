import { NgModule } from '@angular/core';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { AdminLoginPageComponent } from './pages/admin-login-page/admin-login-page.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ComponentsModule } from '@kk/components';
import { FormsModule } from '@angular/forms';
import { AdminMessagesComponent } from './components/admin-messages/admin-messages.component';
import { ImageUploaderComponent } from './components/image-uploader/image-uploader.component';
import { InvoicesComponent } from './components/invoices/invoices.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InvoicePageComponent } from './pages/invoice-page/invoice-page.component';
import { AdminMessagesPageComponent } from './pages/admin-messages-page/admin-messages-page.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AdminPageComponent,
    AdminLoginPageComponent,
    AdminMessagesComponent,
    ImageUploaderComponent,
    InvoicesComponent,
    InvoicePageComponent,
    AdminMessagesPageComponent,
    AdminDashboardComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    FontAwesomeModule
  ],
  exports: []
})
export class AdminModule { }

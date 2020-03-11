import { NgModule } from '@angular/core';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { AdminLoginPageComponent } from './pages/admin-login-page/admin-login-page.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ComponentsModule } from '@kk/components';
import { FormsModule } from '@angular/forms';
import { AdminMessagesComponent } from './components/admin-messages/admin-messages.component';
import { ImageUploaderComponent } from './components/image-uploader/image-uploader.component';
import { InvoicesComponent } from './components/invoices/invoices.component';

@NgModule({
  declarations: [
    AdminPageComponent,
    AdminLoginPageComponent,
    AdminMessagesComponent,
    ImageUploaderComponent,
    InvoicesComponent
  ],
  imports: [
    AdminRoutingModule,
    ComponentsModule,
    FormsModule,
  ],
  exports: []
})
export class AdminModule { }

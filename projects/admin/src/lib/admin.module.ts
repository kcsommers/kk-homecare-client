import { NgModule } from '@angular/core';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { AdminLoginPageComponent } from './pages/admin-login-page/admin-login-page.component';
import { ComponentsModule } from '@kk/components';
import { FormsModule } from '@angular/forms';
import { ImageUploaderComponent } from './components/image-uploader/image-uploader.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AdminPageComponent,
    AdminLoginPageComponent,
    ImageUploaderComponent,
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

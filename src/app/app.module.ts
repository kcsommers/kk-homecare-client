import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppShellModule } from 'projects/app-shell/src/public-api';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { FaIconsComponent } from '../assets/icons/font-awesome.icons';
import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from 'projects/components/src/public-api';
import { httpErrorProvider } from 'projects/core/src/lib/http/error-interceptor';
import { jwtProvider } from 'projects/core/src/lib/auth/jwt-interceptor';
import { AdminPageComponentModule } from '@kk/admin';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppShellModule,
    FontAwesomeModule,
    HttpClientModule,
    AdminPageComponentModule,
    ComponentsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    httpErrorProvider,
    jwtProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    FaIconsComponent.init(library);
  }
}

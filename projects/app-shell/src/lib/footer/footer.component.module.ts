import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './footer.component';
import { TextComponentModule } from '@kk/components';
@NgModule({
  declarations: [FooterComponent],
  imports: [
    FontAwesomeModule,
    TextComponentModule
  ],
  exports: [FooterComponent]
})
export class FooterComponentModule { }

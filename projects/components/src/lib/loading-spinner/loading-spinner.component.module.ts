import { NgModule } from '@angular/core';
import { LoadingSpinnerComponent } from './loading-spinner.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [LoadingSpinnerComponent],
  imports: [
    FontAwesomeModule
  ],
  exports: [LoadingSpinnerComponent]
})
export class LoadingSpinnerComponentModule { }

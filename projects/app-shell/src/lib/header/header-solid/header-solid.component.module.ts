import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderSolidComponent } from './header-solid.component';
import { HeaderService } from '../header.service';

@NgModule({
  declarations: [HeaderSolidComponent],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule
  ],
  exports: [HeaderSolidComponent],
  providers: [HeaderService]
})
export class HeaderSolidComponentModule { }

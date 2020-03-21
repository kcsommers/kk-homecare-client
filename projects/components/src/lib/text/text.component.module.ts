import { NgModule } from '@angular/core';
import { TextComponent } from './text.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [TextComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [TextComponent]
})
export class TextComponentModule { }

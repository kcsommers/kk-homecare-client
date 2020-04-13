import { OnInit } from '@angular/core';

export class BasePage implements OnInit {
  ngOnInit(): void {
    window.scrollTo({ top: 0 });
  }
}

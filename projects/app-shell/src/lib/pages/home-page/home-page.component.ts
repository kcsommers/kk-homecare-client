import { Component, OnDestroy } from '@angular/core';
import { GlobalService } from 'projects/core/src/lib/services/global.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'kk-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnDestroy {
  private _destroy$ = new Subject();
  public animate = true;

  constructor(public globalService: GlobalService) {
    this.globalService.appLoaded$.pipe(
      takeUntil(this._destroy$)
    ).subscribe((isLoaded: boolean) => {
      if (isLoaded) {
        if (window.scrollY >= 250) {
          this.animate = false;
        } else {
          setTimeout(() => {
            this.animate = false;
          }, 2000);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.unsubscribe();
  }
}

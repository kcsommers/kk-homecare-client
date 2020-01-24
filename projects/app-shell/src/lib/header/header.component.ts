import { Component, HostListener, HostBinding, Input, OnInit, OnDestroy, ElementRef, ChangeDetectorRef } from '@angular/core';
import { GlobalService } from 'projects/core/src/lib/services/global.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Pages } from '@kk/core';

@Component({
  selector: 'kk-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public useFullHeader = false;

  public navSticky = false;

  public animate = true;

  private _destroy$ = new Subject();

  @HostListener('window:scroll')
  private onScroll() {
    this.checkScroll();
  }

  constructor(public globalService: GlobalService, private _cd: ChangeDetectorRef) {
    this.globalService.currentPage$.pipe(
      takeUntil(this._destroy$)
    ).subscribe((page: Pages) => {
      this.useFullHeader = page === Pages.HOME;
    });

    this.globalService.appLoaded$.pipe(
      takeUntil(this._destroy$)
    ).subscribe((isLoaded: boolean) => {
      if (isLoaded) {
        if (window.scrollY >= 250) {
          this.animate = false;
        } else {
          setTimeout(() => {
            this.animate = false;
          }, 1250);
        }
      }
    });
  }

  ngOnInit(): void {
    this.checkScroll();
  }

  ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.unsubscribe();
  }

  private checkScroll(): void {
    if (window.scrollY >= 250 && !this.navSticky) {
      this.navSticky = true;
      this.animate = false;
    }
    if (window.scrollY < 250 && this.navSticky) {
      this.navSticky = false;
    }
  }
}

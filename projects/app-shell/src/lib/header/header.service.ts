import { Injectable, OnDestroy } from "@angular/core";
import { Router, NavigationEnd } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Pages } from '@kk/core';

@Injectable()
export class HeaderService implements OnDestroy {

  public activeTab: string;

  private _destroy$ = new Subject();

  private _pageUrlsMap = new Map<string, Pages>([
    ['/', Pages.HOME],
    ['/about', Pages.ABOUT],
    ['/services', Pages.SERVICES],
    ['/photos', Pages.PHOTOS],
    ['/contact', Pages.CONTACT]
  ]);

  constructor(private _router: Router) {
    this._router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      takeUntil(this._destroy$)
    ).subscribe((e: NavigationEnd) => {
      const match = e.url.match(/\/[a-z]*/i);
      this.activeTab = match && this._pageUrlsMap.get(match[0]);
    });
  }

  public setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.unsubscribe();
  }
}

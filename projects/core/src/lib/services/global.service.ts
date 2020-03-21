import { Injectable, OnDestroy } from '@angular/core';
import { Pages } from '../data/data';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService implements OnDestroy {
  public currentPage$: BehaviorSubject<Pages>;
  private _currentPage: Pages;
  private _destroy$ = new Subject();
  private _appLoaded = false;
  public appLoaded$ = new BehaviorSubject<boolean>(false);
  private _pageUrlsMap = new Map<string, Pages>([
    ['/', Pages.HOME],
    ['/about', Pages.ABOUT],
    ['/services', Pages.SERVICES],
    ['/contact', Pages.CONTACT]
  ]);

  constructor(private router: Router) {
    this._currentPage = this._pageUrlsMap.get(window.location.pathname) || Pages.HOME;
    this.currentPage$ = new BehaviorSubject(this._currentPage);
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      takeUntil(this._destroy$)
    ).subscribe((e: NavigationEnd) => {
      if (!this._appLoaded) {
        this._appLoaded = true;
        this.appLoaded$.next(this._appLoaded);
      }
      const page = this._pageUrlsMap.get(e.url);
      if (page !== this._currentPage) {
        this.currentPage$.next(this._pageUrlsMap.get(e.url));
      }
    });
  }

  ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.unsubscribe();
  }
}

import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

enum Filters {
  CLEANING = 'cleaning',
  PAINTING = 'painting',
  LANDSCAPING = 'landscaping',
  COMMERCIAL = 'commercial',
  RESIDENTIAL = 'residential'
}

@Component({
  selector: 'kk-photos-page',
  templateUrl: './photos-page.component.html',
  styleUrls: ['./photos-page.component.scss']
})
export class PhotosPageComponent {
  public filters = [
    Filters.CLEANING,
    Filters.COMMERCIAL,
    Filters.LANDSCAPING,
    Filters.PAINTING,
    Filters.RESIDENTIAL
  ];
  public selectedFilters: Filters[] = [];

  private _params$: Subscription;
  constructor(private _route: ActivatedRoute) {
    this._params$ = this._route.queryParams.subscribe(params => {
      let currentFilters = this.filters;
      if (params && params.hasOwnProperty('filters')) {
        const filters = params.filters
          .replace(', ', ',')
          .split(',')
          .filter((f: Filters) => this.filters.includes(f));
        if (filters.length) {
          currentFilters = filters;
        }
      }
      this.selectFilters(currentFilters);
    });
  }

  ngOnDestroy() {
    this._params$.unsubscribe();
  }

  private selectFilters(filters: Filters[]) {
    filters.forEach(filter => this.selectFilter(filter));
  }

  private selectFilter(filter: Filters) {
    this.selectedFilters = [...this.selectedFilters, filter];
  }

  private deselectFilter(filter: Filters) {
    this.selectedFilters = this.selectedFilters.filter(f => f !== filter);
  }

  public toggleFilter(filter: Filters) {
    if (!this.selectedFilters.includes(filter)) {
      this.selectFilter(filter);
    } else {
      this.deselectFilter(filter);
    }
  }
}

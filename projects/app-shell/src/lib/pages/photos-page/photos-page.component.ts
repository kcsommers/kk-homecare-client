import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PhotosService } from 'projects/core/src/lib/services/photos.service';
import { Filters } from '@kk/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'kk-photos-page',
  templateUrl: './photos-page.component.html',
  styleUrls: ['./photos-page.component.scss']
})
export class PhotosPageComponent implements OnDestroy {
  public filters = [
    Filters.CLEANING,
    Filters.COMMERCIAL,
    Filters.LANDSCAPING,
    Filters.PAINTING,
    Filters.RESIDENTIAL
  ];

  public photoUrls: string[] = [];
  public selectedFilters: Filters[] = [];
  private _params$: Subscription;
  private _photoUrlsCache = new Map<string, string[]>();

  constructor(private _route: ActivatedRoute, private photosService: PhotosService) {
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
    const cached = [];
    const notCached = filters.filter(f => {
      if (this._photoUrlsCache.has(f)) {
        cached.push(f);
        return false;
      }
      return true;
    });
    this.photosService.getImages(notCached).pipe(take(1)).subscribe(
      result => {
        if (result && result.resources) {
          console.log('Res', result.resources)
          this.photoUrls = [...result.resources.map(r => r.url), ...cached.map(f => this._photoUrlsCache.get(f))];
        }
      },
      error => console.error(error)
    );
    this.selectedFilters = filters;
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

  private loadImages(folder: string) {
    /* webpackInclude: /\.json$/ */
    /* webpackExclude: /\.noimport\.json$/ */
    /* webpackChunkName: "my-chunk-name" */
    /* webpackMode: "lazy" */
    /* webpackPrefetch: true */
    /* webpackPreload: true */
  }
}

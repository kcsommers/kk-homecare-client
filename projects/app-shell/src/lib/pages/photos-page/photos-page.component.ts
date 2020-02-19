import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotosService } from 'projects/core/src/lib/services/photos.service';
import { Filters } from '@kk/core';
import { take } from 'rxjs/operators';
import { Location } from '@angular/common';

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

  public selectedFilters: Filters[];
  private _params$: Subscription;
  private _imageCache = new Map<Filters, string[]>();
  public displayedImages = new Map<Filters, string[]>();

  constructor(
    private _route: ActivatedRoute,
    private _photosService: PhotosService,
    private _location: Location,
    private _router: Router
  ) {
    this._params$ = this._route.queryParams.subscribe(params => {
      let currentFilters = this.selectedFilters ? this.selectedFilters : this.filters;
      if (params && params.hasOwnProperty('filters')) {
        const filters = params.filters
          .replace(', ', ',')
          .split(',')
          .filter((f: Filters) => this.filters.includes(f));
        if (filters.length) {
          currentFilters = filters;
        }
      }
      if (!this.selectedFilters) {
        this.selectedFilters = currentFilters;
        this.updateUrl();
      }
      this.getImageUrls(currentFilters);
    });
  }

  ngOnDestroy() {
    this._params$.unsubscribe();
  }

  public getImageUrls(filters: Filters[]) {
    const notCached = filters.filter(f => {
      if (this._imageCache.get(f)) {
        if (!this.displayedImages.get(f)) {
          this.displayedImages.set(f, this._imageCache.get(f));
        }
        return false;
      }
      return true;
    });
    console.log('NOT CACHED:::: ', notCached)
    if (notCached.length) {
      this._photosService.getImages(notCached)
        .pipe(take(1))
        .subscribe(
          result => {
            if (result && result.resources) {
              console.log('RESULT:::: ', result.resources)
              const imgsSorted = {};
              result.resources.forEach(img => {
                const filter = this.parseFolder(img.folder);
                if (imgsSorted[filter]) {
                  imgsSorted[filter].push(img.url);
                } else {
                  imgsSorted[filter] = [img.url];
                }
              });
              for (const filter in imgsSorted) {
                if (this.filters.includes(filter as Filters) && imgsSorted[filter]) {
                  this.displayedImages.set(filter as Filters, imgsSorted[filter]);
                  this._imageCache.set(filter as Filters, imgsSorted[filter]);
                }
              }
            }
          },
          err => console.error(err)
        );
    }
  }

  public toggleFilter(filter: Filters) {
    if (!this.selectedFilters.includes(filter)) {
      this.selectFilter(filter);
    } else {
      this.deselectFilter(filter);
    }
    this.updateUrl();
  }

  private loadImages(folder: string) {
    /* webpackInclude: /\.json$/ */
    /* webpackExclude: /\.noimport\.json$/ */
    /* webpackChunkName: "my-chunk-name" */
    /* webpackMode: "lazy" */
    /* webpackPrefetch: true */
    /* webpackPreload: true */
  }

  private selectFilter(filter: Filters): void {
    this.selectedFilters = [...this.selectedFilters, filter];
  }

  private deselectFilter(filter: Filters): void {
    this.selectedFilters = this.selectedFilters.filter(f => f !== filter);
    this.displayedImages.delete(filter);
  }

  private updateUrl() {
    console.log('Update')
    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: { filters: this.selectedFilters.join(',') },
      queryParamsHandling: 'merge'
    });
  }

  private parseFolder(folder: string): string {
    // 2K Homecare/painting
    const segments = folder.split('/');
    return segments[segments.length - 1];
  }

  public trackByFn(index: number): number {
    return index;
  }
}

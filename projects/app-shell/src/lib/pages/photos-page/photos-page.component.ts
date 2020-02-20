import { Component, OnDestroy, HostListener, OnInit, Renderer2 } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { PhotosService } from 'projects/core/src/lib/services/photos.service';
import { Filters } from '@kk/core';
import { take, takeUntil } from 'rxjs/operators';
import { Location } from '@angular/common';

interface PhotosPageParams extends Params {
  filters: string; // cleaning,painting,landscaping
}

interface ImageMap {
  [filters: string]: string[]
}

interface ImageData {
  src: string;
  filter: Filters;
  loaded: boolean;
}

@Component({
  selector: 'kk-photos-page',
  templateUrl: './photos-page.component.html',
  styleUrls: ['./photos-page.component.scss']
})
export class PhotosPageComponent implements OnInit, OnDestroy {
  public filters = [
    Filters.CLEANING,
    Filters.COMMERCIAL,
    Filters.LANDSCAPING,
    Filters.PAINTING,
    Filters.RESIDENTIAL
  ];

  private _destroy = new Subject();

  private _initialVisit = true;

  private _imageCache = new Map<Filters, string[]>();

  private _currentImages: ImageData[] = [];

  public selectedFilters: Filters[];

  private _currentIndex = 0;

  private _observer: IntersectionObserver;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _photosService: PhotosService,
    private _renderer: Renderer2
  ) {
    this._route.queryParams
      .pipe(takeUntil(this._destroy))
      .subscribe(
        (params: PhotosPageParams) => {
          if (this._initialVisit) {
            this._initialVisit = false;
            this.selectedFilters = (params && params.filters) ? params.filters
              .replace(' ', '')
              .split(',')
              .filter((f: Filters) => this.filters.includes(f)) as Filters[]
              : [...this.filters];
            this.updateUrl();
            this.fetchImages(this.selectedFilters);
          }
        }
      );
  }

  ngOnInit(): void {
    this._observer = new IntersectionObserver(
      () => {
        this._currentIndex += 4;
        this.appendImages();
      },
      {
        rootMargin: '0px',
        threshold: 0.25
      }
    );
    this._observer.observe(document.querySelector('footer'));
  }

  ngOnDestroy(): void {
    this._destroy.next(false);
    this._destroy.complete();
    this._observer.disconnect();
  }

  public toggleFilter(filter: Filters): void {
    if (this.selectedFilters.includes(filter)) {
      // remove filter
      this.selectedFilters.splice(this.selectedFilters.indexOf(filter), 1);
    } else {
      // add filter
      this.selectedFilters.push(filter);
      // fetch more images if this filter hasn't been used yet
      if (!this._imageCache.has(filter)) {
        this.fetchImages([filter])
      } else {
        this.appendImages();
      }
    }
    this.updateUrl();
  }

  private fetchImages(filters: Filters[]): void {
    this._photosService.getImages(filters)
      .pipe(take(1))
      .subscribe(
        (imgMap: ImageMap) => {
          for (const filter in imgMap) {
            // set each new filter in the image cache
            if (filter && imgMap[filter]) {
              this._imageCache.set(filter as Filters, imgMap[filter]);
              imgMap[filter].forEach(url => {
                this._currentImages.push({
                  src: url,
                  filter: filter as Filters,
                  loaded: false
                });
              });
              this.appendImages();
            }
          }
        },
        err => console.error(err)
      );
  }

  private hideImages(filter: Filters): void {
    const toHide = document.querySelectorAll(`.kk-photo-${filter}`);
    toHide.forEach(el => el.classList.add('kk-photo-hidden'));
    this._currentIndex += toHide.length;
  }

  private showImages(filter: Filters): void {
    const toShow = document.querySelectorAll(`.kk-photo-${filter}`);
    toShow.forEach(el => el.classList.remove('kk-photo-hidden'));
    this._currentIndex -= toShow.length;
  }

  private appendImages(): void {
    console.log('IMage data', this._currentIndex, this._currentImages)
    for (let i = 0; i < this._currentIndex; i++) {
      const imageData = this._currentImages[i];
      if (imageData && !imageData.loaded) {
        imageData.loaded = true;
        const imgEl: HTMLImageElement = document.createElement('img');
        imgEl.src = imageData.src;
        imgEl.alt = `${imageData.filter} photo`;
        imgEl.style.maxWidth = '100%';
        imgEl.style.width = 'auto';
        imgEl.style.maxHeight = '100%';
        const imgWrap: HTMLDivElement = document.createElement('div');
        imgWrap.classList.add(`kk-photo-${imageData.filter}`);
        imgWrap.classList.add('kk-photo-wrap');
        imgWrap.style.height = '100%';
        imgWrap.style.background = '#fff';
        imgWrap.style.display = 'flex';
        imgWrap.style.alignItems = 'center';
        imgWrap.style.justifyContent = 'center';
        imgWrap.appendChild(imgEl);
        document.querySelector('.photos-section-wrap').appendChild(imgWrap);
      }
    }
  }

  private updateUrl(): void {
    this._router.navigate([], {
      queryParams: {
        filters: this.selectedFilters.join(',')
      },
      queryParamsHandling: 'merge'
    });
  }
}

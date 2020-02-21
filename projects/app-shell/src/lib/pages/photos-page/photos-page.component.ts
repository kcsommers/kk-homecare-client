import { Component, OnDestroy, HostListener, OnInit, Renderer2, ComponentFactoryResolver, ViewChild, ViewContainerRef, ComponentRef, ViewChildren, QueryList } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { PhotosService } from 'projects/core/src/lib/services/photos.service';
import { Filters } from '@kk/core';
import { take, takeUntil } from 'rxjs/operators';
import { Location } from '@angular/common';
import { ImageComponent } from 'projects/components/src/lib/image/image.component';

interface PhotosPageParams extends Params {
  filters: string; // cleaning,painting,landscaping
}

interface ImageModel {
  url: string;
  tag: Filters;
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

  private _imageCache = new Map<Filters, ComponentRef<ImageComponent>[]>();

  public selectedFilters: Filters[] = [];

  private _observer: IntersectionObserver;

  @ViewChild('PhotosContainer', { static: false, read: ViewContainerRef })
  private photosContainer: ViewContainerRef;

  @ViewChildren(ImageComponent)
  private imageComponents: QueryList<ImageComponent>;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _photosService: PhotosService,
    private _renderer: Renderer2,
    private cfr: ComponentFactoryResolver
  ) {
    this._route.queryParams
      .pipe(takeUntil(this._destroy))
      .subscribe(
        (params: PhotosPageParams) => {
          if (this._initialVisit) {
            this._initialVisit = false;
            const filtersCopy = [...this.selectedFilters];
            this.selectedFilters = (params && params.filters) ? params.filters
              .replace(' ', '')
              .split(',')
              .filter((f: Filters) => this.filters.includes(f)) as Filters[]
              : [...this.filters];
            const newFilters = this.selectedFilters.filter(f => !filtersCopy.includes(f));
            this.updateUrl();
            this.fetchImages(newFilters);
          }
        }
      );
  }

  ngOnInit(): void {
    this._observer = new IntersectionObserver(
      () => {

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
    }
    this.updateUrl();
  }

  private createImageComponent(img: ImageModel): ComponentRef<ImageComponent> {
    const factory = this.cfr.resolveComponentFactory(ImageComponent);
    const imgComp = this.photosContainer.createComponent(factory);
    imgComp.instance.alt = `${img.tag} photo`;
    imgComp.instance.src = img.url;
    return imgComp;
  }

  private fetchImages(filters: Filters[]): void {
    if (filters && filters.length) {
      const cachedImages: ComponentRef<ImageComponent>[] = [];
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < filters.length; i++) {
        if (this._imageCache.has(filters[i])) {
          const cached = this._imageCache.get(filters[i]);
          // tslint:disable-next-line: prefer-for-of
          for (let j = 0; j < cached.length; j++) {
            cachedImages.push(cached[j]);
            if (cachedImages.length === 8) {
              break;
            }
          }
        }
      }
      this.attachImages(cachedImages);
      if (cachedImages.length < 8) {
        this._photosService.getImages(filters) // send toFetch
          .pipe(take(1))
          .subscribe(
            (images: ImageModel[]) => {
              // set new filters in photos cache
              images.forEach(img => {
                const imgComponent = this.createImageComponent(img);
                if (this._imageCache.has(img.tag)) {
                  this._imageCache.get(img.tag).push(imgComponent);
                } else {
                  this._imageCache.set(img.tag, [imgComponent]);
                }
              });
            },
            err => console.error(err)
          );
      }
    }
  }

  private attachImages(images: ComponentRef<ImageComponent>[]): void {
    images.forEach(imgComp => {
      this.photosContainer.insert(imgComp.hostView);
    });
  }

  private detachImages() { }


  // private appendImages(): void {
  //   console.log('IMage data', this._currentIndex, this._currentImages)
  //   for (let i = 0; i < this._currentIndex; i++) {
  //     const imageData = this._currentImages[i];
  //     if (imageData && !imageData.loaded) {
  //       imageData.loaded = true;
  //       const imgEl: HTMLImageElement = document.createElement('img');
  //       imgEl.src = imageData.src;
  //       imgEl.alt = `${imageData.filter} photo`;
  //       imgEl.style.maxWidth = '100%';
  //       imgEl.style.width = 'auto';
  //       imgEl.style.maxHeight = '100%';
  //       const imgWrap: HTMLDivElement = document.createElement('div');
  //       imgWrap.classList.add(`kk-photo-${imageData.filter}`);
  //       imgWrap.classList.add('kk-photo-wrap');
  //       imgWrap.style.height = '100%';
  //       imgWrap.style.background = '#fff';
  //       imgWrap.style.display = 'flex';
  //       imgWrap.style.alignItems = 'center';
  //       imgWrap.style.justifyContent = 'center';
  //       imgWrap.appendChild(imgEl);
  //       document.querySelector('.photos-section-wrap').appendChild(imgWrap);
  //     }
  //   }
  // }

  private updateUrl(): void {
    this._router.navigate([], {
      queryParams: {
        filters: this.selectedFilters.join(',')
      },
      queryParamsHandling: 'merge'
    });
  }
}

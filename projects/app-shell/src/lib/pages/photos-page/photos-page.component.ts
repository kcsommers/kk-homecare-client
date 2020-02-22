import { Component, OnDestroy, HostListener, OnInit, Renderer2, ComponentFactoryResolver, ViewChild, ViewContainerRef, ComponentRef, ViewChildren, QueryList, ViewRef } from '@angular/core';
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

  public selectedFilters: Filters[] = [];

  private _destroy = new Subject();

  private _initialVisit = true;

  private _displayedImages = new Map<Filters, ViewRef[]>();

  private _filteredImages = new Map<Filters, ViewRef[]>();

  private _observer: IntersectionObserver;

  private _offset = 0;

  private _totalPhotos: number;

  @ViewChild('PhotosContainer', { static: false, read: ViewContainerRef })
  private photosContainer: ViewContainerRef;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _photosService: PhotosService,
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
            this.updateUrl();
          }
        }
      );
  }

  ngOnInit(): void {
    this.observe();
  }

  ngOnDestroy(): void {
    this._destroy.next(false);
    this._destroy.complete();
    if (this._observer) {
      this._observer.disconnect();
    }
  }

  public toggleFilter(filter: Filters): void {
    if (this.selectedFilters.includes(filter)) {
      // remove filter
      this.selectedFilters.splice(this.selectedFilters.indexOf(filter), 1);
      this.detachImages(filter);
    } else {
      // add filter
      this.selectedFilters.push(filter);
      // reset total images because we'll be getting a new result from server
      this._totalPhotos = undefined;
      // reconnect observer because we may need to fetch more
      if (!this._observer) {
        this.observe();
      }
      this.fetchImages([filter]);
    }
    this.updateUrl();
  }

  private createImageComponent(img: ImageModel): ComponentRef<ImageComponent> {
    const factory = this.cfr.resolveComponentFactory(ImageComponent);
    const imgComp = this.photosContainer.createComponent(factory);
    imgComp.instance.alt = `${img.tag} photo`;
    imgComp.instance.src = img.url;
    imgComp.instance.tag = img.tag;
    return imgComp;
  }

  private fetchImages(filters: Filters[]): void {
    if (filters && filters.length) {
      const filteredImages: ViewRef[] = [];
      for (let i = 0; i < filters.length; i++) {
        // Get any images that have already been created and detached
        if (this._filteredImages.has(filters[i])) {
          filteredImages.splice(filteredImages.length, 0, ...this._filteredImages.get(filters[i]))
        }
        this._filteredImages.set(filters[i], []);
      }
      // attach any cached images
      console.log('ATTACHING:::: ', filteredImages)
      this.attachImages(filteredImages);

      // if less than 8 photos were reattached, fetch as many needed to equal 8
      if (filteredImages.length < 8) {
        this._photosService.getImages(
          filters,
          8 - filteredImages.length,
          this._offset,
          this._totalPhotos === undefined
        )
          .pipe(take(1))
          .subscribe(
            (result: { images: ImageModel[], total: number }) => {
              // store total amount of photos with selected filters
              this._totalPhotos = result.total;
              // increase the offset of fetched photos
              this._offset += result.images.length;
              result.images.forEach(img => {
                // create new image component for each new image
                const imgComponent = this.createImageComponent(img);
                // store the host view in display image cache
                if (this._displayedImages.has(img.tag)) {
                  this._displayedImages.get(img.tag).push(imgComponent.hostView);
                } else {
                  this._displayedImages.set(img.tag, [imgComponent.hostView]);
                }
                console.log('SET DIDSPLAY:::: ', this._displayedImages.get(img.tag))
              });
            },
            err => console.error(err)
          );
      }
    }
  }

  private observe(): void {
    // intersection observer fetches images whenever the footer enters the viewport
    this._observer = new IntersectionObserver(
      () => {
        // if (this._totalPhotos && this._offset >= this._totalPhotos) {
        //   this.disconnectObserver();
        // } else {
        //   this.fetchImages(this.selectedFilters);
        // }
        this.fetchImages(this.selectedFilters)
      },
      {
        rootMargin: '0px',
        threshold: 0.25
      }
    );
    this._observer.observe(document.querySelector('footer'));
  }

  private disconnectObserver(): void {
    this._observer.disconnect();
    this._observer = undefined;
  }

  private attachImages(imageViews: ViewRef[]): void {
    imageViews.forEach(v => this.photosContainer.insert(v));
  }

  private detachImages(filter: Filters): void {
    // get images to remove from displayed cache using the deselected filter
    const toRemove = this._displayedImages.get(filter);
    console.log('DETACH:::: ', toRemove)
    toRemove.forEach(view => {
      // detach image from view container
      const detachedView = this.photosContainer.detach(this.photosContainer.indexOf(view));
      if (this._filteredImages.has(filter)) {
        this._filteredImages.get(filter).push(detachedView);
      } else {
        this._filteredImages.set(filter, [detachedView]);
      }
    });
    // empty displayed images cache
    this._displayedImages.set(filter, []);
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

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

  private _displayedImages = new Map<Filters, ViewRef[]>([
    [Filters.CLEANING, []],
    [Filters.COMMERCIAL, []],
    [Filters.LANDSCAPING, []],
    [Filters.PAINTING, []],
    [Filters.RESIDENTIAL, []]
  ]);

  private _filteredCache = new Map<Filters, ViewRef[]>([
    [Filters.CLEANING, []],
    [Filters.COMMERCIAL, []],
    [Filters.LANDSCAPING, []],
    [Filters.PAINTING, []],
    [Filters.RESIDENTIAL, []]
  ]);

  private _observer: IntersectionObserver;

  private _totalPhotos: number;

  @ViewChild('PhotosContainer', { static: false, read: ViewContainerRef })
  private photosContainer: ViewContainerRef;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _photosService: PhotosService,
    private _cfr: ComponentFactoryResolver
  ) {
    this._route.queryParams
      .pipe(take(1))
      .subscribe(
        (params: PhotosPageParams) => {
          // On first page load set the selected filters based on params if any
          if (params && params.filters) {
            this.selectedFilters = params.filters
              .replace(' ', '')
              .split(',')
              .filter((f: Filters) => this.filters.includes(f)) as Filters[];
          } else {
            // if no params, update url with all filters
            this.selectedFilters = [...this.filters];
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

  private observe(): void {
    // intersection observer fetches images whenever the footer enters the viewport
    this._observer = new IntersectionObserver(
      this.load.bind(this),
      {
        rootMargin: '0px',
        threshold: 1
      }
    );
    this._observer.observe(document.querySelector('footer'));
  }

  private load() {
    const totalReattached = this.attachImages(this.selectedFilters);
    console.log('Loading: ', totalReattached)
    if (totalReattached < 4) {
      this.fetchImages(4 - totalReattached);
    }
  }

  private attachImages(filters: Filters[]): number {
    let total = 0;
    filters.forEach(filter => {
      this._filteredCache.get(filter).forEach(image => {
        this.photosContainer.insert(image);
        total += 1;
      });
    });
    return total;
  }

  private fetchImages(count: number): void {
    this._photosService.getImages(
      this.selectedFilters,
      count,
      this.selectedFilters.reduce(this.countImagesByFilter.bind(this), {})
    )
      .pipe(take(1))
      .subscribe(
        (result: { images: ImageModel[], total: number }) => {
          // increase the offset of fetched photos
          result.images.forEach(img => {
            // create new image component for each new image
            const imgComponent = this.createImageComponent(img);
            // store the host view in displayed image cache
            this._displayedImages.get(img.tag).push(imgComponent.hostView);
          });
        },
        err => console.error(err)
      );
  }

  // called by reduce method on selectedfilters
  private countImagesByFilter(
    counts: { [filters: string]: number },
    filter: Filters
  ): { [filters: string]: number } {
    const displayedCount = this._displayedImages.get(filter).length;
    const filteredCount = this._filteredCache.get(filter).length;
    counts[filter] = displayedCount + filteredCount;
    return counts;
  }

  private createImageComponent(img: ImageModel): ComponentRef<ImageComponent> {
    const factory = this._cfr.resolveComponentFactory(ImageComponent);
    const imgComp = this.photosContainer.createComponent(factory);
    imgComp.instance.alt = `${img.tag} photo`;
    imgComp.instance.src = img.url;
    imgComp.instance.tag = img.tag;
    return imgComp;
  }

  public toggleFilter(filter: Filters): void {
    if (this.selectedFilters.includes(filter)) {
      // remove filter
      this.selectedFilters.splice(this.selectedFilters.indexOf(filter), 1);
      this.detachImages(filter);
      if (this.photosContainer.length < 4) {
        this.fetchImages(4 - this.photosContainer.length);
      }
    } else {
      // add filter
      this.selectedFilters.push(filter);
      // reset total images because we'll be getting a new result from server
      this._totalPhotos = undefined;
      this.attachImages([filter]);
    }
    this.updateUrl();
  }

  private detachImages(filter: Filters): void {
    // get images to remove from displayed cache using the deselected filter
    const toRemove = this._displayedImages.get(filter);
    toRemove.forEach(view => {
      // detach image from view container
      const detachedView = this.photosContainer.detach(this.photosContainer.indexOf(view));
      this._filteredCache.get(filter).push(detachedView);
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

  private disconnectObserver(): void {
    this._observer.disconnect();
    this._observer = undefined;
  }
}

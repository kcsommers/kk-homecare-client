import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewContainerRef, Renderer2 } from '@angular/core';
import { BeforeAfterModel, BeforeAfterResponse, ImageModel, PhotosResponse } from '@kk/core';
import { ImageComponent } from 'projects/components/src/lib/image/image.component';
import { LightboxService } from 'projects/core/src/lib/services/lightbox.service';
import { PhotosService } from 'projects/core/src/lib/services/photos.service';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'kk-photos-page',
  templateUrl: './photos-page.component.html',
  styleUrls: ['./photos-page.component.scss']
})
export class PhotosPageComponent implements OnInit, AfterViewInit, OnDestroy {
  private _destroy = new Subject();

  private _intersectionObserver: IntersectionObserver;

  private _totalPhotos: number;

  private _beforeAfterOffset = 0;

  private _prevScrollY = window.scrollY - 1;

  private _imageCache: ImageModel[] = [];

  private _beforeAfterCache: BeforeAfterModel[] = [];

  private _showBeforeAfter = false;

  public set showBeforeAfter(show: boolean) {
    this._showBeforeAfter = show;
    this.load();
  }

  public get showBeforeAfter(): boolean {
    return this._showBeforeAfter;
  }

  @ViewChild('PhotosContainer', { static: false, read: ViewContainerRef })
  private _photosContainer: ViewContainerRef;

  @ViewChild('BeforeAfterContainer', { static: false, read: ViewContainerRef })
  private _beforeAfterContainer: ViewContainerRef;

  constructor(
    private _photosService: PhotosService,
    private _lighboxService: LightboxService,
    private _renderer: Renderer2
  ) {
  }

  ngOnInit(): void {
    if ('IntersectionObserver' in window) {
      this.observeFooter();
    } else {
      this.load(true);
    }
  }

  ngAfterViewInit(): void {
    this._photosService.photosContainer = this._photosContainer;
  }

  ngOnDestroy(): void {
    this._destroy.next(false);
    this._destroy.complete();
    if (this._intersectionObserver) {
      this._intersectionObserver.disconnect();
    }
  }

  private load(fetchAll = false) {
    if ('IntersectionObserver' in window && !this._intersectionObserver) {
      this.observeFooter();
    }
    const cache = this.showBeforeAfter ? this._beforeAfterCache : this._imageCache;
    setTimeout(() => {
      if (this.footerVisible() || !cache.length) {
        if (this.showBeforeAfter) {
          this.getBeforeAfterPhotos();
        } else {
          this.getRegularPhotos(fetchAll);
        }
      }
    });
  }

  private getRegularPhotos(fetchAll: boolean) {
    this._photosService.getRegularPhotos(4, !this._totalPhotos, fetchAll)
      .pipe(take(1))
      .subscribe(
        (result: PhotosResponse) => {
          if (result.error) {
            console.error(result.error);
          } else {
            if (result.total) {
              this._totalPhotos = result.total;
            }
            if (result.images && result.images.length) {
              this._imageCache.push(...result.images);
              // get id of last image to use for pagination on next call
              this._photosService.createImageComponents(result.images, this.openLightbox.bind(this));

              // keep loading if footer is still in viewport
              this.load();
            } else {
              // if no images are returned all have been retrieved, so stop observing
              this._intersectionObserver.disconnect();
              this._intersectionObserver = undefined;
            }
          }
        },
        err => console.error(err)
      );
  }

  private createBeforeAfterImages(beforeAfter: BeforeAfterModel) {
    const factory = this._photosService.cfr.resolveComponentFactory(ImageComponent);
    const beforeImage = this._beforeAfterContainer.createComponent(factory);
    const afterImage = this._beforeAfterContainer.createComponent(factory);

    beforeImage.instance.image = { _id: beforeAfter._id, url: beforeAfter.beforeUrl };
    afterImage.instance.image = { _id: beforeAfter._id, url: beforeAfter.afterUrl };
    afterImage.instance.isAfterImage = true;
    afterImage.instance.imageSelected
      .pipe(take(1))
      .subscribe(afterImage.instance.revealAfterImage.bind(afterImage.instance));
    beforeImage.instance.imageSelected
      .pipe(take(1))
      .subscribe(afterImage.instance.revealAfterImage.bind(afterImage.instance));
  }

  private getBeforeAfterPhotos(fetchAll = false) {
    this._photosService.getBeforeAfterPhotos(this._beforeAfterOffset, fetchAll)
      .pipe(take(1))
      .subscribe(
        (result: BeforeAfterResponse) => {
          if (result.error) {
            console.error(result.error);
          } else {
            if (result.images && result.images.length) {
              this._beforeAfterOffset += result.images.length;
              this._beforeAfterCache.push(...result.images);
              result.images.forEach(img => this.createBeforeAfterImages(img));
              // keep loading if footer is still in viewport
              this.load();
            } else {
              // if no images are returned all have been retrieved, so stop observing
              this._intersectionObserver.disconnect();
              this._intersectionObserver = undefined;
            }
          }
        },
        err => console.error(err)
      );
  }

  private openLightbox(img: ImageModel): void {
    this._lighboxService.open(this._imageCache, this._imageCache.indexOf(img), this._totalPhotos);
  }

  private footerVisible(): boolean {
    const footer = document.querySelector('footer');
    return footer.getBoundingClientRect().top < window.innerHeight;
  }

  private observeFooter() {
    this._intersectionObserver = new IntersectionObserver(
      () => {
        // Only load more if scrolling down
        // if (window.scrollY > this._prevScrollY) {
        this._prevScrollY = window.scrollY;
        this.load();
        // }
      }
    );
    this._intersectionObserver.observe(document.querySelector('footer'));
  }
}

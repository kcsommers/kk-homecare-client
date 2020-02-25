import { Component, OnDestroy, HostListener, OnInit, Renderer2, ComponentFactoryResolver, ViewChild, ViewContainerRef, ComponentRef, ViewChildren, QueryList, ViewRef, AfterViewInit } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { PhotosService } from 'projects/core/src/lib/services/photos.service';
import { Filters, ImageModel } from '@kk/core';
import { take, takeUntil } from 'rxjs/operators';
import { Location } from '@angular/common';
import { ImageComponent } from 'projects/components/src/lib/image/image.component';
import { LightboxService } from 'projects/core/src/lib/services/lightbox.service';

@Component({
  selector: 'kk-photos-page',
  templateUrl: './photos-page.component.html',
  styleUrls: ['./photos-page.component.scss']
})
export class PhotosPageComponent implements OnInit, AfterViewInit, OnDestroy {
  private _destroy = new Subject();

  private _intersectionObserver: IntersectionObserver;

  private _totalPhotos: number;

  private _offset = 0;

  private _prevScrollY = window.scrollY - 1;

  private _imageCache: ImageModel[] = [];

  @ViewChild('PhotosContainer', { static: false, read: ViewContainerRef })
  private _photosContainer: ViewContainerRef;

  constructor(
    private _photosService: PhotosService,
    private _lighboxService: LightboxService
  ) {
  }

  ngOnInit(): void {
    if ('IntersectionObserver' in window) {
      this._intersectionObserver = new IntersectionObserver(
        () => {
          // Only load more if scrolling down
          if (window.scrollY > this._prevScrollY) {
            this._prevScrollY = window.scrollY;
            this.load();
          }
        }
      );
      this._intersectionObserver.observe(document.querySelector('footer'));
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
    this._photosService.getImages(4, !this._totalPhotos, fetchAll)
      .subscribe(
        (result: { images: ImageModel[], error: Error, total: number }) => {
          if (result.error) {
            console.error(result.error);
          } else {
            if (result.total) {
              this._totalPhotos = result.total;
            }
            if (result.images && result.images.length) {
              this._imageCache.splice(this._imageCache.length, 0, ...result.images);
              // get id of last image to use for pagination on next call
              this._photosService.createImageComponents(result.images, this.openLightbox.bind(this));

              // keep loading if footer is still in viewport
              const footer = document.querySelector('footer');
              if (footer.getBoundingClientRect().top < window.innerHeight) {
                this.load();
              }
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
    this._lighboxService.open(this._imageCache, this._imageCache.indexOf(img), this._totalPhotos)
  }
}

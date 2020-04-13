import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewContainerRef, ViewRef, TemplateRef } from '@angular/core';
import { BeforeAfterModel, BeforeAfterResponse, ImageModel, PhotosResponse } from '@kk/core';
import { ImageComponent } from 'projects/components/src/lib/image/image.component';
import { LightboxService } from 'projects/core/src/lib/services/lightbox.service';
import { PhotosService } from 'projects/core/src/lib/services/photos.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { BasePage } from '../base-page';

@Component({
  selector: 'kk-photos-page',
  templateUrl: './photos-page.component.html',
  styleUrls: ['./photos-page.component.scss']
})
export class PhotosPageComponent extends BasePage implements OnInit, AfterViewInit, OnDestroy {

  private _destroy = new Subject();

  private _intersectionObserver: IntersectionObserver;

  private _totalPhotos: number;

  private _beforeAfterCache = new Set<ViewRef>();

  private _photosCache = new Set<ViewRef>();

  private _imageModels: ImageModel[] = [];

  public showBeforeAfter = false;

  @ViewChild('PhotosContainer', { static: false, read: ViewContainerRef })
  private _photosContainer: ViewContainerRef;

  @ViewChild('ErrorTemplate', { static: false, read: TemplateRef })
  private _errorTemplate: TemplateRef<any>;

  constructor(
    private _photosService: PhotosService,
    private _lighboxService: LightboxService
  ) {
    super();
  }

  ngOnInit(): void {
    if ('IntersectionObserver' in window) {
      this.observe();
    } else {
      this.loadImages(true);
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

  public beforeAfterToggleChange(isToggled: boolean): void {
    this.showBeforeAfter = isToggled;
    this._totalPhotos = undefined;
    if (isToggled) {
      while (this._photosContainer && this._photosContainer.length) {
        this._photosCache.add(this._photosContainer.detach(0));
      }
      this.displayBeforeAfterPhotos();
    } else {
      while (this._photosContainer && this._photosContainer.length) {
        this._beforeAfterCache.add(this._photosContainer.detach(0));
      }
      this.displayRegularPhotos();
    }
  }

  private displayBeforeAfterPhotos(): void {
    this._beforeAfterCache.forEach(view => this._photosContainer.insert(view));
  }

  private displayRegularPhotos(): void {
    this._photosCache.forEach(view => this._photosContainer.insert(view));
  }

  private createBeforeAfterImages(beforeAfterModels: BeforeAfterModel[]) {
    const factory = this._photosService.cfr.resolveComponentFactory(ImageComponent);
    beforeAfterModels.forEach(beforeAfter => {
      const beforeImage = this._photosContainer.createComponent(factory);
      const afterImage = this._photosContainer.createComponent(factory);

      beforeImage.instance.image = { _id: beforeAfter._id, url: beforeAfter.beforeUrl };
      afterImage.instance.image = { _id: beforeAfter._id, url: beforeAfter.afterUrl };
      afterImage.instance.isAfterImage = true;
      afterImage.instance.imageSelected
        .pipe(take(1))
        .subscribe(afterImage.instance.revealAfterImage.bind(afterImage.instance));
      beforeImage.instance.imageSelected
        .pipe(take(1))
        .subscribe(afterImage.instance.revealAfterImage.bind(afterImage.instance));
    });
  }

  private openLightbox(img: ImageModel): void {
    this._lighboxService.open(this._imageModels, this._imageModels.indexOf(img), this._totalPhotos);
  }

  private loadImages(fetchAll = false): void {
    console.log('Loading Images', this._photosContainer.length / 2)
    this._photosService.getPhotos(
      isNaN(this._totalPhotos),
      fetchAll,
      this.showBeforeAfter,
      this._photosContainer.length / 2,
      4
    )
      .pipe(take(1))
      .subscribe(
        (res: PhotosResponse) => {
          if (res.error) {
            console.error(res.error);
            return;
          }
          if (!isNaN(res.total)) {
            this._totalPhotos = res.total;
          }
          if (res.images && res.images.length) {
            if (this.showBeforeAfter) {
              this.createBeforeAfterImages(<BeforeAfterModel[]>res.images);
            } else {
              this._imageModels.push(...<ImageModel[]>res.images);
              this._photosService.createImageComponents(<ImageModel[]>res.images, this.openLightbox.bind(this));
            }
            this.checkFooter();
            return;
          }
          if (this._totalPhotos === 0) {
            this.addError();
          }
        },
        err => console.error(err)
      )
  }

  private addError(): void {
    this._photosContainer.clear();
    this._photosContainer.createEmbeddedView(this._errorTemplate);
  }

  private checkFooter(): void {
    setTimeout(() => {
      const footer = document.querySelector('footer');
      if (footer.getBoundingClientRect().top - 100 < window.innerHeight) {
        this.loadImages();
      }
    });
  }

  private observe() {
    this._intersectionObserver = new IntersectionObserver(
      this.loadImages.bind(this, false),
      {
        rootMargin: '100px',
        threshold: 0.1
      }
    );
    this._intersectionObserver.observe(document.querySelector('footer'));
  }
}

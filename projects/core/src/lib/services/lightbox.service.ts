import { Injectable } from '@angular/core';
import { ImageModel } from '../data';
import { BehaviorSubject } from 'rxjs';
import { PhotosService } from './photos.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LightboxService {
  private _total: number;
  private _images: ImageModel[];
  private _currentIndex = 0;

  public open$ = new BehaviorSubject(false);
  public currentImage$ = new BehaviorSubject<ImageModel>(null);


  constructor(private photosService: PhotosService) { }

  public open(images: ImageModel[], currentIndex: number, total: number): void {
    this._currentIndex = currentIndex;
    this.setImages(images, total);
    document.querySelector('html').style.overflowY = 'hidden';
    this.open$.next(true);
  }

  public close(): void {
    document.querySelector('html').style.overflowY = 'initial';
    this.open$.next(false);
  }

  public next() {
    this._currentIndex = this._currentIndex === this._total - 1 ? 0 : this._currentIndex + 1;
    this.updateActiveImage();
  }

  public prev() {
    this._currentIndex = this._currentIndex === 0 ? this._total - 1 : this._currentIndex - 1;
    this.updateActiveImage();
  }

  private setImages(images: ImageModel[], total: number) {
    this._total = total;
    this._images = images;
    this.updateActiveImage();
  }

  private updateActiveImage() {
    if (this._images[this._currentIndex]) {
      console.log('CURRENT INDEX', this._currentIndex);
      this.currentImage$.next(this._images[this._currentIndex]);
    } else {
      this.photosService.getRegularPhotos(1, false, false)
        .pipe(take(1))
        .subscribe(
          (result: { images: ImageModel[], error: Error, total: number }) => {
            if (result.error) {
              console.error(result.error);
            } else {
              if (result.images && result.images.length) {
                this._images.push(result.images[0]);
                this.photosService.createImageComponents(result.images);
                this.currentImage$.next(result.images[0]);
              }
            }
          },
          err => console.error(err)
        )
    }
  }
}

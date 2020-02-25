import { Component, Input, OnInit, HostBinding, HostListener, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ImageModel } from '@kk/core';

@Component({
  selector: 'kk-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  private _image: ImageModel;

  @Output()
  public imageSelected = new EventEmitter<ImageModel>();

  @HostBinding('class.slide-in')
  private slideIn = true;

  @HostListener('click', ['$event'])
  private onClick(e: MouseEvent) {
    e.stopPropagation();
    this.imageSelected.emit(this._image);
  }

  @Input()
  public set image(img: ImageModel) {
    this.loaded$.next(false);
    this._image = img;
  };

  public get image(): ImageModel {
    return this._image;
  }

  public loaded$ = new BehaviorSubject(false);

  ngOnInit() {
  }

  public onLoad(): void {
    this.loaded$.next(true);
  }
}

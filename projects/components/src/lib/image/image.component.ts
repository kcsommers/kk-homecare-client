import { Component, Input, OnInit, HostBinding, HostListener, Output, EventEmitter, ElementRef, Renderer2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ImageModel } from '@kk/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'kk-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
  animations: [
    trigger('fadeIn', [
      state('false', style({ opacity: 0 })),
      state('true', style({ opacity: 1 })),
      transition('false => true', animate('300ms ease'))
    ])
  ]
})
export class ImageComponent {
  private _image: ImageModel;

  public loaded$ = new BehaviorSubject(false);

  @Input()
  public placeholderBackground = true;

  @Input()
  public growOnHover = false;

  @Input()
  public isAfterImage = false;

  @Output()
  public imageSelected = new EventEmitter<ImageModel>();

  @HostBinding('class.slide-in')
  public slideIn = true;

  @HostBinding('class.blurred-after-image')
  public get afterImage(): boolean {
    return this.isAfterImage;
  }

  @HostBinding('class.hover-grow')
  public get shouldGrow(): boolean {
    return this.growOnHover;
  }

  @HostListener('click', ['$event'])
  public onClick(e: MouseEvent) {
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

  constructor(private _el: ElementRef, private _renderer: Renderer2) {
  }

  public onLoad(): void {
    this.loaded$.next(true);
  }

  public revealAfterImage() {
    this._renderer.removeClass(this._el.nativeElement, 'blurred-after-image');
  }
}

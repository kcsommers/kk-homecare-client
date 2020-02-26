import { Component, Input, OnInit, HostBinding, HostListener, Output, EventEmitter } from '@angular/core';
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
export class ImageComponent implements OnInit {
  private _image: ImageModel;

  @Input()
  public placeholderBackground = true;

  @Input()
  public growOnHover = false;

  @Output()
  public imageSelected = new EventEmitter<ImageModel>();

  @HostBinding('class.slide-in')
  private slideIn = true;

  @HostBinding('class.hover-grow')
  public get shouldGrow(): boolean {
    return this.growOnHover;
  }

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

import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'kk-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  @Input()
  public src: string;

  @Input()
  public alt: string;

  public loaded$ = new BehaviorSubject(false);

  ngOnInit() {
  }

  public onLoad(): void {
    this.loaded$.next(true);
  }
}

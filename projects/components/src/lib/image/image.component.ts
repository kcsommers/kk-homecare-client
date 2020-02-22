import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Filters } from '@kk/core';

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

  @Input()
  public tag: Filters;

  public loaded$ = new BehaviorSubject(false);

  ngOnInit() {
  }

  public onLoad(): void {
    this.loaded$.next(true);
  }
}

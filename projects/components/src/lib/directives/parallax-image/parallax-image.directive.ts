import { OnInit, Directive, Renderer2, Input, HostBinding, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[kkParallaxBg]',
})
export class ParallaxImageDirective implements OnInit {
  private _imgUrl: string;
  private _offset = 0;
  private bgDiv: HTMLDivElement;

  @Input()
  public set kkParallaxBg(src: string) {
    this._imgUrl = src;
  }

  @Input()
  private position: 'center' | 'top' | 'bottom' = 'center';

  @HostBinding('style.position')
  public positionBinding = 'relative';

  @HostBinding('style.overflow')
  public overflow = 'hidden'

  @HostListener('window:scroll')
  public onScroll() {
    if (this.bgDiv) {
      this.renderer.setStyle(this.bgDiv, 'transform', `translateY(${(window.scrollY - (this._offset / 2)) / 12}%)`);
    }
  }

  constructor(
    private renderer: Renderer2,
    private el: ElementRef
  ) { }

  ngOnInit() {
    this.setOffset();
    this.appendParallaxDiv();
  }

  private setOffset() {
    let parent = this.el.nativeElement.parentNode;
    let total = this.el.nativeElement.offsetTop;
    while (parent && parent.offsetTop) {
      total += parent.offsetTop;
      parent = parent.parentNode;
    }
    this._offset = total;
  }

  private appendParallaxDiv() {
    const height = this.el.nativeElement.offsetHeight;
    this.bgDiv = this.renderer.createElement('div');
    this.renderer.setStyle(this.bgDiv, 'backgroundImage', `url(${this._imgUrl})`);
    this.renderer.setStyle(this.bgDiv, 'backgroundRepeat', 'no-repeat');
    this.renderer.setStyle(this.bgDiv, 'backgroundSize', 'cover');
    this.renderer.setStyle(this.bgDiv, 'backgroundPosition', this.position);
    this.renderer.setStyle(this.bgDiv, 'position', 'absolute');
    this.renderer.setStyle(this.bgDiv, 'top', `-${height * 0.25}px`);
    this.renderer.setStyle(this.bgDiv, 'bottom', `-${height * 0.25}px`);
    this.renderer.setStyle(this.bgDiv, 'right', '0');
    this.renderer.setStyle(this.bgDiv, 'left', '0');
    this.renderer.setStyle(this.bgDiv, 'zIndex', 50);
    this.renderer.setStyle(this.bgDiv, 'transform', `translateY(${(window.scrollY - (this._offset / 2)) / 12}%)`)
    this.renderer.appendChild(this.el.nativeElement, this.bgDiv);
  }
}

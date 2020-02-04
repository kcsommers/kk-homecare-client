import { Directive, Input, TemplateRef, ViewContainerRef, Renderer2, OnInit, ElementRef, Component, ComponentFactoryResolver, ContentChildren, ContentChild, AfterContentInit, QueryList, ViewChild, HostListener, HostBinding } from '@angular/core';

@Component({
  selector: 'kk-parallax-image',
  template: `
    <div class="parallax-image-wrap">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./parallax-image.directive.scss']
})
export class ParallaxImageComponent {
  public imageNode: Node;
  private _height: string;
  private scroll: number;
  constructor(
    private renderer: Renderer2
  ) {
    this.scroll = window.scrollY;
  }

  @HostListener('window:scroll')
  onScrollEvent() {
    this.scroll = window.scrollY;
  }

  @HostBinding('style.height')
  public get height() {
    return this._height;
  }

  public setImageNode(image: Node, height: string) {
    this.renderer.setStyle(image, 'position', 'absolute');
    this.renderer.setStyle(image, 'left', '0');
    this.renderer.setStyle(image, 'right', '0');
    this.renderer.setStyle(image, 'top', '-200px');
    this.renderer.setStyle(image, 'bottom', '-200px');
    this.imageNode = image;
    this._height = height;
    this.transformImage(0);
  }

  private transformImage(y: number) {
    this.renderer.setStyle(this.imageNode, 'transform', `translateY(${y}%)`);
  }
}

@Directive({
  selector: '[kkParallaxImage]',
})
export class ParallaxImageDirective implements OnInit {
  private _height: string;

  @Input()
  public set kkParallaxImage(height: string) {
    this._height = height || '100vh';
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private resolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    const parallaxFactory = this.resolver.resolveComponentFactory(ParallaxImageComponent);
    const imgView = this.viewContainer.createEmbeddedView(this.templateRef);
    const parallaxComponent = this.viewContainer.createComponent(parallaxFactory, 0, null, [imgView.rootNodes]);
    parallaxComponent.instance.setImageNode(imgView.rootNodes[0], this._height);
  }
}

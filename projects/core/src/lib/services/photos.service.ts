import { Injectable, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ImageModel } from '../data';
import { ImageComponent } from 'projects/components/src/lib/image/image.component';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {
  public photosContainer: ViewContainerRef
  public lastId: string;

  constructor(private http: HttpClient, private _cfr: ComponentFactoryResolver) { }

  public getImages(
    limit: number,
    getTotal: boolean,
    fetchAll: boolean
  ): Observable<any> {
    return this.http.post(`${environment.apiUrl}/photos`, { limit, lastId: this.lastId, getTotal, fetchAll });
  }

  public createImageComponents(imgModels: ImageModel[], clickCb?: (img: ImageModel) => void) {
    this.lastId = imgModels[imgModels.length - 1]._id;
    imgModels.forEach(imgModel => {
      const factory = this._cfr.resolveComponentFactory(ImageComponent);
      const imgComponent = this.photosContainer.createComponent(factory);
      imgComponent.instance.image = imgModel;
      if (clickCb) {
        imgComponent.instance.imageSelected.subscribe(clickCb);
      }
    });
  }
}

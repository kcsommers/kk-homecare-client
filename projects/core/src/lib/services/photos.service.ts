import { Injectable, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ImageModel, PhotosResponse, BeforeAfterResponse } from '../photos/photos';
import { ImageComponent } from 'projects/components/src/lib/image/image.component';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {
  public photosContainer: ViewContainerRef;
  public lastId: string;

  constructor(private http: HttpClient, public cfr: ComponentFactoryResolver) { }

  public getRegularPhotos(
    limit: number,
    getTotal: boolean,
    fetchAll: boolean
  ): Observable<PhotosResponse> {
    return this.http.post<PhotosResponse>(`${environment.apiUrl}/photos`, { limit, lastId: this.lastId, getTotal, fetchAll });
  }

  public getBeforeAfterPhotos(offset: number, fetchAll: boolean): Observable<BeforeAfterResponse> {
    return this.http.post<BeforeAfterResponse>(`${environment.apiUrl}/photos/before-after`, { offset });
  }

  public createImageComponents(imgModels: ImageModel[], clickCb?: (img: ImageModel) => void, viewContainer?: ViewContainerRef) {
    const container = viewContainer || this.photosContainer;
    if (container) {
      this.lastId = imgModels[imgModels.length - 1]._id;
      imgModels.forEach(imgModel => {
        const factory = this.cfr.resolveComponentFactory(ImageComponent);
        const imgComponent = container.createComponent(factory);
        imgComponent.instance.image = imgModel;
        imgComponent.instance.growOnHover = true;
        if (clickCb) {
          imgComponent.instance.imageSelected.subscribe(clickCb);
        }
      });
    }
  }
}

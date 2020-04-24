import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PhotosService } from 'projects/core/src/lib/services/photos.service';
import { take } from 'rxjs/operators';
import { HttpResponse, Services } from '@kk/core';

@Component({
  selector: 'kk-image-upload-template',
  templateUrl: './image-upload-template.component.html',
  styleUrls: ['./image-upload-template.component.scss']
})
export class ImageUploadTemplateComponent {

  public currentTag = Services.CLEANING;

  public tags = [
    { value: Services.CLEANING, viewValue: 'Cleaning' },
    { value: Services.LANDSCAPING, viewValue: 'Landscaping' },
    { value: Services.PAINTING, viewValue: 'Painting' },
    { value: Services.WALLPAPERING, viewValue: 'Wallpapering' }
  ];

  public files: FileList;

  public fileNames$ = new BehaviorSubject<string[]>([]);

  public draggedOver$ = new BehaviorSubject(false);

  constructor(private _photosService: PhotosService) {
  }

  public filesSelected(event: Event): void {
    const files = <FileList>event.target['files'];
    if (files && files.length) {
      this.files = files;
      this.fileNames$.next(Array.from(files).map(f => f.name));
    }
  }

  public dragEnter(event: DragEvent): void {
    this.draggedOver$.next(true);
  }

  public dragDone(event: DragEvent): void {
    this.draggedOver$.next(false);
  }

  public uploadImages(): void {
    this._photosService.upload(this.files, this.currentTag)
      .pipe(take(1))
      .subscribe(
        (res: HttpResponse) => {
          console.log('RES:::: ', res);
        },
        err => console.error(err)
      )
  }

  public tagChanged(tag: Services) {
    this.currentTag = tag;
  }
}

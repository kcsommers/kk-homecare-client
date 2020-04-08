import { Component } from '@angular/core';
import { ModalService, ModalTemplates } from '@kk/core';

@Component({
  selector: 'kk-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  constructor(private _modalService: ModalService) {
  }

  public openImageUploadModal(): void {
    this._modalService.openModal(ModalTemplates.IMAGE_UPLOAD);
  }
}

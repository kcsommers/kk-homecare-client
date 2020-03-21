import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { ModalService, ModalTemplates } from '@kk/core';

@Component({
  selector: 'kk-invoice-page',
  templateUrl: './invoice-page.component.html',
  styleUrls: ['./invoice-page.component.scss'],
  providers: [AdminService]
})
export class InvoicePageComponent implements OnInit {
  constructor(
    private _adminService: AdminService,
    private _modalService: ModalService
  ) {
  }

  ngOnInit(): void {
  }

  public openInvoiceModal(): void {
    this._modalService.openModal(ModalTemplates.INVOICE, false);
  }
}

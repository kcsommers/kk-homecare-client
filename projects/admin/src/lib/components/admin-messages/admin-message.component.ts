import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MessageModel } from '../../admin-data';
import { MomentInput, Moment } from 'moment';
const moment = require('moment');

@Component({
  selector: 'kk-admin-message',
  templateUrl: './admin-message.component.html',
  styleUrls: ['./admin-message.component.scss']
})
export class AdminMessageComponent {

  @Input()
  public message: MessageModel;

  @Output()
  public delete = new EventEmitter<string>();

  @Output()
  public seen = new EventEmitter<string>();

  public isExpanded = false;

  constructor() {
  }

  public dateSent(date: MomentInput): Moment {
    return moment(date).format('L');
  }

  public deleteMessage(): void {
    this.delete.emit(this.message._id);
  }

  public messageSeen(): void {
    this.seen.emit(this.message._id);
  }
}

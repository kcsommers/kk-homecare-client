import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MessageModel, MessageResponse } from '../../admin-data';
import { MessageService } from '../../services/message.service';
import { take } from 'rxjs/operators';
import { HttpResponse } from '@kk/core';


@Component({
  selector: 'kk-admin-messages-page',
  templateUrl: './admin-messages-page.component.html',
  styleUrls: ['./admin-messages-page.component.scss'],
  providers: [MessageService]
})
export class AdminMessagesPageComponent implements OnInit {
  public loading$ = new BehaviorSubject(true);

  public messages: MessageModel[] = [];

  constructor(private _messageService: MessageService) {
  }

  ngOnInit(): void {
    this._messageService.getMessages()
      .pipe(take(1))
      .subscribe(
        (res: MessageResponse) => {
          this.loading$.next(false);
          if (res.success) {
            this.messages = res.data.messages;
            console.log('RES', this.messages)
          }
        },
        err => console.error(err)
      )
  }

  public deleteMessage(id: string) {
    this._messageService.deleteMessage(id)
      .pipe(take(1))
      .subscribe(
        (result: HttpResponse) => {
          console.log('RTES', result)
        },
        err => console.error(err)
      )
  }

  public messageSeen(id: string) {
    this._messageService.markAsSeen(id)
      .pipe(take(1))
      .subscribe(
        (result: HttpResponse) => {
          console.log('RTES', result)
        },
        err => console.error(err)
      )
  }
}

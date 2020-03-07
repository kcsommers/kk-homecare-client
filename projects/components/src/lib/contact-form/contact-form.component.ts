import { Component, Input, OnInit, HostBinding, HostListener, Output, EventEmitter, ElementRef, Renderer2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ImageModel, ContactService, JobTypes, ContactFormResponse } from '@kk/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { take } from 'rxjs/operators';

@Component({
  selector: 'kk-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent {
  public nameInput = '';
  public emailInput = '';
  public messageInput = '';
  public phoneInput = '';
  public jobTypeInput = JobTypes.COMMERCIAL;

  public get formValid(): boolean {
    return !!(
      this.nameInput &&
      this.emailInput &&
      this.messageInput &&
      this.phoneInput &&
      this.jobTypeInput
    );
  }

  @Output()
  public submitted = new EventEmitter<ContactFormResponse>();

  constructor(private _contactService: ContactService) {
  }

  public submit() {
    console.log('Submitting')
    this._contactService.submitForm({
      name: this.nameInput,
      email: this.emailInput,
      message: this.messageInput,
      phone: this.phoneInput,
      jobType: this.jobTypeInput
    })
      .pipe(take(1))
      .subscribe(
        success => {
          this.submitted.next({ success, error: null });
        },
        error => this.submitted.next({ success: false, error })
      );
  }
}

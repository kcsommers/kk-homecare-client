import { Component, Input, OnInit, HostBinding, HostListener, Output, EventEmitter, ElementRef, Renderer2, ViewChild } from '@angular/core';
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
  public formErrors = {
    name$: new BehaviorSubject(false),
    email$: new BehaviorSubject(false),
    phone$: new BehaviorSubject(false),
    message$: new BehaviorSubject(false)
  };

  public submitError$ = new BehaviorSubject('');
  public submitSuccess$ = new BehaviorSubject(false);
  public submitting$ = new BehaviorSubject(false);

  public get formValid(): boolean {
    return !!(
      this.nameInput &&
      this.emailInput &&
      this.messageInput &&
      this.phoneInput &&
      this.jobTypeInput
    );
  }

  @ViewChild('PhoneInput', { static: false, read: ElementRef })
  private _phoneInputEl: ElementRef<HTMLInputElement>;

  @Output()
  public submitted = new EventEmitter<ContactFormResponse>();

  constructor(private _contactService: ContactService) {
  }

  public submit(): void {
    this.submitting$.next(true);
    this._contactService.submitForm({
      name: this.nameInput,
      email: this.emailInput,
      message: this.messageInput,
      phone: parseInt(this.phoneInput.replace(/[^0-9]/g, ''), 10),
      jobType: this.jobTypeInput
    })
      .pipe(take(1))
      .subscribe(
        success => {
          this.submitting$.next(false);
          this.submitSuccess$.next(true);
          this.submitted.next({ success, error: null });
        },
        error => {
          this.submitting$.next(false);
          this.submitError$.next('Sorry, there was an unexpected error delivering your message. Please try again later.');
          this.submitted.next({ success: false, error });
        }
      );
  }

  public validateForm(): void {
    let isValid = true;
    if (!this.nameInput) {
      this.formErrors.name$.next(true);
      isValid = false;
    } else {
      this.formErrors.name$.next(false);
    }
    if (!this.emailInput) {
      this.formErrors.email$.next(true);
      isValid = false;
    } else {
      this.formErrors.email$.next(false);
    }
    if (!this.phoneInput) {
      this.formErrors.phone$.next(true);
      isValid = false;
    } else {
      this.formErrors.phone$.next(false);
    }
    if (!this.messageInput) {
      this.formErrors.message$.next(true);
      isValid = false;
    } else {
      this.formErrors.message$.next(false);
    }
    if (isValid) {
      this.submit();
    }
  }

  public validatePhoneInput(value: string): void {
    const realVal = value.replace(/[^0-9]/g, '');
    const area = realVal.substr(0, 3);
    const pre = realVal.substr(3, 3);
    const tel = realVal.substr(6, 4);
    this.phoneInput = this._phoneInputEl.nativeElement.value =
      pre.length ? `(${area}) ${pre}${tel.length ? `-${tel}` : ''}` : area;
  }
}

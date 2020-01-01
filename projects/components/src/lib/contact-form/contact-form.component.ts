import { Component } from '@angular/core';
import { ContactService, JobTypes, FormSubmission } from '@kk/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'kk-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent {
  public name = '';

  public email = '';

  public phone = '';

  public message = '';

  public type: JobTypes;

  public get formValid(): boolean {
    return !!(this.name && this.message && (this.email || this.phone));
  }

  constructor(private contactService: ContactService) {
  }

  public submitForm() {
    if (this.formValid) {
      const data: FormSubmission = {
        name: this.name,
        email: this.email,
        phone: this.phone,
        message: this.message,
        jobType: this.type
      };
      this.contactService.submitForm(data).pipe(take(1))
        .subscribe((res: any) => {
          console.log('Form Submitted:::: ', res);
        });
    }
  }
}

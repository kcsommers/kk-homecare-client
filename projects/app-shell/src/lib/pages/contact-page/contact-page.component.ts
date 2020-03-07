import { Component } from '@angular/core';
import { ContactFormResponse } from '@kk/core';

@Component({
  selector: 'kk-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent {

  public formSubmitted(response: ContactFormResponse) {
    if (response.error) {
      console.error(response.error);
      return;
    }
    if (response.success) {
      console.log('Form Submitted successfully');
    }
  }

}

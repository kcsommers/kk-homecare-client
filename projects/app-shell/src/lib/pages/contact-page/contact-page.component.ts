import { Component } from '@angular/core';
import { HttpResponse } from '@kk/core';
import { BasePage } from '../base-page';

@Component({
  selector: 'kk-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent extends BasePage {

  public formSubmitted(response: HttpResponse) {
    if (response.error) {
      console.error(response.error);
      return;
    }
    if (response.success) {
      console.log('Form Submitted successfully');
    }
  }

}

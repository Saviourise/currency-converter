import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ApiService } from '../../services/api/api.service';
import { NotificationService } from '../../services/notification/notification.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {
  currencies: any[] = [
    { text: 'US Dollars $', value: 'USD' },
    { text: 'Euros €', value: 'EUR' },
    { text: 'British Pounds £', value: 'GBP' },
    { text: 'Japanese Yen ¥', value: 'JPY' },
    { text: 'Naira ₦', value: 'NGN' },
  ];

  convertedAmount = 0;
  explanation = '';
  obj = {};

  currencyApiObservable!: Subscription;

  constructor(
    private apiService: ApiService,
    private notification: NotificationService
  ) {}

  // Function called when the form is submitted.
  onSubmit(form: NgForm, form2: NgForm) {
    if (!form.value.currency) {
      this.notification.btnClicked(
        'Select the currency you want to convert from',
        'error'
      );
    } else if (!form.value.amount) {
      this.notification.btnClicked('Input an amount', 'error');
    } else if (!form2.value.currency2) {
      this.notification.btnClicked(
        'Select the currency you want to convert to',
        'error'
      );
    } else if (form.value.currency === form2.value.currency2) {
      this.notification.btnClicked(
        'You cannot convert a currency to itself',
        'error'
      );
    } else {
      this.obj = {
        from: form.value.currency,
        to: form2.value.currency2,
        amount: form.value.amount,
      };
      this.notification.btnClicked('Converting... Please wait', 'info');

      this.currencyApiObservable = this.apiService
        .getCountries(this.obj)
        .subscribe((data: any) => {
          data.result === 'success' &&
            this.notification.btnClicked('Conversion successful', 'success');
          data.result === 'success' &&
            (this.explanation = `1 ${form.value.currency} equals ${data.conversion_rate} ${form2.value.currency2}`);
          data.result === 'success'
            ? (this.convertedAmount = data.conversion_result)
            : this.notification.btnClicked(
                'An error occurred, try again',
                'error'
              );
        });
    }
  }
}

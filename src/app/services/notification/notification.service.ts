import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toastr: ToastrService) {}

  btnClicked(message: string, status: string) {
    return status === 'success'
      ? this.toastr.success(message, 'Success!')
      : status === 'error'
      ? this.toastr.error(message, 'Error!')
      : status === 'info'
      ? this.toastr.info(message, 'Loading!')
      : null;
  }
}

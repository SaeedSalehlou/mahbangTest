import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { BaseResponseModel } from '../../domain/models/base/base-response.model';

@Injectable({
  providedIn: 'root',
})
export abstract class MatSnackBarService {
  private config: MatSnackBarConfig;
  constructor(private snackBar: MatSnackBar) {
    this.config = new MatSnackBarConfig();
  }
  showMessage(message: string, duration: number) {
    if (message) {
      if (duration > 30) {
        duration = 30;
      }
      this.config.duration = duration * 1000;
    } else {
      this.config.duration = 5 * 1000;
    }
    this.snackBar.open(message, 'Close', this.config);
  }
  showBaseResponse(response: BaseResponseModel<any>) {
    if (response) {
      if (response.status === 'success') {
        this.config.duration = 5 * 1000;
      } else {
        this.config.duration = 5 * 1000;
      }
      this.snackBar.open(response.message, 'Close', this.config);
    }
  }
}

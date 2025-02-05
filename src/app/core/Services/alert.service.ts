import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private _snackBar: MatSnackBar) { }

  private openSnackBar(message: string, config: MatSnackBarConfig) { this._snackBar.open(message, '', config) }

  default(message: string, config: MatSnackBarConfig | null = null) {
    var snackbarConfig: MatSnackBarConfig = { duration: 5000, verticalPosition: 'top', horizontalPosition: 'center', panelClass: 'customAlertClass' };
    if (config != null)
    {
      snackbarConfig.duration = config.duration;
      snackbarConfig.verticalPosition = config.verticalPosition;
      snackbarConfig.horizontalPosition = config.horizontalPosition;
    }
    this.openSnackBar(message, snackbarConfig)
  }

  error(message: string, config: MatSnackBarConfig | null = null) {
    var snackbarConfig: MatSnackBarConfig = { duration: 4000, verticalPosition: 'top', horizontalPosition: 'center', panelClass: 'customAlertClass_Error' };
    console.info('config', config);
    if (config != null) {
      Object.assign(snackbarConfig, config);
      snackbarConfig.duration = config.duration;
      snackbarConfig.verticalPosition = config.verticalPosition;
      snackbarConfig.horizontalPosition = config.horizontalPosition;
    }
    this.openSnackBar(message, snackbarConfig)
  }
}

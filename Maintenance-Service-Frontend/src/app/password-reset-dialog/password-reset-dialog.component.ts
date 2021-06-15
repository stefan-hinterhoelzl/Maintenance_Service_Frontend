import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditTicketDialogComponent } from '../edit-ticket-dialog/edit-ticket-dialog.component';
import { AlertService } from '../services/alertService';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-password-reset-dialog',
  templateUrl: './password-reset-dialog.component.html',
  styleUrls: ['./password-reset-dialog.component.css']
})
export class PasswordResetDialogComponent implements OnInit {


  email: FormControl

  constructor(private dialogRef: MatDialogRef<PasswordResetDialogComponent>, private auth: AuthService, private alert: AlertService) {

    this.email = new FormControl("", [Validators.required, Validators.email])
   }

  ngOnInit(): void {
  }


  async resetPassword() {
    let email: string = this.email.value;
  
    await this.auth.resetPassword(email).then(() => {
      this.dialogRef.close();
      this.alert.success("Link zum Passwort zurücksetzen wurde gesendet!")
    }).catch((error) => {
      this.alert.error("Es existiert kein Konto mit der angebenen Email!")
    })

  }

  close() {
    this.dialogRef.close();
  }


  getErrorMessage() {
    if (this.email.hasError('required')) {
      return "Nicht alle Pflichtfelder wurden ausgefüllt"
    }

    if (this.email.hasError('email')) return "Das ist eine ungültige Email"
  }

}

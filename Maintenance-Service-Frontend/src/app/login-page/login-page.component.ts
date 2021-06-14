import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../services/alertService';
import { AuthService } from '../services/auth.service';



const firebaseErrors = {
  'auth/user-not-found': 'Kein Account mit diesem Benutzernamen gefunden.',
  'auth/wrong-password': 'Das eingegebene Passwort ist nicht richtig.',
  'auth/everything-else':	'Das hat nicht funktioniert. Überprüfe bitte deine Internetverbindung und versuche es erneut',
};



@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  form: FormGroup

  constructor(private auth: AuthService, private fb: FormBuilder, private alert: AlertService, private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: this.email,
      password: this.password
    })
  }
  	
  async signIn() {
    if(this.form.valid) {

      let email: string = this.email.value;
      let password: string = this.password.value;
      email = email.toLowerCase();

      await this.auth.signIn(email, password).then(() =>{
        this.auth.user.next(email);
        this.router.navigate(['app'])
      }).catch((error) =>{
        this.email.setValue('');
        this.password.setValue('');
        let errorMessage = firebaseErrors[error.code] || firebaseErrors['auth/everything-else'];
        this.alert.error(errorMessage);
      });
    }
  }

  getErrorMessage() {
    if (this.email.hasError('required') || this.password.hasError('required')) {
      return "Nicht alle Pflichtfelder wurden ausgefüllt!"
    }

    if (this.email.hasError('email')) return "Das ist eine ungültige Email"

  }

}

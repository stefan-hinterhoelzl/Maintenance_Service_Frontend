import { Component, OnInit } from '@angular/core';

import { ObjectUnsubscribedError } from 'rxjs';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyErrorStateMatcher } from '../helpers/MyErrorStateMatcher';
import { AlertService } from '../services/alertService';
import { AuthService } from '../services/auth.service';


const firebaseErrors = {
  'auth/email-already-in-use': 'Dieser Benutzername wird bereits von einem anderen Nutzer verwendet.',
}; // list of firebase error codes to alt

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  form: FormGroup;
  matcher: MyErrorStateMatcher = new MyErrorStateMatcher();
  email: FormControl;
  password: FormControl;
  passwordconfirm: FormControl;


  constructor(private auth: AuthService, private router: Router, private fb: FormBuilder, private alert: AlertService) {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required]);
    this.passwordconfirm = new FormControl('');

    this.form = this.fb.group({
      email: this.email,
      password: this.password,
      passwordconfirm: this.passwordconfirm
    }, 
    {validator: this.checkPasswords}    
    );

   }

  ngOnInit() {}




  async signUpUser() {
    let mail: string = this.email.value;
    mail = mail.toLowerCase();
    let password: string = this.password.value;

   await this.auth.signUp(mail, password).then(()=>{
     this.alert.success("Benutzer "+mail+" wurde erstellt!");
      this.router.navigate(['app']);
   }).catch((error) => {
     if (error.code === 'auth/email-already-in-use') {
      this.alert.error('Dieser Benutzername wird bereits von einem anderen Nutzer verwendet.');
     }
     else{
       this.alert.error("Fehler")
       console.log(error);
     }
   });
  }

  getErrorMessage() {
    if (this.email.hasError('required') || this.password.hasError('required')) {
      return "Nicht alle Pflichtfelder wurden ausgefüllt"
    }

    if (this.email.hasError('email')) return "Das ist eine ungültige Email"
  }

  checkPasswords(group: FormGroup) {
    let pass = group.controls.password.value;
    let confirmPass = group.controls.passwordconfirm.value;
    return pass === confirmPass ? null : { notSame: true };
  }
  



}
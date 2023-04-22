import { Component } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
    lastCtrl: ['', Validators.required],
    birthCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    emailCtrl: ['', Validators.required],
    phoneCtrl: ['', Validators.required],
  });

  thirdFormGroup = this._formBuilder.group({
     addCtrl: ['', Validators.required],
     cityCtrl: ['', Validators.required],
     postalCtrl: ['', Validators.required],
  })

  constructor(private _formBuilder: FormBuilder) {}

}

import { Component } from '@angular/core';
import {FormBuilder, Validators, FormGroupDirective, NgForm, FormControl, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
hide = true;

 constructor( ) {}

 loginForm = new FormGroup({
      emailCtrl: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$") ]),
      passwordCtrl: new FormControl ('', [Validators.required, Validators.minLength(8)])
    })


}

import { Component } from '@angular/core';
import {FormBuilder, Validators, FormGroup, FormControl} from '@angular/forms';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {

  hide = true;

  firstFormGroup = new FormGroup({
    firstCtrl: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastCtrl: new FormControl('', [Validators.required, Validators.minLength(2)]),
    birthCtrl: new FormControl('', [Validators.required]),
  });
  secondFormGroup = new FormGroup({
    emailCtrl: new FormControl('', [Validators.required, Validators.pattern("^[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}$")]),
    phoneCtrl: new FormControl('', [Validators.pattern("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$")]),
    passwordCtrl : new FormControl('', [Validators.required, Validators.minLength(8)]),
    confPasswordCtrl : new FormControl('', [Validators.required ])
  });

  thirdFormGroup = new FormGroup({
     addCtrl: new FormControl('', Validators.required),
     cityCtrl: new FormControl('', Validators.required),
     postalCtrl: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
  })

  constructor(public translate: TranslateService) {
    translate.use(localStorage.getItem('language') ? localStorage.getItem('language')! : 'de');
    console.log(this.translate.currentLang)
    translate.addLangs(['de', 'en', 'fr']);
  }

  PasswordMatch(fielControl: FormControl)
  {  
    return fielControl.value === this.secondFormGroup.controls.passwordCtrl.value? null:{ matching : true}
  }

  changeLanguage(lang)
  {
    localStorage.setItem('language', lang)
    this.translate.setDefaultLang(lang);
    this.translate.use(lang)
   
  }
}

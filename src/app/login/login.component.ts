import { Component } from '@angular/core';
import { Validators, FormControl, FormGroup} from '@angular/forms';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
hide = true;
 constructor(public translate: TranslateService) {
  translate.use(localStorage.getItem('language')?localStorage.getItem('language')!:'en');
  console.log(this.translate.currentLang)
  translate.addLangs(['de', 'en', 'fr']);
 
 }

 loginForm = new FormGroup({
      emailCtrl: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$") ]),
      passwordCtrl: new FormControl ('', [Validators.required, Validators.minLength(8)])
    })

    SignIn()
    {
      
    }
    changeLanguage(lang)
    {
      localStorage.setItem('language', lang)
      console.log(lang)
      this.translate.setDefaultLang(lang);
      this.translate.use(lang)
    }
}

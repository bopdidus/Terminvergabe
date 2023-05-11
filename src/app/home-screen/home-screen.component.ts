import { Component, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent {
  hide = true;
  constructor(public translate: TranslateService) {
    translate.use(localStorage.getItem('language') ? localStorage.getItem('language')! : 'de');
    console.log(this.translate.currentLang)
    translate.addLangs(['de', 'en', 'fr']);
  }

  changeLanguage(lang) {
    localStorage.setItem('language', lang)
    console.log(lang)
    this.translate.setDefaultLang(lang);
    this.translate.use(lang)
  }
}

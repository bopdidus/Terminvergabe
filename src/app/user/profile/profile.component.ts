import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  view:string;
  connectedUser:any
  constructor(public translate: TranslateService)
  {
    translate.use(localStorage.getItem('language') ? localStorage.getItem('language')! : 'de');
    console.log(this.translate.currentLang)
    this.connectedUser = sessionStorage.getItem("user")
    translate.addLangs(['de', 'en', 'fr']);
    this.view="profile"
  }
}

import { Component } from '@angular/core';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(public translate: TranslateService)
  {
    translate.use(localStorage.getItem('language') ? localStorage.getItem('language')! : 'de');
    translate.addLangs(['de', 'en', 'fr']);
  }
}

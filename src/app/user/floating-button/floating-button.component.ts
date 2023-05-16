import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'floating-button',
  templateUrl: './floating-button.component.html',
  styleUrls: ['./floating-button.component.css']
})
export class FloatingButtonComponent implements OnChanges {
    @Input() currentView:string;
    constructor(public translate: TranslateService, )
    {
      translate.use(localStorage.getItem('language') ? localStorage.getItem('language')! : 'de');
    console.log(this.translate.currentLang)
    translate.addLangs(['de', 'en', 'fr']);
    }
   

    ngOnChanges(changes: SimpleChanges) {
      if(changes['currentView'].currentValue =="profile")
      {
        console.log(changes['currentView'].currentValue)
          document.getElementById("profile")?.style.setProperty('display', 'none')
      }
      if(changes['currentView'].currentValue =="home")
      {
        console.log(changes['currentView'].currentValue)
        document.getElementById("home")?.style.setProperty('display', 'none')
      }
    }
}

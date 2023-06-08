import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';

import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-calendar-overview',
  templateUrl: './calendar-overview.component.html',
  styleUrls: ['./calendar-overview.component.css']
})

export class CalendarOverviewComponent  {
  selected: Date | null;
  the_date:string = new Date().toString()
 
  constructor(public translate: TranslateService)
  {
    translate.addLangs(['en', 'fr', 'de']);
    translate.use(sessionStorage.getItem('language')?sessionStorage.getItem('language')!:'en');
  }

    getFormat()
    {
      if(this.selected! >= new Date())
      {
        const yyyy = this.selected!.getFullYear();
        let mm = this.selected!.getMonth() + 1; // Months start at 0!
        let dd = this.selected!.getDate();
        this.the_date = yyyy + '-'
        if (mm < 10) this.the_date +='0' + mm + '-';
        else this.the_date += mm + '-'

        if (dd < 10) this.the_date +='0' + dd;
        else this.the_date += dd;
       
      }
       
    }
    
}
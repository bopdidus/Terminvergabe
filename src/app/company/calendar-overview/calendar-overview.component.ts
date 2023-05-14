import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { Appointment, STATUS } from '../../Model/appointment';

@Component({
  selector: 'app-calendar-overview',
  templateUrl: './calendar-overview.component.html',
  styleUrls: ['./calendar-overview.component.css']
})

export class CalendarOverviewComponent {
    
 appoints:any[]=[]
 months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "Novembre", "December"]
 displayYear=false
    constructor(public translate: TranslateService)
    {
      translate.addLangs(['en', 'fr', 'de']);
      translate.use(localStorage.getItem('language')?localStorage.getItem('language')!:'en');
      this.appoints.push(new Appointment(
        "Verlängerung",
       new Date(),
      ).asDTO());
      this.appoints.push(new Appointment(
       "Verlängerung des aufenthaltitels",
        new Date()
      ).asDTO());
      this.appoints.push(new Appointment(
        "Arbeitserlaubnis",
        new Date(),
      ).asDTO());
      this.appoints.push(new Appointment(
        "Arbeitserlaubnis",
        new Date(),
      ).asDTO());
      this.appoints.push(new Appointment(
        "Verlängerung des aufenthaltitels",
         new Date(),
      ).asDTO());
      this.appoints.push(new Appointment(
        "Verlängerung des aufenthaltitels",
         new Date(),
      ).asDTO());
    }
 
   
  
    
}


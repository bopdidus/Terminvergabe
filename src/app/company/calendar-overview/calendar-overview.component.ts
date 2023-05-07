import {Component} from '@angular/core';
import { Appointment, STATUS } from '../../Model/appointment';

@Component({
  selector: 'app-calendar-overview',
  templateUrl: './calendar-overview.component.html',
  styleUrls: ['./calendar-overview.component.css']
})

export class CalendarOverviewComponent {
    
 appoints:any[]=[]
    constructor()
    {
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


import { Component, ViewEncapsulation } from '@angular/core';

import { MatCalendarCellClassFunction, MatDatepicker } from '@angular/material/datepicker';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppointmentListComponent {
  myDate = new Date();

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      const date = cellDate.getDate();

      // Highlight the 1st and 20th day of each month.
      return date === 1 || date === 20 ? 'example-custom-date-class' : '';
    }

    return '';
  };
}
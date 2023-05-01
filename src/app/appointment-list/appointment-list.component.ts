import { Component, ViewEncapsulation } from '@angular/core';

export interface PeriodicElement {
  position: number;
  name: string;
  datum: string;
  uhrzeit: string;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, datum: '3. Mai 2023', name: 'Termin bei Sachbeartbeiter Otto', uhrzeit: '08.30 Uhr', symbol: 'X'},
  {position: 2, datum: '6. Mai 2023', name: 'Termin bei Sachbeartbeiterin Ming Li', uhrzeit: '10.00 Uhr', symbol: 'X'},
  {position: 3, datum: '13. Mai 2023', name: 'Termin bei Sachbeartbeiter Ali', uhrzeit: '12.30 Uhr', symbol: 'X'},
  {position: 4, datum: '23. Mai 2023', name: 'Termin bei Sachbeartbeiter Ada', uhrzeit: '11.30 Uhr', symbol: 'X'},
];

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class AppointmentListComponent {
  displayedColumns: string[] = ['position', 'datum', 'name', 'uhrzeit', 'symbol'];
  dataSource = ELEMENT_DATA;
}
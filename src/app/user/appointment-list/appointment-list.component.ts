import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SwUpdate } from '@angular/service-worker';

export interface PeriodicElement {
  position: number;
  name: string;
  datum: string;
  uhrzeit: string;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, datum: '3. Mai 2023', name: 'Termin bei Sachbeartbeiter Otto', uhrzeit: '08.30 Uhr', symbol: 'X' },
  { position: 2, datum: '6. Mai 2023', name: 'Termin bei Sachbeartbeiterin Ming Li', uhrzeit: '10.00 Uhr', symbol: 'X' },
  { position: 3, datum: '13. Mai 2023', name: 'Termin bei Sachbeartbeiter Ali', uhrzeit: '12.30 Uhr', symbol: 'X' },
  { position: 4, datum: '23. Mai 2023', name: 'Termin bei Sachbeartbeiter Ada', uhrzeit: '11.30 Uhr', symbol: 'X' },
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

export class AppointmentListComponent implements OnInit{
  displayedColumns: string[] = ['position', 'datum', 'name', 'uhrzeit', 'symbol'];
  dataSource = ELEMENT_DATA;
  view:string;

  hide = true;
  constructor(public translate: TranslateService, private swUpdate: SwUpdate) {
    translate.use(localStorage.getItem('language') ? localStorage.getItem('language')! : 'de');
    console.log(this.translate.currentLang)
    translate.addLangs(['de', 'en', 'fr']);
    this.view ="appointment-list";
  }
  ngOnInit(): void {
    this.reloadApp()
  }
  reloadApp():void{
    if(this.swUpdate.isEnabled){
      this.swUpdate.versionUpdates.subscribe(()=>{
        if(confirm(this.translate.instant("NEW_VERSION"))){
          window.location.reload()
        }
      })
    }
  }

  changeLanguage(lang) {
    localStorage.setItem('language', lang)
    console.log(lang)
    this.translate.setDefaultLang(lang);
    this.translate.use(lang)
  }
}
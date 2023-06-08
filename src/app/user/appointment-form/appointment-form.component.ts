import { StepperOrientation } from '@angular/cdk/stepper';
import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { Observable, map } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

interface Clerk{
  value: string;
  name: string;
}

interface Timeslot{
  value: string;
  timeValue: string;
}

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css']
})

export class AppointmentFormComponent {

  // Sachbearbeiter Dummy data
  clerks: Clerk[] = [
    {value: 'otto-0', name: 'Otto Waalkes'},
    {value: 'zarina-1', name: 'Zarina Kasir'},
    {value: 'ahmet-2', name: 'Ahmet Kaya'},
  ];

  times: Timeslot[] = [
    {value: 'slot-0', timeValue: '08:00'},
    {value: 'slot-1', timeValue: '09:00'},
    {value: 'slot-2', timeValue: '10:00'},
    {value: 'slot-3', timeValue: '11:00'}
  ]

  myDate = new Date();

  ClerkFormGroup = this._formBuilder.group({
    dateCtrl: ['', Validators.required],
  });
  firstFormGroup = this._formBuilder.group({
    dateCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    timeCtrl: ['', Validators.required],
  });
  isLinear = true;

  stepperOrientation: Observable<StepperOrientation>;

  constructor(private _formBuilder: FormBuilder, breakpointObserver: BreakpointObserver, public translate: TranslateService, 
    private api: ApiService, private _snackBar: MatSnackBar, private router: Router,) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));

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

  onAppointmentCommit() //onRegister() copied
  {
    console.log("in onAppointmentCommit() gelandet")
    let obj ='{'+
      '"date": "2023/07/07"';
    if(false){
      console.log("You should not be here")
    }
    else{
      obj = obj + '}'
    }
    this.api.setAppointment(obj).subscribe({
    
      next:(res)=>{
        if(res)
        {
          if(res != null && res != undefined){
            console.log(res);
            //this.router.navigate(['/appointment-form']);
          }else{
            //this.openSnackBarError("");
          }
        }
      else{
        //this.openSnackBarError("");
      }
    },
    error:(error)=>{
      console.log(error);
      //this.openSnackBarError(error)
    }})
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      const date = cellDate.getDate();

      // Highlight the 1st and 20th day of each month.
      return date === 1 || date === 20 ? 'example-custom-date-class' : '';
    }

    return '';
  }

  openSnackBarError(error:any) {
    
    this._snackBar.open(this.translate.instant("APPOINTMENT_FORM_ERROR")+ " "+error,  "Close",{
      // duration: 5 * 1000,
      verticalPosition:'top',
      panelClass:['panel-danger']
    });
  }
}

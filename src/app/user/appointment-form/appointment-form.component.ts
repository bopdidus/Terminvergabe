import { StepperOrientation } from '@angular/cdk/stepper';
import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { Observable, map } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
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
  //snackbar variables
  currentClerk = '';
  currentDate : any;
  currentTime : any;

  // Sachbearbeiter Dummy data
  clerks: Clerk[] = [
    {value: 'Otto Waalkes', name: 'Otto Waalkes'},
    {value: 'Zarina Kasir', name: 'Zarina Kasir'},
    {value: 'Ahmet Kaya', name: 'Ahmet Kaya'},
  ];

  times: Timeslot[] = [
    {value: 'slot-0', timeValue: '08:00'},
    {value: 'slot-1', timeValue: '09:00'},
    {value: 'slot-2', timeValue: '10:00'},
    {value: 'slot-3', timeValue: '11:00'}
  ]

  myDate = new Date();

  clerkFormGroup = this._formBuilder.group({
    clerkCtrl: ['', Validators.required],
  });
  firstFormGroup = this._formBuilder.group({
    dateCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    timeCtrl: ['', Validators.required],
  });
  isLinear = true;
  qrCode ='';

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
      '"date": "' + this.clerkFormGroup.controls.clerkCtrl.value + 
      '", "time": "' + this.secondFormGroup.controls.timeCtrl.value +
      '", "userID": "testuserID", "clerkID": "testClerkID"';
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
            console.log("1234"+res);
            this.router.navigate(['/home-screen']);
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

  setCurrentClerk(clerk: string){
    this.currentClerk = clerk
  }

  setCurrentDate(){
    this.currentDate = this.firstFormGroup.get("dateCtrl")?.value
    const shortDate = new Date(this.currentDate)
    this.currentDate = shortDate.toLocaleDateString('de-DE', {weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric'})
  }

  setCurrentTime(){
    this.currentTime = this.secondFormGroup.get("timeCtrl")?.value
    this.qrCode = this.currentClerk.toString() + "_" + this.currentDate.toString() + "_" + this.currentTime.toString();
  }

  openSnackBar(){
    let outputmsg = "Sie haben bei "+ this.currentClerk + " am " + this.currentDate + " um " + this.currentTime + " einen Termin!";
    try {
      //save appointment
      this.onAppointmentCommit()

    } catch (error) {
      console.log(error)
    }
    this._snackBar.open(outputmsg, 'Okay');
  }

  openSnackBarError(error:any) {
    
    this._snackBar.open(this.translate.instant("APPOINTMENT_FORM_ERROR")+ " "+error,  "Close",{
      // duration: 5 * 1000,
      verticalPosition:'top',
      panelClass:['panel-danger']
    });
  }
}
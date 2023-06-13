import { StepperOrientation } from '@angular/cdk/stepper';
import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { Observable, map } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';


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

  dbClerks: any;
  dbTimes: any;  

  times: Timeslot[]=[]
  connectedUser:string


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

  constructor(private _formBuilder: FormBuilder, breakpointObserver: BreakpointObserver, 
    public translate: TranslateService, private route:ActivatedRoute,
    private api: ApiService, private _snackBar: MatSnackBar, private router: Router) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));

    translate.use(localStorage.getItem('language') ? localStorage.getItem('language')! : 'de');
    console.log(this.translate.currentLang)
    translate.addLangs(['de', 'en', 'fr']);
    this.connectedUser = route.snapshot.paramMap.get('id')!

    this.api.getClerks().subscribe(data => {
       this.dbClerks = data;
     })
  }

  changeLanguage(lang) {
    localStorage.setItem('language', lang)
    console.log(lang)
    this.translate.setDefaultLang(lang);
    this.translate.use(lang)
  }

  dateToYMD(date: Date) {
    let d = date.getDate();
    let m = date.getMonth() + 1;
    let y = date.getFullYear();
    return '' + y + '-' + (m<=9 ? '0'+m : m) + '-' + (d<=9 ? '0'+d : d)
  }

  onAppointmentCommit() //onRegister() copied
  {
    console.log("in onAppointmentCommit() gelandet")
    let shortDate = this.dateToYMD(new Date(this.firstFormGroup.controls.dateCtrl.value!))
    
    console.log(shortDate)

    let obj ='{'+
      '"userID": "' + this.connectedUser + 
      '", "clerkID": "' + this.currentClerk +
      '", "disponibilityID": "'+ this.currentTime  +'"}';
    console.log(obj)
    this.api.setAppointment(obj).subscribe({
    
      next:(res)=>{
        if(res)
        {
          if(res != null && res != undefined){
            console.log("1234"+res);
            this.router.navigate(['/home', this.connectedUser]);
          }else{
            this.openSnackBarError("");
          }
        }
      else{
        this.openSnackBarError("");
      }
    },
    error:(error)=>{
      console.log(error);
      this.openSnackBarError(error)
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

    this.api.getTimes(this.currentClerk).subscribe(data => {
      this.dbTimes = data;
      console.log(this.dbTimes)
    })
  }

  setCurrentDate(myDate){
    this.currentDate = myDate
    const shortDate = new Date(this.currentDate)
    this.currentDate = this.dateToYMD(shortDate);
    console.log(this.currentDate)
    this.times=[]
    this.dbTimes.forEach(element => {
      if(element.disponibilityDate == this.currentDate){
        this.times.push({value: element.id, timeValue:element.start_time})
      }
      console.log(this.times)
    });
    
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
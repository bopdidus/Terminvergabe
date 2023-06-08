import { BreakpointObserver, Breakpoints, MediaMatcher } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import {Validators, FormGroup, FormControl} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent{
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  hide = true;

  firstFormGroup = new FormGroup({
    firstCtrl: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastCtrl: new FormControl('', [Validators.required, Validators.minLength(2)]),
    birthCtrl: new FormControl('', [Validators.required]),
  });
  secondFormGroup = new FormGroup({
    emailCtrl: new FormControl('', [Validators.required, Validators.pattern("^[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}$")]),
    phoneCtrl: new FormControl('', [Validators.pattern("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$")]),
    passwordCtrl : new FormControl('', [Validators.required, Validators.minLength(8)]),
    confPasswordCtrl : new FormControl('', [Validators.required ])
  });

  thirdFormGroup = new FormGroup({
    streetCtrl: new FormControl('', Validators.required),
     cityCtrl: new FormControl('', Validators.required),
     postalCtrl: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
  })

  constructor(public translate: TranslateService, private api:ApiService,
    changeDetectorRef: ChangeDetectorRef, 
    media: MediaMatcher, 
    private router: Router,
    private _snackBar: MatSnackBar,
    private breakpointObserver:BreakpointObserver) 
    {      
    this.translate.use(sessionStorage.getItem('language') ? sessionStorage.getItem('language')! : 'de');
    console.log(this.translate.currentLang)
    sessionStorage.setItem('language', translate.currentLang)
    this.translate.addLangs(['de', 'en', 'fr']);
    this.mobileQuery = media.matchMedia('(max-width: 480px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  // ngAfterViewInit(): void {    
  //   this.translate.use(sessionStorage.getItem('language') ? sessionStorage.getItem('language')! : 'de');
  //   console.log(this.translate.currentLang)
  //   this.translate.addLangs(['de', 'en', 'fr']);
  // }

  PasswordMatch(fielControl: FormControl)
  {  
    return fielControl.value === this.secondFormGroup.controls.passwordCtrl.value? null:{ matching : true}
  }

  changeLanguage(lang)
  {
    sessionStorage.setItem('language', lang)
    this.translate.setDefaultLang(lang);
    this.translate.use(lang)
  }

  onRegister()
  {
    let obj ='{'+
      '"lastName": "'+ this.firstFormGroup.controls.lastCtrl.value+
      '", "firstName": "'+ this.firstFormGroup.controls.firstCtrl.value+
      '", "email": "'+ this.secondFormGroup.controls.emailCtrl.value+
      '", "birthdate": "'+ this.firstFormGroup.controls.birthCtrl.value+
      '", "password": "'+ this.secondFormGroup.controls.confPasswordCtrl.value+
      '", "street": "'+ this.thirdFormGroup.controls.streetCtrl.value?.toLowerCase() +
      '", "city": "'+ this.thirdFormGroup.controls.cityCtrl.value?.toLowerCase() +
      '", "postal": "'+ this.thirdFormGroup.controls.postalCtrl.value +
    '"';
    if(this.secondFormGroup.controls.phoneCtrl.value != "" && 
    this.secondFormGroup.controls.phoneCtrl.value != undefined &&
    this.secondFormGroup.controls.phoneCtrl.value != null)
    {
        obj = obj + ', "phoneNumber": "'+ this.secondFormGroup.controls.phoneCtrl.value+'"}'
    }
    else{
      obj = obj + '}'
    }
    this.api.register(obj).subscribe({
    
      next:(res)=>{
        if(res)
        {
          if(res != null && res != undefined){
            console.log(res);
            this.router.navigate(['/login']);
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

  openSnackBarError(error:any) {
    
    this._snackBar.open(this.translate.instant("ON_REGISTER_ERROR")+ " "+error,  "Close",{
      duration: 5 * 1000,
      verticalPosition:'top',
      panelClass:['panel-danger']
    });
  }

}

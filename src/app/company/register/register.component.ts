import { Component } from '@angular/core';
import {Validators, FormGroup, FormControl} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  hide = true;

  firstFormGroup = new FormGroup({
    nameCtrl: new FormControl('', [Validators.required, Validators.minLength(2)])
   
  });
  secondFormGroup = new FormGroup({
    emailCtrl: new FormControl('', [Validators.required, Validators.pattern("^[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}$")]),
    phoneCtrl: new FormControl('', [Validators.pattern("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$")]),
    passwordCtrl : new FormControl('', [Validators.required, Validators.minLength(8)]),
    confPasswordCtrl : new FormControl('', [Validators.required ])
  });

  thirdFormGroup = new FormGroup({
     addCtrl: new FormControl('', Validators.required),
     cityCtrl: new FormControl('', Validators.required),
     postalCtrl: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
  })

  constructor(public translate: TranslateService, private router: Router,
    private _snackBar: MatSnackBar,
    private api:ApiService) {
    translate.addLangs(['en', 'fr', 'de']);
    translate.use(localStorage.getItem('language')?localStorage.getItem('language')!:'en');
  }

  PasswordMatch(fielControl: FormControl)
  {  
    return fielControl.value === this.secondFormGroup.controls.passwordCtrl.value? null:{ matching : true}
  }

  changeLanguage(lang)
  {
    localStorage.setItem('language', lang)
    this.translate.setDefaultLang(lang);
    this.translate.use(lang)
   
  }

  onRegister()
  {
    const obj ='{'+
      '"name": "'+ this.firstFormGroup.controls.nameCtrl.value+
      '", "email": "'+ this.secondFormGroup.controls.emailCtrl.value+
      '", "phoneNumber": "'+ this.secondFormGroup.controls.phoneCtrl.value+
      '", "password": "'+ this.secondFormGroup.controls.confPasswordCtrl.value+
      '", "street": "'+ this.thirdFormGroup.controls.addCtrl.value +
      '", "city": "'+ this.thirdFormGroup.controls.cityCtrl.value +
      '", "postal": "'+ this.thirdFormGroup.controls.postalCtrl.value +
    '"}'
    this.api.register(obj).subscribe({
      next:(res)=>{
      if(res != null && res != undefined){
        console.log(res);
        this.router.navigate(['/login']);
      }else{
        this.openSnackBarError("");
      }
    },
    error:(error)=>{
      console.log(error);
      this.openSnackBarError(error)
    }})
  }

  openSnackBarError(error:any) {
    
    this._snackBar.open(this.translate.instant("")+ " "+error,  "Close",{
      duration: 5 * 1000,
      panelClass:['panel-danger']
    });
  }

}

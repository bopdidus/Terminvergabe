import { Component } from '@angular/core';
import { Validators, FormControl, FormGroup} from '@angular/forms';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import { ApiService } from '../user/services/api.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingService } from '../shared/services/loading.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
hide = true;
connectedUser:string
loginForm = new FormGroup({
  emailCtrl: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$") ]),
  passwordCtrl: new FormControl ('', [Validators.required, Validators.minLength(8)])
})

  showLoader$= this.loaderService.loadingAction$;

 constructor(public translate: TranslateService, 
  private router: Router,
  private _snackBar: MatSnackBar,
  private loaderService:LoadingService,
  private api:ApiService) {
  this.translate.use(sessionStorage.getItem('language') ? sessionStorage.getItem('language')! : 'de');
  console.log(this.translate.currentLang)
  sessionStorage.setItem('language', translate.currentLang)
  this.translate.addLangs(['de', 'en', 'fr']);
 
 }

    SignIn(loginform)
    {
      this.loaderService.showLoader()
      this.api.login(loginform.get('emailCtrl').value, loginform.get('passwordCtrl').value).subscribe({
        next:(res:any)=>{
          if(res)
          {
            if(res == null && res == undefined){
              this.openSnackBarError("");
            }
            else{
              this.connectedUser = res.result.id
              sessionStorage.setItem("token", res.token)
            }
          }
          
        },
        error:(e)=>{
          this.loaderService.hideLoader()
            this.openSnackBarError(e)
        },
        complete:()=>{
          this.loaderService.hideLoader()
            this.router.navigate(['user/home', this.connectedUser])
        }
      })
    }
    changeLanguage(lang)
    {
      sessionStorage.setItem('language', lang)
      console.log(lang)
      this.translate.setDefaultLang(lang);
      this.translate.use(lang)
    }

    openSnackBarError(error:any) {
    
      this._snackBar.open(this.translate.instant("ON_REGISTER_ERROR")+ " "+error,  "Close",{
        duration: 5 * 1000,
        panelClass:['panel-danger']
      });
    }
}

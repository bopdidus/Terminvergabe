import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { TranslateService } from '@ngx-translate/core';
import { th } from 'date-fns/locale';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Terminator';
 
  constructor(  public translate: TranslateService, private swPush: SwPush){
    this.translate.use(sessionStorage.getItem('language') ? sessionStorage.getItem('language')! : 'de');
    console.log(this.translate.currentLang)
    sessionStorage.setItem('language', translate.currentLang)
  }
  ngOnInit(): void {
    if(!this.swPush.isEnabled){
      console.log("Push notification is not enabled")
    }
    this.swPush.requestSubscription({
      serverPublicKey:""
    }).then((_)=>{
      console.log(JSON.stringify(_))
    }).catch((_)=> console.log)
  }


  
}

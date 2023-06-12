import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { TranslateService } from '@ngx-translate/core';
import { th } from 'date-fns/locale';
import { PwaService } from './shared/services/pwa.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Terminator';
 
  constructor( public translate: TranslateService, private swPush: SwPush, private pwaService:PwaService){
    this.translate.use(sessionStorage.getItem('language') ? sessionStorage.getItem('language')! : 'de');
    console.log(this.translate.currentLang)
    sessionStorage.setItem('language', translate.currentLang)
  }
  ngOnInit(): void {
    this.pwaService.initPwaPrompt()
    if(!this.swPush.isEnabled){
      console.log("Push notification is not enabled")
    }
    this.swPush.requestSubscription({
      serverPublicKey:"BNRZXSL0OZFc5T9DthkZlgabti3kEkZEVHz4QcMIAgYPKd_7Y4sAK9Hw1mu2fbvEpQr8WDcYvu6DVFxtJ1fV2MI"
    }).then((_)=>{
      console.log(JSON.stringify(_))
    }).catch((_)=> console.log)
  }


  
}

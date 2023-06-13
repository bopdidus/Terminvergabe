import { ChangeDetectorRef, Component, ElementRef, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
import {  BreakpointObserver, Breakpoints, MediaMatcher } from '@angular/cdk/layout';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent implements OnInit {
  mobileQuery: MediaQueryList;
  view:string;
  private _mobileQueryListener: () => void;
  divCol1;
  divCol2
  hide = true;
  constructor(public translate: TranslateService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, 
    private route:ActivatedRoute,
    private router: Router,
    private breakpointObserver:BreakpointObserver) {
    translate.use(localStorage.getItem('language') ? localStorage.getItem('language')! : 'de');
    console.log(this.translate.currentLang)
    translate.addLangs(['de', 'en', 'fr']);
    this.mobileQuery = media.matchMedia('(max-width: 480px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.view ="home";
    
  }

  changeLanguage(lang) {
    localStorage.setItem('language', lang)
    console.log(lang)
    this.translate.setDefaultLang(lang);
    this.translate.use(lang)
  }

  ngOnInit(): void {
    this.divCol1 = document.querySelector("#divCol1");
    this.divCol2 = document.querySelector("#divCol2")
  }
  
  navigateToAppointmentForm()
  {
    const id = this.route.snapshot.paramMap.get('id')
    this.router.navigate(['/user/appointment-form', id])
  }

  navigateToAppointmentList()
  {
    const id = this.route.snapshot.paramMap.get('id')
    this.router.navigate(['/user/appointment-list', id])
  }

}

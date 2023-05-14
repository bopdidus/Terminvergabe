import { ChangeDetectorRef, Component, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import {  BreakpointObserver, Breakpoints, MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
   btnMenu;
   
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private breakpointObserver:BreakpointObserver)
  {
    this.mobileQuery = media.matchMedia('(max-width: 480px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    
  }

 ngOnInit(): void {
  this.btnMenu = document.querySelector('#btnMenu')
 }

 ngAfterViewInit(): void {
  this.btnMenu?.classList.add('invisible')
  this.breakpointObserver.observe([
    Breakpoints.XSmall,
    Breakpoints.HandsetPortrait
  ]).subscribe(result => {
    if (result.matches) {
      console.log("enter")
      this.btnMenu?.classList.remove('invisible')
     this.btnMenu?.classList.add('visible')
    }
    else{
      console.log("not match")
      this.btnMenu?.classList.add('invisible')
      this.btnMenu?.classList.remove('visible')
    }
  });
 }

}

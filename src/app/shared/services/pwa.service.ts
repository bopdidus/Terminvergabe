import { Platform } from '@angular/cdk/platform';
import { Injectable } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { take, timer } from 'rxjs';
import { PwaPromptComponent } from '../components/pwa-prompt/pwa-prompt.component';

@Injectable({
  providedIn: 'root'
})
export class PwaService {
  promptPwaEvent: any;
  constructor(private bottomSheet: MatBottomSheet,
    private platform: Platform) { }

    public initPwaPrompt() {
      window.addEventListener('beforeinstallprompt', (event: any) => {
        event.preventDefault();
        console.log("occured")
        this.openPromptComponent('android');
      });
      if (this.platform.ANDROID) {
        window.addEventListener('beforeinstallprompt', (event: any) => {
          event.preventDefault();
          console.log("occured")
          this.openPromptComponent('android');
        });
      }
      if (this.platform.IOS) {
        const isInStandaloneMode = ('standalone' in window.navigator) && (window.navigator['standalone']);
        if (!isInStandaloneMode) {
          this.openPromptComponent('ios');
        }
      }
    }
  
    private openPromptComponent(mobileType: 'ios' | 'android') {
      timer(3000)
        .pipe(take(1))
        .subscribe(() => this.bottomSheet.open(PwaPromptComponent, { data: { mobileType, promptEvent: this.promptPwaEvent } }));
    }

}

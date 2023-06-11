import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { PwaPromptComponent } from './components/pwa-prompt/pwa-prompt.component';

@NgModule({
  declarations: [
    LoaderComponent,
    PwaPromptComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatBottomSheetModule,
    MatToolbarModule,
    MatIconModule
  ],
  exports:[LoaderComponent]
})
export class SharedModule { }

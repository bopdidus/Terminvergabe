import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    LoaderComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatCardModule
  ],
  exports:[LoaderComponent]
})
export class SharedModule { }

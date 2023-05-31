import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatGridListModule} from '@angular/material/grid-list';

import { CompanyRoutingModule } from './company-routing.module';
import { CalendarOverviewComponent } from './calendar-overview/calendar-overview.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}



@NgModule({
  declarations: [
    CalendarOverviewComponent,
    RegisterComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatStepperModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    TranslateModule,
    HttpClientModule,
    MatGridListModule
    ],
    providers:[
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ]
})
export class CompanyModule { }

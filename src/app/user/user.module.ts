import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateModule, TranslateLoader, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClientModule, HttpClient, HttpBackend} from '@angular/common/http';
import { UserRoutingModule } from './user-routing.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { NgFor } from '@angular/common';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatOptionModule } from '@angular/material/core';
//--------------------------MODULE(END)---------------------------

//-------------------------COMPONENT(START)-------------------------
import {ProfileComponent} from './profile/profile.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';
import { RegisterComponent } from './register/register.component';
import { FloatingButtonComponent } from './floating-button/floating-button.component';
import { SharedModule } from '../shared/shared.module';
//------------------------COMPONENT(END)------------------------------

export function createTranslateLoader(http: HttpBackend) {
  return new TranslateHttpLoader(new HttpClient(http), './assets/i18n/', '.json');
  
}



@NgModule({
  declarations: [
    ProfileComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardComponent,
    RegisterComponent,
    HomeScreenComponent,
    AppointmentListComponent,
    AppointmentFormComponent,
    FloatingButtonComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule,
    MatFormFieldModule,
    TranslateModule.forRoot({
      defaultLanguage: 'de',
      loader: {
        provide: TranslateLoader,
                deps: [HttpBackend],
                useFactory: createTranslateLoader
    }
    }),
    HttpClientModule,
    MatChipsModule,
    MatButtonModule,
    MatStepperModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    MatTooltipModule,
    MatBadgeModule,
    MatTableModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatDividerModule,
    MatOptionModule,
    MatSelectModule,
    MatSnackBarModule,
    NgFor
    ],
    providers:[ TranslateService]
})
export class UserModule { 
  constructor()
  {
  }
}

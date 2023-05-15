import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClientModule, HttpClient} from '@angular/common/http';
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
import { LoginComponent } from './login/login.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
//------------------------COMPONENT(END)------------------------------

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}



@NgModule({
  declarations: [
    ProfileComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardComponent,
    RegisterComponent,
    LoginComponent,
    HomeScreenComponent,
    AppointmentListComponent,
    AppointmentFormComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatFormFieldModule,
    TranslateModule,
    HttpClientModule,
    MatChipsModule,
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
    MatDividerModule
    ]
})
export class UserModule { }

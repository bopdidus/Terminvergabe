import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import {CompanyModule} from './company/company.module';

const routes: Routes = [
  {path:'home', component:HomeScreenComponent},
  {path: 'appointment-list', component: AppointmentListComponent},
  {path: 'appointment-form', component: AppointmentFormComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {path: '', loadChildren: () => import('./company/company.module').then(m => m.CompanyModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

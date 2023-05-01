import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: 'home-screen', component: HomeScreenComponent},
  {path: 'appointment-list', component: AppointmentListComponent},
  {path: 'appointment-form', component: AppointmentFormComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

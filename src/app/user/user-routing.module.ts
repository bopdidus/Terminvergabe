import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { HeaderComponent } from './header/header.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserGuard } from '../guards/user.guard';

const routes: Routes = [
  { path: 'home', component: HomeScreenComponent },
  { path: 'appointment-list', component: AppointmentListComponent/*, canActivate:[UserGuard]*/ },
  { path: 'appointment-form', component: AppointmentFormComponent/*, canActivate:[UserGuard]*/  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate:[UserGuard]  },
  { path: 'user', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

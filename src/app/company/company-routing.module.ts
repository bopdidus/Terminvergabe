import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarOverviewComponent } from './calendar-overview/calendar-overview.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';

const routes: Routes = [
  {path:"company", component: HeaderComponent,
  children:[
    {path:"calendar-overview", component: CalendarOverviewComponent}
  ]
},
  {path:"register", component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }

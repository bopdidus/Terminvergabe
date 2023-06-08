import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
    {path:'login', component:LoginComponent },
    { path: '',   redirectTo: '/login', pathMatch: 'full' },
  {path: 'company', loadChildren: () => import('./company/company.module').then(m => m.CompanyModule)},
  {path: 'user', loadChildren: () => import('./user/user.module').then(u => u.UserModule)},
  {path: 'admin', loadChildren: () => import('./admin/admin.module').then(a => a.AdminModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

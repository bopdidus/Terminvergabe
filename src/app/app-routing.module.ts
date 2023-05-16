import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
    /*{path:'**', component:PageNotFoundComponent },*/
    { path: '',   redirectTo: '/user/login', pathMatch: 'full' },
  {path: 'company', loadChildren: () => import('./company/company.module').then(m => m.CompanyModule)},
  {path: 'user', loadChildren: () => import('./user/user.module').then(u => u.UserModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

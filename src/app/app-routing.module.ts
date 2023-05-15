import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyModule } from './company/company.module';

const routes: Routes = [

  {path: 'company', loadChildren: () => import('./company/company.module').then(m => m.CompanyModule)},
  {path: 'user', loadChildren: () => import('./user/user.module').then(u => u.UserModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

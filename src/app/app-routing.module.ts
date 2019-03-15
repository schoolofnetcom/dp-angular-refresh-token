import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuardService} from './auth-guard.service';
import {Page1Component} from './page1/page1.component';
import {Page2Component} from './page2/page2.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'page1', component: Page1Component, canActivate: [AuthGuardService]},
  {path: 'page2', component: Page2Component, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuardService]
})
export class AppRoutingModule { }

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ManageComponent } from './manage/manage.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { MainComponent } from './main/main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: 'app',
  component: MainComponent,
  children: [
    { path: 'manage', component: ManageComponent, canActivate: [AuthGuard] }
  ]
},
{ path: 'login', component: LoginComponent },
{ path: '', redirectTo: 'app', pathMatch: 'full' },
{ path: '**', component: PageNotFoundComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

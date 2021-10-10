import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { GuardGuard } from './guard.guard';
import { LoginComponent } from './login/login.component';
import { Role } from './model';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: '', component: ContentComponent, pathMatch: 'full' },
  { path: 'admin', component: UserComponent, canActivate: [GuardGuard], data: { roles: [Role.Admin] } },
  { path: 'login', component: LoginComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

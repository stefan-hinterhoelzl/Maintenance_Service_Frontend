import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './services/AuthGuard';
import { StartComponent } from './start/start.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';

const routes: Routes = [
  {
  path: '', pathMatch: 'full', redirectTo: 'app',
  },

  {
    path: 'login',
    component: LoginPageComponent,
  },

  {
    path: 'register',
    component: RegisterComponent,
  },

  {
    path: 'app',
    component: StartComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'addticket',
    component: CreateTicketComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'viewtickets',
    component: TicketListComponent,
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}


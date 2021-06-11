import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { StartComponent } from './start/start.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';

const routes: Routes = [
  {
  path: '', pathMatch: 'full', redirectTo: 'app',
  },

  {
    path: 'app',
    component: StartComponent
  },

  {
    path: 'addticket',
    component: CreateTicketComponent
  },

  {
    path: 'viewtickets',
    component: TicketListComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}


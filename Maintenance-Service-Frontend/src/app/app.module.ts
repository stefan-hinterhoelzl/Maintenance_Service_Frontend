import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartComponent } from './start/start.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { EditTicketDialogComponent } from './edit-ticket-dialog/edit-ticket-dialog.component';
import { AlertComponent } from './alert/alert.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ClockComponent } from './clock/clock.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteTicketDialogComponent } from './delete-ticket-dialog/delete-ticket-dialog.component';
import { DetailsTicketDialogComponent } from './details-ticket-dialog/details-ticket-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    CreateTicketComponent,
    TicketListComponent,
    EditTicketDialogComponent,
    DeleteTicketDialogComponent,
    DetailsTicketDialogComponent,
    AlertComponent,
    ClockComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

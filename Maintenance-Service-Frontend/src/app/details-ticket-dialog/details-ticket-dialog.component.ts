import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ticket } from '../model/ticket';

@Component({
  selector: 'app-details-ticket-dialog',
  templateUrl: './details-ticket-dialog.component.html',
  styleUrls: ['./details-ticket-dialog.component.css']
})
export class DetailsTicketDialogComponent implements OnInit {


  currTicket: Ticket;

  constructor(private dialogRef: MatDialogRef<DetailsTicketDialogComponent>, @Inject(MAT_DIALOG_DATA) data, private _ngZone: NgZone) { 
    this.currTicket = data;
  }
  ngOnInit(): void {
  }


  close() {
    this.dialogRef.close();
  }

  
}

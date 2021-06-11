import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-ticket-dialog',
  templateUrl: './delete-ticket-dialog.component.html',
  styleUrls: ['./delete-ticket-dialog.component.css']
})
export class DeleteTicketDialogComponent implements OnInit {

  ticketid: number;

  constructor(private dialogRef: MatDialogRef<DeleteTicketDialogComponent>, @Inject(MAT_DIALOG_DATA) data) {
      this.ticketid = data.id;
   }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  delete() {
    this.dialogRef.close(true);
  }

}

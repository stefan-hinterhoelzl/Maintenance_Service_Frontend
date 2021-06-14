import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrls: ['./delete-user-dialog.component.css']
})
export class DeleteUserDialogComponent implements OnInit {

  user: string

  constructor(private dialogRef: MatDialogRef<DeleteUserDialogComponent>, @Inject(MAT_DIALOG_DATA) data) {
      this.user = data.email;
      console.log(this.user);
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

import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, Inject, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { Ticket } from '../model/model';
import { Room } from '../model/room';
import { ApiService } from '../services/api-service';

@Component({
  selector: 'app-edit-ticket-dialog',
  templateUrl: './edit-ticket-dialog.component.html',
  styleUrls: ['./edit-ticket-dialog.component.css']
})
export class EditTicketDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<EditTicketDialogComponent>, @Inject(MAT_DIALOG_DATA) data, private _ngZone: NgZone, private fb: FormBuilder, private api: ApiService) { 
    this.currTicket = data;

    this.title = new FormControl(this.currTicket.title, [Validators.required]);
    this.descr = new FormControl(this.currTicket.description);
    this.room = new FormControl(this.currTicket.room, [Validators.required]);
    this.priority = new FormControl(this.currTicket.priority);
    this.selectedRoom = this.currTicket.room;

    this.form = this.fb.group({
      title: this.title,
      descr: this.descr,
      room: this.room,
      priority: this.priority,
    });

    this.form.patchValue({room:this.currTicket.room})

  }

  form: FormGroup;
  title: FormControl;
  descr: FormControl;
  room: FormControl;
  priority: FormControl;
  currTicket: Ticket;
  selectedRoom: Room;


  res: any;
  rooms: Room[];

  priorities: string[] =  ["LOW", "MEDIUM", "HIGH"];

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  async ngOnInit() {
    this.res = await this.api.getAllRooms();
    this.rooms = this.res._embedded.roomList;

  }


  triggerResize() {
    this._ngZone.onStable.pipe(take(1))
        .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    const data = <Ticket> {
      id: this.currTicket.id,
      title: this.title.value,
      description: this.descr.value,
      room: this.room.value,
      priority: this.priority.value,
      createdTimeInSeconds: this.currTicket.createdTimeInSeconds,
      resolved: this.currTicket.resolved,
      resolvedTimeInSeconds: this.currTicket.resolvedTimeInSeconds,
    }
    this.dialogRef.close(data);
  }

  getErrorMessage() {
    if (this.title.hasError('required') || this.room.hasError('required')) {
      return "Feld darf nicht leer sein"
    }

  }

}


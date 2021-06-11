import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Room } from '../model/room';
import { ApiService } from '../services/api-service';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css']
})
export class CreateTicketComponent implements OnInit {

  res: any;
  rooms: Room[];

  form: FormGroup;
  title: FormControl;
  descr: FormControl;
  room: FormControl;
  priority: FormControl;

  priorities: string[] =  ["LOW", "MEDIUM", "HIGH"];

  @ViewChild('autosize') autosize: CdkTextareaAutosize;


  constructor(private api: ApiService, private fb: FormBuilder,  private _ngZone: NgZone) { 
    this.title = new FormControl('', [Validators.required]);
    this.descr = new FormControl('');
    this.room = new FormControl('', [Validators.required]);
    this.priority = new FormControl('');

    this.form = this.fb.group({
      title: this.title,
      descr: this.descr,
      room: this.room,
      priority: this.priority,
    });
  }


  async ngOnInit() {
    this.res = await this.api.getAllRooms();
    this.rooms = this.res._embedded.roomList;
  }

  triggerResize() {
    this._ngZone.onStable.pipe(take(1))
        .subscribe(() => this.autosize.resizeToFitContent(true));
  }



  getErrorMessage() {
    if (this.title.hasError('required') || this.room.hasError('required')) {
      return "Nicht alle Pflichtfelder wurden ausgefüllt"
    }
  }


  async addTicket() {
   
  }


}

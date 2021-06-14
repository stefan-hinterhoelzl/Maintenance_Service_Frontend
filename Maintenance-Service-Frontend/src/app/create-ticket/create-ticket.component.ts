import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Ticket } from '../model/ticket';
import { Room } from '../model/room';
import { ApiService } from '../services/api-service';
import {formatDate} from '@angular/common';
import { AlertService } from '../services/alertService';
import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY } from '@angular/cdk/overlay/overlay-directives';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css']
})
export class CreateTicketComponent implements OnInit {

  res: any;
  rooms: Room[] = [];
  
  form: FormGroup;
  title: FormControl;
  descr: FormControl;
  room: FormControl;
  priority: FormControl;

  priorities: string[] =  ["LOW", "MEDIUM", "HIGH"];

  @ViewChild('autosize') autosize: CdkTextareaAutosize;


  constructor(private api: ApiService, private fb: FormBuilder,  private _ngZone: NgZone, private alert: AlertService) { 
    this.title = new FormControl('', [Validators.required]);
    this.descr = new FormControl('');
    this.room = new FormControl('', [Validators.required]);
    this.priority = new FormControl('LOW');

    this.form = this.fb.group({
      title: this.title,
      descr: this.descr,
      room: this.room,
      priority: this.priority,
    });
  }


  async ngOnInit() {
    let res = await this.api.getAllRoomsFirestore();
    res.forEach((doc) => {
      this.rooms.push(doc.data());
    });
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
   const ticket =  <Ticket> {
     title: this.title.value,
     description: this.descr.value,
     room: this.room.value,
     priority: this.priority.value,
     createdTimeInSeconds: Date.now(),
     resolved: false,
     resolvedTimeInSeconds: null
   }

    console.log(ticket);
    let res = await this.api.saveTicketFirestore(ticket);
  
   
   console.log(res);
   this.alert.success("Ticket wurde angelegt!");
   this.form.reset();
   this.priority.setValue("LOW");
  }
}

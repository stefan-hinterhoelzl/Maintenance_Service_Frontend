import { Component, OnInit } from '@angular/core';
import { Room } from '../model/room';
import { ApiService } from '../services/api-service';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css']
})
export class CreateTicketComponent implements OnInit {

  constructor(private api: ApiService) { }

  res: any;
  rooms: Room[];

  async ngOnInit() {
    this.res = await this.api.getAllRooms();
    this.rooms = this.res._embedded.roomList;
  }

}

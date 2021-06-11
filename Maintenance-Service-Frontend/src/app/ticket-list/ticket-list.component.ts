import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Priority, Ticket } from '../model/model';
import { AlertService } from '../services/alertService';
import { ApiService } from '../services/api-service';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {

  displayedColumns: string[] = ['id','roomNr', 'title', 'priority', 'status', 'roomStatus', 'edit'];
  dataSource: any;

  result: any;
  tickets: Ticket[] = [];
  constructor(private api: ApiService, private alert: AlertService) { }
  

  async ngOnInit(){

    this.result = await this.api.getAllTickets().catch( error => {
      this.alert.error("Tickets not accessable" + error)
    })

    if(this.result._embedded != null){
      this.tickets = this.result._embedded.ticketList
    }  

    this.dataSource = new MatTableDataSource(this.tickets);
  }

  

}

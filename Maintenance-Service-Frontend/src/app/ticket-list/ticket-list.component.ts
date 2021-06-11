import { Component, OnInit } from '@angular/core';
import { Priority, Ticket } from '../model/model';
import { AlertService } from '../services/alertService';
import { ApiService } from '../services/api-service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {

  result: any;
  tickets: Ticket[] = [];
  constructor(private api: ApiService, private alert: AlertService) { }

  async ngOnInit(){
    this.result = await this.api.getAllTickets().catch( () => {
      this.alert.error("Tickets not accessable")
    })

    if(this.result._embedded != null){
      this.tickets = this.result._embedded.ticketList
    }
   

  }

  sortList(parameter: string){
    let copiedList = []
    this.tickets.forEach(val => copiedList.push(Object.assign({}, val)));

    if(parameter == "id"){
      this.tickets.sort((a,b) => a.id - b.id)
    }

    if(parameter == "title"){
      this.tickets.sort((a,b) => {
        if(a.title < b.title) { return -1; }
        if(a.title > b.title) { return 1; }
        return 0;
      })
    }

    if(parameter == "priority"){
      const priorityOrder = Object.values(Priority);
      this.tickets.sort((a,b) => {
       return priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority)
      })
    }




    let arraysAreUnchange: boolean = true
    let i = 0;
    this.tickets.forEach(ticket => {
      if(ticket != copiedList[i]){
        arraysAreUnchange = false
      }
      i++;
    })
    console.log(arraysAreUnchange)
  }

}

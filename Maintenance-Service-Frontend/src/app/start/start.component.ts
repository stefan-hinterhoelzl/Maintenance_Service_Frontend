import { CompileShallowModuleMetadata } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { Room } from '../model/room';
import { AlertService } from '../services/alertService';
import { ApiService } from '../services/api-service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  totalAmountOfTickets:number;
  openTickets: any;
  closedTickets: number;
  result: any;
  // weatherdata;

  constructor(private alert: AlertService, private api: ApiService) { }
  
  async ngOnInit(){

    this.result = await this.api.getAllTickets().catch( () => {
      this.alert.error("Tickets not accessable")
    })

    this.result = this.result._embedded.ticketList
    this.totalAmountOfTickets = this.result.length

    this.openTickets = this.result.filter( ticket => {    
      return ticket.resolved == false
    }).length

    this.closedTickets = this.result.filter( ticket => {    
      return ticket.resolved == true
    }).length
  
    // weather
    // this.weatherdata = await this.api.getWeather()

  }




}

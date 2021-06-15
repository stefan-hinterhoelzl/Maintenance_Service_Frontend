import { CompileShallowModuleMetadata } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { Room } from '../model/room';
import { Ticket } from '../model/ticket';
import { AlertService } from '../services/alertService';
import { ApiService } from '../services/api-service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  totalAmountOfTickets:number = 0;
  openTickets: number = 0;
  closedTickets: number = 0;
  result: Ticket[]= [];
  weatherdata;
  temperatur: number;
  weather: string;

  constructor(private alert: AlertService, private api: ApiService) { }
  
  async ngOnInit(){

    // get all tickets from backend
    let res = await this.api.getAllTicketsFirestore();
    res.forEach((doc) => {
      let curr: Ticket = {...doc.data()};
      curr.id = doc.id;
      this.result.push(curr);
    });

    // count all tickets
    this.totalAmountOfTickets = this.result.length

    // count open tickets
    this.openTickets = this.result.filter( ticket => {    
      return ticket.resolved == false
    }).length

    // count closed tickets
    this.closedTickets = this.result.filter( ticket => {    
      return ticket.resolved == true
    }).length
    
    // get weather
    this.weatherdata = await this.api.getWeather()
    this.temperatur = Math.round(this.weatherdata.current.temp)
    this.weather = this.weatherdata.current.weather[0].description
    
  }




}

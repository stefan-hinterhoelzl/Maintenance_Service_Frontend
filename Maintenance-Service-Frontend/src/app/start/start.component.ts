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

  constructor(private alert: AlertService, private api: ApiService) { }
  
  async ngOnInit(){

   

  }




}

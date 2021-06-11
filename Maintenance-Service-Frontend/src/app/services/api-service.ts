import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Ticket } from "../model/model";
import { Room } from "../model/room";

const BackendURL: String = "https://maintenance-spring.herokuapp.com/" 
const weatherApi: string = "https://api.openweathermap.org/data/2.5/onecall?lat=48.33&lon=14.31&exclude=minutely,hourly,daily,alerts&units=metric&lang=de&appid=82e6e7356b3e7f28514afc1cdd0723fe"
const httpOptions =  {
    headers: new HttpHeaders({
       'Content-Type': 'application/json'
    })
 };


@Injectable({ providedIn: 'root' })
export class ApiService
 {

    
    constructor(private http: HttpClient) {

    }

    getAllRooms(): Promise<any>{
        return this.http.get<any>(BackendURL+"room").toPromise();
    }

    getAllTickets(): Promise<any>{
        return this.http.get<any>(BackendURL+"ticket").toPromise();
    }

    saveTicket(data: Ticket): Promise<any> {
        return this.http.post<any>(BackendURL+"ticket", data, httpOptions).toPromise();
    }

    getWeather(): Promise<any>{
        return this.http.get<any>(weatherApi).toPromise();
    }

    updateTicket(data: Ticket): Promise<any> {
        return this.http.put<any>(BackendURL+"ticket/"+data.id, data, httpOptions).toPromise();
    }

    deleteTicket(data: number): Promise<any> {
        return this.http.delete<any>(BackendURL+"ticket/"+data).toPromise();
    }

    
 }
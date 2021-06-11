import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Ticket } from "../model/model";
import { Room } from "../model/room";

const BackendURL: String = "https://maintenance-spring.herokuapp.com/" 

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

    saveTicket(data: Ticket): Promise<any> {
        return this.http.post<any>(BackendURL+"ticket", data, httpOptions).toPromise();
    }


 }
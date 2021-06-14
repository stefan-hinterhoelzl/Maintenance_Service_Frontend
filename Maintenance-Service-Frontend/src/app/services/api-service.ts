import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Ticket } from "../model/ticket";
import { Room } from "../model/room";
import * as firebase from 'firebase';
import { query } from "@angular/animations";
import { AngularFirestore } from "@angular/fire/firestore";

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
    constructor(private http: HttpClient, private afs: AngularFirestore) {

    }

    getAllRoomsFirestore(): Promise<any> {
        return this.afs.collection("rooms").get().toPromise();
    }

    getAllTicketsFirestore(): Promise<any> {
        return this.afs.collection("tickets").get().toPromise();
    }

    saveTicketFirestore(data: Ticket): Promise<any> {
        return this.afs.collection("tickets").add({...data});
    }

    getWeather(): Promise<any>{
        return this.http.get<any>(weatherApi).toPromise();
    }

    updateTicketFirestore(data: Ticket): Promise<any> {
        return this.afs.collection("tickets").doc(data.id.toString()).set({...data});
    }

    deleteTicketFirestore(data: String): Promise<any> {
        return this.afs.collection("tickets").doc(data.toString()).delete();
    }

    
 }
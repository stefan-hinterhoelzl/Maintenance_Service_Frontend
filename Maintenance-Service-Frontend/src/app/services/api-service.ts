import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Room } from "../model/room";

const BackendURL: String = "https://maintenance-spring.herokuapp.com/" 

@Injectable({ providedIn: 'root' })
export class ApiService
 {

    constructor(private http: HttpClient) {

    }

    getAllRooms(): Promise<any>{
        return this.http.get<any>(BackendURL+"/room").toPromise();
    }



 }
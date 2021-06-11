import { Room } from "./room";

export interface Ticket{
    id: Number;
    title: String;
    descr: String;
    room: Room;
    prio: Priority;
   //image: string;
    date: Date;
    resolved: boolean;
    resolvedate: Date;
}

export enum Priority{
    LOW, MEDIUM, HIGH
}
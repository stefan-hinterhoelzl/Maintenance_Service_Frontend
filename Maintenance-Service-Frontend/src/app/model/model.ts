import { Room } from "./room";

export interface Ticket{
    id?: number;
    title: String;
    description: String;
    room: Room;
    priority: Priority;
    createdDate: number;
    resolved: boolean;
    resolvedate: Date;
}

export enum Priority{
    LOW, MEDIUM, HIGH
}
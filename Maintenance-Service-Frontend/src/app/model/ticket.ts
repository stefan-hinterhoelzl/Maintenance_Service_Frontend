import { Room } from "./room";

export interface Ticket{
    id?: String;
    title: String;
    description: String;
    room: Room;
    priority: Priority;
    createdTimeInSeconds: number;
    resolved: boolean;
    resolvedTimeInSeconds: number;
}

export enum Priority{
    LOW, MEDIUM, HIGH
}
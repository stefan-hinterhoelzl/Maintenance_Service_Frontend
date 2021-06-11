export interface Room{
    id: number;
    roomNr: String;
    desc: String;
    roomtype: RoomType;
    booked: boolean;
}

export enum RoomType{
    SINGLE, DOUBLE, SUITE
}

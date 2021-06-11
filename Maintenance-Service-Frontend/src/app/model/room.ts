export interface Room{
    id: number;
    roomNr: String;
    desc: String;
    roomType: RoomType;
    booked: boolean;
}

export enum RoomType{
    SINGLE, DOUBLE, SUITE
}

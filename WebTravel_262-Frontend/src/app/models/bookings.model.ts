export interface Booking {
    includes: any;
    _id: string;
    userID: string;
    destinationID: string;
    fullName: string;
    persons: number;
    startDate: string;
    endDate: string;
}
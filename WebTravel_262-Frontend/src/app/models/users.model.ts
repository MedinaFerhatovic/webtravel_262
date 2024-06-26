export interface User {
    includes: any;
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    role: string;
    status: boolean;
    bookedDestinations: string[]; 
}
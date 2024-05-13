export interface Destination {
    includes: any;
    _id: string;
    country: string;
    city: string;
    description: string;
    imageURL: string;
    review: number;
    categories: string[];
    comments: Comment[];
}

export interface Comment {
    _id: string; 
    user: {
      username: string;
    };
    message: string;
    date: Date;
}
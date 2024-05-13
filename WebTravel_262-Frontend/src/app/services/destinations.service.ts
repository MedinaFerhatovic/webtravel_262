import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Destination } from "../models/destinations.model";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable() export class DestinationService {
    constructor(private http: HttpClient){}

    uploadImage(image: File) {
        const formData = new FormData();
        formData.append('image', image);
        return this.http.post<{ imagePath: string }>(environment.API_URL + "/photo", formData);
    }

    create(city: string, country: string, description: string, review: number, image: string, categories: string[]){
        return this.http.post<Destination>(environment.API_URL + "/destinations",{
            city: city,
            country: country,
            description: description,
            review: review,
            imageURL: image,
            categories: categories
        })
    }
    
    getAll(){
        return this.http.get<Destination[]>(environment.API_URL + "/destinations");
    }

    getByID(id:string){
        return this.http.get<Destination[]>(environment.API_URL + "/destination/?id=" + id);
    }

    remove(id:string){
        return this.http.delete<Destination>(environment.API_URL + "/destination/?id=" + id)
    }

    update(id:string, City:string,Country:string, Description:string, Review:number){
        return this.http.put<Destination>(environment.API_URL + "/destination/?id="+ id, {
            city: City,
            country: Country,
            description: Description,
            review: Review
        })
    }

    getAllComments(): Observable<Comment[]> {
        return this.http.get<Comment[]>(`${environment.API_URL}/comments`);
    }

    getAllWithComments(): Observable<Destination[]> {
        return this.http.get<Destination[]>(`${environment.API_URL}/destinations?_embed=comments`);
    }
    addComment(destinationId: string, userId: string, username: string, message: string) {
        return this.http.post<any>('http://localhost:3000/destination/comment', {
            destinationId: destinationId,
            userId: userId,
            username: username, 
            message: message
        });
    }    
    deleteComment(destinationId: string, commentId: string): Observable<any> {
        return this.http.delete<any>(`${environment.API_URL}/destination/comment`, {
            body: { destinationId, commentId }
        });
    }
    getDestinationName(destinationId: string): Observable<string> {
        return this.http.get<Destination>(`${environment.API_URL}/destinations/${destinationId}`)
            .pipe(
                map(destination => destination.city + ', ' + destination.country)
            );
    }

}

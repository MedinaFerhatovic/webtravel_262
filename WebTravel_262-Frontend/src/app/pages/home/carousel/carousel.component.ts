import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/components/category/category.component';
import { Destination } from 'src/app/models/destinations.model';
import { User } from 'src/app/models/users.model';
import { DestinationService } from 'src/app/services/destinations.service';
import { environment } from 'src/environments/environment';
import { BookingService } from 'src/app/services/bookings.service';
import { U } from '@angular/cdk/keycodes';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})

export class CarouselComponent implements OnInit {
  BookingService: any;
  currentSlide = 0; 

  constructor(private destinationService : DestinationService, private router: Router, private bookingService: BookingService, private http: HttpClient){}

  allDestinations : Destination[] = [];
  filteredDestinations : Destination[] = [];
  selectedDestination: any; 
  newComment: string = '';
  showCommentForm = false;


  filter(categories: Category[]){

    this.filteredDestinations = this.allDestinations.filter(d => {
      return categories.every(c => {
        return d.categories.includes(c.name.toLowerCase())
      })
    })
    this.currentSlide = 0;
  }

  u?: User = undefined  
  ngOnInit(): void {
      this.destinationService.getAll().subscribe(destinations => {
        this.allDestinations = destinations;
        this.allDestinations.forEach(dest => {
          if (dest.imageURL) {
            dest.imageURL = environment.API_URL + "/" + dest.imageURL;
          }
        });
      });

    let localUser = localStorage.getItem("user");
    if(localUser != undefined){
      this.u = JSON.parse(localUser);
    }
  }

  BookingForm = new FormGroup({

    userID: new FormControl("", [Validators.required]),
    destID: new FormControl("", [Validators.required]),
    fullName: new FormControl("", [Validators.required]),
    persons: new FormControl("", [Validators.required]),
    startDate: new FormControl("", [Validators.required,Validators.minLength(5)]),
    endDate: new FormControl("", [Validators.required,Validators.minLength(5)])
  })

  bookUser = "default"
  startDate =""
  endDate =""
  isBooking = false;

  checkBooking(id:string){

    if(this.u != undefined){
      this.bookNow(id)
    }else{
      alert("Morate se prijaviti.")
    }
  }
  bookNow(id:string){

      if(this.u!=undefined){

        this.isBooking = true
  
        this.bookUser = this.u?._id;
        this.selectedDestination = this.allDestinations.find(dest => dest._id === id);
        this.BookingForm.setValue({
          userID: this.bookUser,
          destID: id,
          fullName: this.u?.firstName + ' ' + this.u?.lastName,
          persons: "",
          startDate: "",
          endDate: ""
        })
      }
  }

  bookNowBTN = false;
  createBooking(userID:string) {
    
    let destID = this.BookingForm.value.destID;
    let fullName = this.BookingForm.value.fullName;
    let persons = this.BookingForm.value.persons;
    let start = this.BookingForm.value.startDate;
    let end = this.BookingForm.value.endDate;

    if(start != "" && end != ""){
      this.bookNowBTN = true;
      this.bookingService.create(userID, destID, fullName, persons, start, end).subscribe(c => {
        alert("Uspješno izvršena rezervacija!")
        window.location.reload();
      })
    }
  }

  changeSlide(index: number) {
    this.currentSlide = index;
  }

  getCommentCount(destination: Destination): string {
    if (destination && destination.comments) {
      const commentCount = destination.comments.length;
      return commentCount > 0 ? `(${commentCount})` : ''; 
    } else {
      return '';
    }
  }
  closeCommentForm() {
    this.showCommentForm = false;
  }
  openCommentForm(dest: Destination) {
    this.selectedDestination = dest;
    this.showCommentForm = true;
  }
  
  addComment() {
    if (!this.newComment.trim()) {
        return;
    }

    if (!this.u) { // Provjerite je li korisnik prijavljen
      alert("Morate se prijaviti da biste mogli ostaviti komentar.");
      return;
  }

    const destinationId = this.selectedDestination._id;
    const userId = this.u?._id || ''; 
    const username = this.u?.username || ''; 
    const comment = { userId: userId, username: username, message: this.newComment }; 
    this.destinationService.addComment(destinationId, userId, username, this.newComment)
        .subscribe((response: any) => {
            this.selectedDestination.comments.push({
                user: {
                    username: username 
                },
                message: this.newComment,
                date: new Date() 
            });
            this.newComment = ''; 
        }, (error: any) => {
            console.error('Greška prilikom dodavanja komentara.', error);
        });
  }
  showCommentSection() {
    this.showCommentForm = true;
  }
}

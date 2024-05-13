import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/models/bookings.model';
import { BookingService } from 'src/app/services/bookings.service';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  bookings: Booking[] = [];
  currentUser: any;

  constructor(
    private userService: UserService,
    private bookingService: BookingService
  ) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser() {
    let localUser = localStorage.getItem("user");
    if (localUser != undefined) {
      this.currentUser = JSON.parse(localUser);
      this.loadUserBookings(this.currentUser._id);
    }
  }

  loadUserBookings(userId: string) {
    this.bookingService.getAll().subscribe((bookings: Booking[]) => {
      this.bookings = bookings.filter(booking => booking.userID === userId);
    });
  }

  deleteBooking(id: string) {
    this.bookingService.remove(id).subscribe(() => {
      this.loadUserBookings(this.currentUser._id);
    });
  }
  isEndDateValid(endDate: string): boolean {
    const now = new Date();
    return new Date(endDate) >= now; 
  }
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from "@angular/material/button";
import { BannerComponent } from './components/banner/banner.component';
import { HomeComponent } from './pages/home/home.component';
import { LabelComponent } from './pages/home/label/label.component';
import { MainBannerComponent } from './pages/home/main-banner/main-banner.component';
import { MatIconModule } from "@angular/material/icon";
import { CarouselComponent } from './pages/home/carousel/carousel.component';
import { DestinationService } from './services/destinations.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { StarRatingModule } from 'angular-star-rating';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CategoryComponent } from './components/category/category.component';
import { AdminComponent } from './pages/admin/admin.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './services/users.service';
import { AdminDestinationComponent } from './pages/admin/admin-destination/admin-destination.component';
import { AdminUserComponent } from './pages/admin/admin-user/admin-user.component';
import { AdminBookingComponent } from './pages/admin/admin-booking/admin-booking.component';
import { BookingService } from './services/bookings.service';
import { DiscoveryComponent } from './pages/discovery/discovery.component';
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { AdminCommentComponent } from './pages/admin/admin-comment/admin-comment.component';
import { ReservationComponent } from './pages/home/reservation/reservation.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    BannerComponent,
    HomeComponent,
    LabelComponent,
    MainBannerComponent,
    CarouselComponent,
    CategoryComponent,
    AdminComponent,
    AdminDestinationComponent,
    AdminUserComponent,
    AdminBookingComponent,
    DiscoveryComponent,
    AdminCommentComponent,
    ReservationComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    AppRoutingModule,
    StarRatingModule.forRoot(),
    MatChipsModule,
    MatFormFieldModule,
    MatTabsModule,
    MatExpansionModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
  ],
  providers: [DestinationService, MatSnackBarModule, UserService, BookingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
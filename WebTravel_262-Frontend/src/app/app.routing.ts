import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./pages/admin/admin.component";
import { HomeComponent } from "./pages/home/home.component";
import { DiscoveryComponent } from "./pages/discovery/discovery.component";
import { AdminCommentComponent } from "./pages/admin/admin-comment/admin-comment.component";
import { ReservationComponent } from './pages/home/reservation/reservation.component';

const routes : Routes = [
    {path: "", redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'admin', component: AdminComponent},
    {path: 'discovery', component: DiscoveryComponent},
    {path: 'reservation', component: ReservationComponent },
    {path: 'comment', component: AdminCommentComponent}
]

@NgModule({

    declarations:[],
    imports: [
        CommonModule,
        RouterModule.forRoot(routes),
    ],
    exports: [
        RouterModule
    ],

})

export class AppRoutingModule {}
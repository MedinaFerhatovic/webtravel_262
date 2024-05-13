import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  activeTab: String = "spline"
  panels: string[] = ["spline","destinations", "users", "bookings"]

  checkDest(panel: string) {
    if (this.activeTab == panel) {
      return true
    }
    return false;
  }

  openPanel(panel: string) {
    this.activeTab = panel;
  }

  isShow!: boolean;
  topPosToStartShowing = 100;

  @HostListener('window:scroll')
  checkScroll() {

    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  logoutUser(){
    localStorage.removeItem("user");
    window.location.href = "home";
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  logout() {
    let response: boolean = window.confirm("Are you sure want to continue?");
    if (response) {
      window.alert("Logged out successfully!");
      localStorage.clear();
      this.router.navigate(['home']);
    }
  }
}

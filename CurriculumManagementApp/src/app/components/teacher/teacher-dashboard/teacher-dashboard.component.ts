import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent implements OnInit {

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

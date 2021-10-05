import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeadMaster } from 'src/app/model/head-master';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  public headMaster: HeadMaster = new HeadMaster();
  constructor(private router: Router) { }

  ngOnInit(): void {
    let adminDetail: string = String(localStorage.getItem('admin'));
    this.headMaster = JSON.parse(adminDetail);
    console.log(this.headMaster);
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

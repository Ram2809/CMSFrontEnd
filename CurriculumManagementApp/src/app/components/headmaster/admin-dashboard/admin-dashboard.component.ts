import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  optionItems = [
    {id: 'addClass',     value: 'Max',     text: 'Add Class'},
    {id: 'viewClass',     value: 'Average', text: 'View Class'},
    {id: 'manageClass',     value: 'Sum',     text: 'Manage Class'},
  ];
  logout() {

  }
  onChange(){

  }
}

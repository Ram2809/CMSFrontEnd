import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Teacher } from 'src/app/model/teacher';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent implements OnInit {
  public staffId: number = 0;
  public teacher: Teacher = new Teacher();

  constructor(private router: Router,
    private teacherService: TeacherService) { }

  ngOnInit(): void {
    this.staffId = Number(localStorage.getItem('staffId'));
    this.teacherService.getStaff(this.staffId).subscribe(response => {
      this.teacher = response.data;
    });
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

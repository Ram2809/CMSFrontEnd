import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Teacher } from 'src/app/model/teacher';
import { TeacherService } from 'src/app/services/teacher.service';
import { Response } from 'src/app/model/response';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { AddAddressComponent } from '../add-address/add-address.component';

@Component({
  selector: 'app-teacher-signup',
  templateUrl: './teacher-signup.component.html',
  styleUrls: ['./teacher-signup.component.css']
})
export class TeacherSignupComponent implements OnInit {
  public qualificationList: String[] = ['B.Ed', 'Ph.D', 'M.Phill', 'M.Sc', 'M.A', 'B.Sc', 'B.A', 'B.Com', 'M.Com'];
  public majorList: String[] = ['Tamil', 'English', 'Maths', 'History', 'Physics', 'Chemistry', 'Computer Science', 'Botany', 'Zoology', 'Physical Education', 'Hindi'];
  public isHidden: boolean = false;

  AddStaffForm = new FormGroup({
    id: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl(''),
    dateOfBirth: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    qualification: new FormControl('', Validators.required),
    major: new FormControl('', Validators.required),
    contactNo: new FormControl('', [Validators.required, Validators.pattern("[0-9]{10}")]),
    email: new FormControl('', [Validators.required, Validators.email])
  });
  constructor(private teacherService: TeacherService,
    private router: Router,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<TeacherSignupComponent>) { }

  ngOnInit(): void {
  }
  addStaff() {
    const teacher: Teacher = new Teacher();
    teacher.id = this.id?.value;
    teacher.firstName = this.firstName?.value;
    teacher.lastName = this.lastName?.value;
    teacher.dateOfBirth = this.dateOfBirth?.value;
    teacher.gender = this.gender?.value;
    teacher.qualification = this.qualification?.value;
    teacher.major = this.major?.value;
    teacher.email = this.email?.value;
    teacher.contactNo = this.contactNo?.value;
    this.teacherService.addStaff(teacher).subscribe(response => {
      let responseBody: Response = response;
      console.log(responseBody.message);
      localStorage.setItem('teacherId', this.id?.value);
      window.alert(responseBody.message);
      this.isHidden = true;
    }, error => {
      window.alert(error.error.message);
    });
  }
  addAddress() {
    this.close();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    this.dialog.open(AddAddressComponent, dialogConfig);
  }
  close() {
    this.dialogRef.close();
  }
  get id() {
    return this.AddStaffForm.get('id');
  }
  get firstName() {
    return this.AddStaffForm.get('firstName');
  }
  get lastName() {
    return this.AddStaffForm.get('lastName');
  }
  get dateOfBirth() {
    return this.AddStaffForm.get('dateOfBirth');
  }
  get gender() {
    return this.AddStaffForm.get('gender')
  }
  get qualification() {
    return this.AddStaffForm.get('qualification');
  }
  get major() {
    return this.AddStaffForm.get('major');
  }
  get email() {
    return this.AddStaffForm.get('email')
  }
  get contactNo() {
    return this.AddStaffForm.get('contactNo')
  }
}

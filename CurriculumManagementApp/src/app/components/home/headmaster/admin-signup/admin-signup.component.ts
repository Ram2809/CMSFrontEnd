import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HeadMaster } from 'src/app/model/head-master';
import { HeadMasterService } from 'src/app/services/head-master.service';
import { Response } from 'src/app/model/response';

@Component({
  selector: 'app-admin-signup',
  templateUrl: './admin-signup.component.html',
  styleUrls: ['./admin-signup.component.css']
})
export class AdminSignupComponent implements OnInit {

  public qualificationList: String[] = ['B.Ed', 'Ph.D', 'M.Phil', 'M.Sc', 'M.A', 'B.Sc', 'B.A', 'B.Com', 'M.Com'];
  public majorList: String[] = ['Tamil', 'English', 'Maths', 'History', 'Physics', 'Chemistry', 'Computer Science', 'Botany', 'Zoology', 'Physical Education', 'Hindi'];
  public response: Response = new Response();
  AddHeadMasterForm = new FormGroup({
    id: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl(''),
    dateOfBirth: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    qualification: new FormControl('', Validators.required),
    major: new FormControl('', Validators.required),
    contactNo: new FormControl('', [Validators.required, Validators.pattern("[0-9]{10}")]),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', Validators.required),
  });
  constructor(private headMasterService: HeadMasterService,
    private router: Router) { }

  ngOnInit(): void {
  }
  addHeadMaster() {
    const headmaster: HeadMaster = new HeadMaster();
    headmaster.id = this.id?.value;
    headmaster.firstName = this.firstName?.value;
    headmaster.lastName = this.lastName?.value;
    headmaster.dateOfBirth = this.dateOfBirth?.value;
    headmaster.gender = this.gender?.value;
    headmaster.qualification = this.qualification?.value;
    headmaster.major = this.major?.value;
    headmaster.email = this.email?.value;
    headmaster.contactNo = this.contactNo?.value;
    headmaster.address = this.address?.value;
    headmaster.password="admin@123";
    this.headMasterService.addHeadmaster(headmaster).subscribe(response => {
      let responseBody: Response = response;
      console.log(responseBody.message);
      window.alert(responseBody.message);
      this.AddHeadMasterForm.reset();
    }, error => {
      window.alert(error.error.message);
    });
  }
  get id() {
    return this.AddHeadMasterForm.get('id');
  }
  get firstName() {
    return this.AddHeadMasterForm.get('firstName');
  }
  get lastName() {
    return this.AddHeadMasterForm.get('lastName');
  }
  get dateOfBirth() {
    return this.AddHeadMasterForm.get('dateOfBirth');
  }
  get gender() {
    return this.AddHeadMasterForm.get('gender')
  }
  get qualification() {
    return this.AddHeadMasterForm.get('qualification');
  }
  get major() {
    return this.AddHeadMasterForm.get('major');
  }
  get email() {
    return this.AddHeadMasterForm.get('email')
  }
  get contactNo() {
    return this.AddHeadMasterForm.get('contactNo')
  }
  get address() {
    return this.AddHeadMasterForm.get('address');
  }
}

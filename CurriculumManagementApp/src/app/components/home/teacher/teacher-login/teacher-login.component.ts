import { Component, OnInit } from '@angular/core';
import { Teacher } from 'src/app/model/teacher';
import { LoginService } from 'src/app/services/login.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { Response } from 'src/app/model/response';
import { Login } from 'src/app/model/login';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TeacherSignupComponent } from '../teacher-signup/teacher-signup.component';
import { TeacherForgotpasswordComponent } from '../teacher-forgotpassword/teacher-forgotpassword.component';

@Component({
  selector: 'app-teacher-login',
  templateUrl: './teacher-login.component.html',
  styleUrls: ['./teacher-login.component.css']
})
export class TeacherLoginComponent implements OnInit {
  public username: string = "";
  public password: string = "";
  public teacher:Teacher=new Teacher();
  public login:Login=new Login();
  constructor(private teacherService:TeacherService,
    private loginService:LoginService,
    private router:Router,
    private dialog:MatDialog) { }

  ngOnInit(): void {
  }
  checkUser(){
    console.log(this.username);
    console.log(this.password);
    this.teacherService.getStaffByEmail(this.username).subscribe(response=>{
      let responseBody:Response=response;
      this.teacher=responseBody.data;
      console.log(this.teacher);
      this.loginService.getLogin(Number(this.teacher.id)).subscribe(response=>{
        let responseBody:Response=response;
        this.login=responseBody.data;
        console.log(this.login);
        if (this.username != this.teacher.email || this.password != this.login.password) {
          window.alert("Invalid login credentials! Enter the valid username and password!");
        }
        else {
          localStorage.setItem('staffId',String(this.teacher.id));
          window.alert("Logged in successfully!");
          this.router.navigate(['teacher']);
        }
      },error=>{
        window.alert(error.error.message);
      });
    },error=>{
      window.alert(error.error.message);
    });
  }
  signup(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    this.dialog.open(TeacherSignupComponent, dialogConfig);
  }
  forgotPassword(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    this.dialog.open(TeacherForgotpasswordComponent, dialogConfig);
  }
}

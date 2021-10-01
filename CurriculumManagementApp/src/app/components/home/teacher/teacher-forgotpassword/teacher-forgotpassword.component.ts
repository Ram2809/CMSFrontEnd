import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Login } from 'src/app/model/login';
import { Teacher } from 'src/app/model/teacher';
import { LoginService } from 'src/app/services/login.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { Response } from 'src/app/model/response';

@Component({
  selector: 'app-teacher-forgotpassword',
  templateUrl: './teacher-forgotpassword.component.html',
  styleUrls: ['./teacher-forgotpassword.component.css']
})
export class TeacherForgotpasswordComponent implements OnInit {
  public username: string = "";
  public password: string = "";
  public confirmPassword: string = "";
  public teacher: Teacher = new Teacher();
  public login: Login = new Login();
  constructor(private dialogRef: MatDialogRef<TeacherForgotpasswordComponent>,
    private loginService: LoginService,
    private teacherService: TeacherService) { }

  ngOnInit(): void {
  }
  updatePassword() {
    console.log(this.username);
    this.teacherService.getStaffByEmail(this.username).subscribe(response => {
      let responseBody: Response = response;
      this.teacher = responseBody.data;
      console.log(this.teacher);
      this.loginService.getLogin(Number(this.teacher.id)).subscribe(response => {
        let responseBody: Response = response;
        this.login = responseBody.data;
        console.log(this.login);
        if (this.password == this.confirmPassword) {
          this.login.password = this.password;
          this.loginService.updateLogin(Number(this.teacher.id), this.login).subscribe(response => {
            let responseBody: Response = response;
            if (responseBody.code == 200) {
              window.alert("Password Updated successfully!");
            }
            console.log(responseBody.message);
          }, error => {
            window.alert(error.error.message);
          });
        }
        else {
          window.alert("Confirm password is not same!");
        }
      }, error => {
        window.alert(error.error.message);
      })
    }, error => {
      window.alert(error.error.message);
    });
  }
  close() {
    this.dialogRef.close();
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Login } from 'src/app/model/login';
import { Teacher } from 'src/app/model/teacher';
import { LoginService } from 'src/app/services/login.service';
import { Response } from 'src/app/model/response';
import { ThrowStmt } from '@angular/compiler';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-add-login-data',
  templateUrl: './add-login-data.component.html',
  styleUrls: ['./add-login-data.component.css']
})
export class AddLoginDataComponent implements OnInit {
  public staffId: number = 0;
  public response: Response = new Response();
  CreateLoginForm = new FormGroup({
    id: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', Validators.required),
  });
  constructor(private route: ActivatedRoute,
    private loginService: LoginService,
    public dialogRef: MatDialogRef<AddLoginDataComponent>) { }

  ngOnInit(): void {
    this.staffId = Number(localStorage.getItem('teacherId'));
    console.log(this.staffId);
  }
  createLogin() {
    if (this.password?.value != this.confirmPassword?.value) {
      window.alert("The password and confirm password not same!");
    }
    else {
      const login: Login = new Login();
      login.password = this.password?.value;
      const teacher: Teacher = new Teacher();
      teacher.id = this.staffId;
      login.teacher = teacher;
      this.loginService.addLogin(login).subscribe(data => {
        this.response = data;
        console.log(this.response);
        window.alert(this.response.message);
      });
    }
  }
  close(){
    this.dialogRef.close();
  }
  get id() {
    return this.CreateLoginForm.get('id');
  }
  get password() {
    return this.CreateLoginForm.get('password');
  }
  get confirmPassword() {
    return this.CreateLoginForm.get('confirmPassword');
  }
}

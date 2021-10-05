import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HeadMasterService } from 'src/app/services/head-master.service';
import { AdminSignupComponent } from '../admin-signup/admin-signup.component';
import { Response } from 'src/app/model/response';
import { HeadMaster } from 'src/app/model/head-master';
import { Router } from '@angular/router';
import { AdminForgotPasswordComponent } from '../admin-forgot-password/admin-forgot-password.component';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  public username: string = "";
  public password: string = "";
  public headMaster: HeadMaster = new HeadMaster();

  constructor(private dialog: MatDialog,
    private headMasterService: HeadMasterService,
    private router:Router) { }

  ngOnInit(): void {
  }
  checkUser() {
    console.log(this.username);
    this.headMasterService.getHeadMaster(this.username).subscribe(response => {
      let responseBody: Response = response;
      this.headMaster = responseBody.data;
      console.log(this.headMaster);
      localStorage.setItem('admin',JSON.stringify(this.headMaster));
      if (this.username != this.headMaster.email || this.password != this.headMaster.password) {
        window.alert("Invalid login credentials! Enter the valid username and password!");
      }
      else {
        window.alert("Logged in successfully!");
        this.router.navigate(['admin/viewprofile']);
      }
    }, error => {
      window.alert(error.error.message);
    });
  }
  forgotPassword() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    this.dialog.open(AdminForgotPasswordComponent, dialogConfig);
  }
  signup() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    this.dialog.open(AdminSignupComponent, dialogConfig);
  }
}

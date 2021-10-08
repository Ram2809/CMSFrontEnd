import { Component, OnInit } from '@angular/core';
import { HeadMaster } from 'src/app/model/head-master';
import { HeadMasterService } from 'src/app/services/head-master.service';
import { Response } from 'src/app/model/response';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-admin-forgot-password',
  templateUrl: './admin-forgot-password.component.html',
  styleUrls: ['./admin-forgot-password.component.css']
})
export class AdminForgotPasswordComponent implements OnInit {
  public username: string = "";
  public password: string = "";
  public confirmPassword: string = "";
  public headMaster: HeadMaster = new HeadMaster();

  constructor(private headMasterService: HeadMasterService,
    public dialogRef: MatDialogRef<AdminForgotPasswordComponent>) { }

  ngOnInit(): void {
  }
  updatePassword() {
    this.headMasterService.getHeadMaster(this.username).subscribe(response => {
      let responseBody: Response = response;
      this.headMaster = responseBody.data;
      if (this.password == this.confirmPassword) {
        this.headMaster.password = this.password;
        this.headMasterService.updateHeadMaster(Number(this.headMaster.id), this.headMaster).subscribe(response => {
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
    });
  }
  close() {
    this.dialogRef.close();
  }

}

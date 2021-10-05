import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HeadMaster } from 'src/app/model/head-master';
import { HeadMasterService } from 'src/app/services/head-master.service';
import { AdminUpdateProfileComponent } from '../admin-update-profile/admin-update-profile.component';
import { Response } from 'src/app/model/response';

@Component({
  selector: 'app-admin-view-profile',
  templateUrl: './admin-view-profile.component.html',
  styleUrls: ['./admin-view-profile.component.css']
})
export class AdminViewProfileComponent implements OnInit {
  public headMaster: HeadMaster = new HeadMaster();
  constructor(private dialog: MatDialog,
    private headMasterService: HeadMasterService) { }

  ngOnInit(): void {
    let user: string = String(localStorage.getItem('admin'));
    let headMasterDetail: HeadMaster = JSON.parse(user);
    this.headMasterService.getHeadMaster(String(headMasterDetail.email)).subscribe(response => {
      let responseBody: Response = response;
      this.headMaster = responseBody.data;
    }, error => {
      window.alert(error.error.message);
    })
  }
  updateProfile() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    this.dialog.open(AdminUpdateProfileComponent, dialogConfig);
  }
}

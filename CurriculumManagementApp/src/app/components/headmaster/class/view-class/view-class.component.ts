import { Component, OnInit } from '@angular/core';
import { Class } from 'src/app/model/class';
import { ClassService } from 'src/app/services/class.service';
import { Router } from '@angular/router';
import { Response } from 'src/app/model/response';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UpdateClassComponent } from '../update-class/update-class.component';
@Component({
  selector: 'app-view-class',
  templateUrl: './view-class.component.html',
  styleUrls: ['./view-class.component.css']
})
export class ViewClassComponent implements OnInit {
  public classList: Class[] = [];
  public roomNo: number = 0;
  constructor(private classService: ClassService,
    private router: Router,
    private dialog: MatDialog) { }
  ngOnInit(): void {
    this.classService.getAllClasses().subscribe(response => {
      let responseBody: Response = response;
      this.classList = responseBody.data;
    }, error => {
      window.alert(error.error.message);
    });
  }
  updateClass() {
    console.log(this.roomNo);
    localStorage.setItem('roomNo', String(this.roomNo));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    this.dialog.open(UpdateClassComponent, dialogConfig);
  }
  // deleteClass()
  // {
  //   this.classService.deleteClass(this.roomNo).subscribe(data=>{
  //     console.log(data);
  //     this.response=data;
  //     window.alert(this.response.message);
  //     this.ngOnInit();
  //   })
  // }
  backToMain() {
    this.router.navigate(['admin']);
  }
}

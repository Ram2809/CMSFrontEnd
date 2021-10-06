import { Component, OnInit } from '@angular/core';
import { Class } from 'src/app/model/class';
import { ClassService } from 'src/app/services/class.service';
import { Response } from 'src/app/model/response';
import { MatDialogRef } from '@angular/material/dialog';
import { SubjectService } from 'src/app/services/subject.service';
import { Subject } from 'src/app/model/subject';
import { SubjectAssign } from 'src/app/model/subject-assign';

@Component({
  selector: 'app-update-class',
  templateUrl: './update-class.component.html',
  styleUrls: ['./update-class.component.css']
})
export class UpdateClassComponent implements OnInit {
  public classDetail: Class = new Class();
  public roomNo: number = 0;
  public standard: string = "";
  public newStandard: string = "";
  public classList: Class[] = [];
  public subjectAssignList: SubjectAssign[] = [];

  constructor(private classService: ClassService,
    private dialogRef: MatDialogRef<UpdateClassComponent>,
    private subjectService: SubjectService) { }

  ngOnInit(): void {
    this.classDetail = new Class();
    this.roomNo = Number(localStorage.getItem('roomNo'));
    this.classService.getClass(this.roomNo).subscribe(response => {
      let responseBody: Response = response;
      this.classDetail = responseBody.data;
      this.standard = String(this.classDetail.standard);
    }, error => {
      window.alert(error.error.message);
    });
  }
  updateClass() {
    let response: boolean = window.confirm("Are you sure want to continue?");
    if (response) {
      this.classService.updateClass(this.roomNo, this.classDetail).subscribe(response => {
        let responseBody: Response = response;
        window.alert(responseBody.message);
        this.close();
      }, error => {
        window.alert(error.error.message);
      });
      this.updateSubjects();
    }
    this.ngOnInit();
  }
  close() {
    this.dialogRef.close();
  }
  updateSubjects() {
    let standard = this.classDetail.standard;
    if (this.standard != this.classDetail.standard) {
      this.subjectService.deleteSubjectAssign(this.roomNo).subscribe(response => {
        let responseBody: Response = response;
        this.classList = [];
        this.classService.getClassesByStandard(String(standard)).subscribe(response => {
          let responseBody: Response = response;
          this.classList = responseBody.data;
          if (this.classList.length != 0) {
            this.subjectService.getSubjets(Number(this.classList[0].roomNo)).subscribe(response => {
              let responseEntity: Response = response;
              this.subjectAssignList = responseEntity.data;
              for (var i = 0; i < this.subjectAssignList.length; i++) {
                this.assignSubject(String(this.subjectAssignList[i].subject?.code), this.roomNo);
              }
            });
          }
        });
      })
    }
  }
  assignSubject(code: string, roomNo: number) {
    const subject: Subject = new Subject();
    subject.code = code;
    const classDetail: Class = new Class();
    classDetail.roomNo = roomNo;
    const subjectAssign: SubjectAssign = new SubjectAssign();
    subjectAssign.subject = subject;
    subjectAssign.classDetail = classDetail;
    this.subjectService.assignSubject(subjectAssign).subscribe(response => {
      let responseBody: Response = response;
    }, error => {
      window.alert(error.error.message);
    });
  }
}

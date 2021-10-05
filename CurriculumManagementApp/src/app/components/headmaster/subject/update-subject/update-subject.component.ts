import { Component, OnInit } from '@angular/core';
import { Subject } from 'src/app/model/subject';
import { SubjectService } from 'src/app/services/subject.service';
import { Response } from 'src/app/model/response';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-update-subject',
  templateUrl: './update-subject.component.html',
  styleUrls: ['./update-subject.component.css']
})
export class UpdateSubjectComponent implements OnInit {
  public subject: Subject = new Subject();
  public code: string = "";

  constructor(private subjectService: SubjectService,
    private dialogRef: MatDialogRef<UpdateSubjectComponent>) { }

  ngOnInit(): void {
    this.code = String(localStorage.getItem('subjectCode'));
    console.log(this.code);
    this.subjectService.getSubject(this.code).subscribe(response => {
      let responseBody: Response = response;
      this.subject = responseBody.data;
      console.log(this.subject);
    }, error => {
      window.alert(error.error.message);
    });
  }
  updateSubject() {
    let response: boolean = window.confirm("Are you sure want to continue?");
    if (response) {
      this.subjectService.updateSubject(this.code, this.subject).subscribe(response => {
        let responseBody: Response = response;
        window.alert(responseBody.message);
        this.close();
      }, error => {
        window.alert(error.error.message);
      });
    }
  }
  close() {
    this.dialogRef.close();
  }
}

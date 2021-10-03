import { Component, OnInit } from '@angular/core';
import { SubjectAssign } from 'src/app/model/subject-assign';
import { ClassService } from 'src/app/services/class.service';
import { SubjectService } from 'src/app/services/subject.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { Response } from 'src/app/model/response';
import { Subject } from 'src/app/model/subject';
import { Class } from 'src/app/model/class';
@Component({
  selector: 'app-view-assigned-subjects',
  templateUrl: './view-assigned-subjects.component.html',
  styleUrls: ['./view-assigned-subjects.component.css']
})
export class ViewAssignedSubjectsComponent implements OnInit {
  public staffId: number = 0;
  public assignIdList: SubjectAssign[] = [];
  public classList: Class[] = [];
  public subjectList: Subject[] = [];

  constructor(private teacherService: TeacherService,
    private subjectService: SubjectService,
    private classService: ClassService) { }

  ngOnInit(): void {
    this.staffId = Number(localStorage.getItem('staffId'));
    console.log(this.staffId);
    this.teacherService.getSubjectAssignIds(this.staffId).subscribe(response => {
      let responseBody: Response = response;
      this.assignIdList = responseBody.data;
      console.log(this.assignIdList);
      for (let i in this.assignIdList) {
        this.subjectService.getRoomNo(Number(this.assignIdList[i])).subscribe(response => {
          let responseBody: Response = response;
          let roomNo: number = responseBody.data;
          console.log(roomNo);
          this.classService.getClass(roomNo).subscribe(response => {
            let responseBody: Response = response;
            let classDetail: Class = responseBody.data;
            this.classList.push(classDetail);
            console.log(this.classList);
            this.subjectService.getSubjectCode(Number(this.assignIdList[i]), roomNo).subscribe(response => {
              let responseBody: Response = response;
              console.log(responseBody.data);
              let subjectCode: string = responseBody.data;
              this.subjectService.getSubject(subjectCode).subscribe(response => {
                let responseBody: Response = response;
                let subject: Subject = responseBody.data;
                this.subjectList.push(subject);
                console.log(this.subjectList);
              }, error => {
                window.alert(error.error.message);
              });
            }, error => {
              window.alert(error.error.message);
            });
          }, error => {
            window.alert(error.error.message);
          });
        }, error => {
          window.alert(error.error.message);
        })
      }
    }, error => {
      window.alert(error.error.message);
    });
  }

}

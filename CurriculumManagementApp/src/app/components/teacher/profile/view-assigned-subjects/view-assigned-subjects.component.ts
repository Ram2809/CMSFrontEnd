import { Component, OnInit } from '@angular/core';
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
  public assignIdList: Number[] = [];
  public classList: Class[] = [];
  public subjectList: Subject[] = [];
  public roomNoList: Number[] = [];

  constructor(private teacherService: TeacherService,
    private subjectService: SubjectService,
    private classService: ClassService) { }

  ngOnInit(): void {
    this.staffId = Number(localStorage.getItem('staffId'));
    this.teacherService.getSubjectAssignIds(this.staffId).subscribe(response => {
      let responseBody: Response = response;
      this.assignIdList = responseBody.data;
      this.subjectService.getRoomNoList(this.assignIdList).subscribe(response => {
        let responseBody: Response = response;
        this.roomNoList = responseBody.data;
        this.classService.getClassList(this.roomNoList).subscribe(response => {
          let responseBody: Response = response;
          this.classList = responseBody.data;
          this.subjectService.getAllSubjectCodeList(this.assignIdList).subscribe(response => {
            let responseBody: Response = response;
            let subjectCodeList: String[] = responseBody.data;
            this.subjectService.getSubjectList(subjectCodeList).subscribe(response => {
              let responseBody: Response = response;
              this.subjectList = responseBody.data;
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
      });
    }, error => {
      window.alert(error.error.message);
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { Class } from 'src/app/model/class';
import { ClassService } from 'src/app/services/class.service';
import { Response } from 'src/app/model/response';
import { SubjectService } from 'src/app/services/subject.service';
import { SubjectAssign } from 'src/app/model/subject-assign';
import { TeacherService } from 'src/app/services/teacher.service';
import { Teacher } from 'src/app/model/teacher';
import { Subject } from 'src/app/model/subject';
import { TSMap } from 'typescript-map';

@Component({
  selector: 'app-viewstaffs',
  templateUrl: './viewstaffs.component.html',
  styleUrls: ['./viewstaffs.component.css']
})
export class ViewstaffsComponent implements OnInit {
  public standardList: string[] = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
  public classList: Class[] = [];
  public standard: string = "";
  public section: string = "";
  public roomNo: number = 0;
  public subject: string = "";
  public id: number = 0;
  public isHidden: boolean = false;
  public subjectAssignList: SubjectAssign[] = [];
  public teacher: Teacher = new Teacher();
  public errorMessage: string = "";
  public subjectList: Subject[] = [];
  public teacherList: Teacher[] = [];
  public assignIdList: Number[] = [];
  public teacherAssignMap:TSMap<Subject,Teacher>=new TSMap();
  public countOfAssignIds:number=0;

  constructor(private classService: ClassService,
    private subjectService: SubjectService,
    private teacherService: TeacherService) { }

  ngOnInit(): void {

  }
  getSections() {
    this.classService.getClassesByStandard(this.standard).subscribe(response => {
      let responseBody: Response = response;
      this.classList = responseBody.data;
    }, error => {
      window.alert(error.error.message);
    });
  }

  getStaffs() {
    this.classService.getClassRoomNo(this.standard, this.section).subscribe(response => {
      let responseBody: Response = response;
      this.roomNo = responseBody.data;
      this.subjectService.countOfAssignIds(this.roomNo).subscribe(response=>{
        let responseBody:Response=response;
        this.countOfAssignIds=responseBody.data;
        console.log(this.countOfAssignIds);
      
      this.subjectService.getSubjets(this.roomNo).subscribe(response => {
        let responseBody: Response = response;
        this.subjectAssignList = responseBody.data;
        this.assignIdList = [];
        this.subjectList = [];
        this.teacherList = [];
        for (let i in this.subjectAssignList) {
          this.assignIdList.push(Number(this.subjectAssignList[i].id));
          const subject: Subject = this.subjectAssignList[i].subject!;
          this.subjectList.push(subject);
        }
        this.teacherService.getStaffIdList(this.assignIdList).subscribe(response => {
          let responseBody: Response = response;
          let staffIdList: Number[] = responseBody.data;
          if(this.countOfAssignIds==staffIdList.length){
          this.teacherService.getStaffList(staffIdList).subscribe(response => {
            let responseBody: Response = response;
            this.teacherList = responseBody.data;
          }, error => {
            window.alert(error.error.message);
          });
        }
        else{
          window.alert("You need to assign staff for subjects");
        }
        }, error => {
          window.alert(error.error.message);
        });
      }, error => {
        window.alert(error.error.message);
      });
    },error=>{
      window.alert(error.error.message);
    });
    }, error => {
      window.alert(error.error.message);
    });

  }
}

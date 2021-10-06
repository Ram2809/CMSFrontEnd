import { Component, OnInit } from '@angular/core';
import { Class } from 'src/app/model/class';
import { Subject } from 'src/app/model/subject';
import { SubjectAssign } from 'src/app/model/subject-assign';
import { Topic } from 'src/app/model/topic';
import { ClassService } from 'src/app/services/class.service';
import { SubjectService } from 'src/app/services/subject.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { Response } from 'src/app/model/response';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //public assignList:Number[]=[43,44,45];
  public assignIdList: Number[] = [];
  public subjectList: Subject[] = [];
  public topicList: Topic[] = [];
  public classList: Class[] = [];
  public classRoomNo: number = 0;
  public isHidden: boolean = true;
  public roomNoList: Number[] = [];
  public staffId: number = 1006;
  public standard: string = "XII";
  public section: string = 'A';
  public subjectCodeList: String[] = [];
  constructor(private subjectService: SubjectService,
    private teacherService: TeacherService,
    private classService: ClassService) { }

  ngOnInit(): void {
    this.staffId = Number(localStorage.getItem('staffId'));
    console.log(this.staffId);
    this.teacherService.getSubjectAssignIds(this.staffId).subscribe(response => {
      let responseBody: Response = response;
      console.log(responseBody);
      this.assignIdList = responseBody.data;
      this.subjectService.getRoomNoList(this.assignIdList).subscribe(response=>{
        let responseBody:Response=response;
        this.roomNoList=responseBody.data;
        console.log(this.roomNoList);
        this.classService.getClassList(this.roomNoList).subscribe(response=>{
          let responseBody:Response=response;
          this.classList=responseBody.data;
          console.log(this.classList);
        },error=>{
          window.alert(error.error.message);
        })
      },error=>{
        window.alert(error.error.message);
      })
    }, error => {
      window.alert(error.error.message);
    })
  }

//   getClass(){
//     this.staffId = Number(localStorage.getItem('staffId'));
//     console.log(this.staffId);
//     this.teacherService.getSubjectAssignIds(this.staffId).subscribe(response => {
//       let responseBody: Response = response;
//       console.log(responseBody);
//       this.assignIdList = responseBody.data;
//       for (let i in this.assignIdList) {
//         this.subjectService.getRoomNo(Number(this.assignIdList[i])).subscribe(response => {
//           let responseBody: Response = response;
//           let roomNo: number = responseBody.data;
//           console.log(roomNo)
//           this.classService.getClass(roomNo).subscribe(response => {
//             let responseBody: Response = response;
//             this.classList.push(responseBody.data);
//             console.log(this.classList);
//           }, error => {
//             window.alert(error.error.message);
//           })
//         }, error => {
//           window.alert(error.error.message);
//         });
//       }
//     }, error => {
//       window.alert(error.error.message);
//     })
//   }
// }
  // getSubjects() {
    // this.teacherService.getSubjectAssignIds(this.staffId).subscribe(response => {
    //   let responseBody: Response = response;
    //   console.log(responseBody);
    //   this.assignIdList = responseBody.data;
    //   this.classService.getClassRoomNo(this.standard, this.section).subscribe(response => {
    //     let responseBody: Response = response;
    //     this.classRoomNo = responseBody.data;
    //     console.log(this.classRoomNo);
    //     this.subjectService.getSubjectCodeList(this.assignIdList, this.classRoomNo).subscribe(response => {
    //       let responseBody: Response = response;
    //       this.subjectCodeList = responseBody.data;
    //       console.log(this.subjectCodeList);
    //       this.subjectService.getSubjectList(this.subjectCodeList).subscribe(response => {
    //         let responseBody: Response = response;
    //         this.subjectList = responseBody.data;
    //         console.log(this.subjectList);
    //       }, error => {
    //         window.alert(error.error.message);
    //       })
    //     }, error => {
    //       window.alert(error.error.message);
    //     })
    //   }, error => {
    //     window.alert(error.error.message);
    //   });
    // }, error => {
    //   window.alert(error.error.message);
    // });
// }
}

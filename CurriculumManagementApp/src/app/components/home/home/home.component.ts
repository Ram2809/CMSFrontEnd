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
  public staffId:number=1006;
  public standard:string="XII";
  public section:string='A';

  constructor(private subjectService:SubjectService,
    private teacherService:TeacherService,
    private classService:ClassService) { }

  ngOnInit(): void {
       this.teacherService.getSubjectAssignIds(this.staffId).subscribe(response => {
      let responseBody: Response = response;
      console.log(responseBody);
      this.assignIdList = responseBody.data;
      this.classService.getClassRoomNo(this.standard, this.section).subscribe(response => {
        let responseBody: Response = response;
        this.classRoomNo = responseBody.data;
        console.log(this.classRoomNo);
        this.subjectService.getRoomNoList(this.assignIdList).subscribe(response=>{
          this.roomNoList=response.data;
          console.log(this.roomNoList);
          for(let i in this.roomNoList){
            if(this.roomNoList[i]==this.classRoomNo){
              let index:number=Number(i);
              this.subjectService.getSubjectCode(Number(this.assignIdList[index]),this.classRoomNo).subscribe(response=>{
                
              })
            }
          }
        },error=>{
          window.alert(error.error.message);
        })
      }, error => {
        window.alert(error.error.message);
      })
    }, error => {
      window.alert(error.error.message);
    });
    console.log(this.subjectList);
  }

  }
  // getSubjects() {
  //   this.teacherService.getSubjectAssignIds(this.staffId).subscribe(response => {
  //     let responseBody: Response = response;//10,11,13
  //     console.log(responseBody);
  //     this.assignIdList = responseBody.data;//10,11,13
  //     this.classService.getClassRoomNo(this.standard?.value, this.section?.value).subscribe(response => {
  //       let responseBody: Response = response;
  //       this.classRoomNo = responseBody.data;//2
  //       console.log(this.classRoomNo);
  //       for (let i in this.assignIdList) {//10,2->EVS
  //         this.subjectService.getRoomNo(Number(this.assignIdList[i])).subscribe(response => {
  //           let responseBody: Response = response;
  //           let roomNo: number = responseBody.data;
  //           console.log(roomNo);10,11,13--->1,2,3
               // for(let i in this.roomNoList)
  //           if (this.roomNoList[i] == this.classRoomNo) {
                //  index=i;
  //             this.subjectService.getSubjectCode(Number(this.assignIdList[index]), this.classRoomNo).subscribe(response => {
  //               let responseBody: Response = response;
  //               console.log(responseBody.data);
  //               this.subjectService.getSubject(responseBody.data).subscribe(response => {
  //                 let responseBody: Response = response;
  //                 console.log(responseBody.data);
  //                 this.subjectList.push(responseBody.data);
  //               }, error => {
  //                 window.alert(error.error.message);
  //               })
  //             }, error => {
  //               window.alert(error.error.message);
  //             });
  //           }
  //         }, error => {
  //           window.alert(error.error.message);
  //         });
  //       }
  //     }, error => {
  //       window.alert(error.error.message);
  //     })
  //   }, error => {
  //     window.alert(error.error.message);
  //   });
  //   console.log(this.subjectList);
  // }

// }
// }

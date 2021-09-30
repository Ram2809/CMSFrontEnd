import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Class } from 'src/app/model/class';
import { Subject } from 'src/app/model/subject';
import { SubjectAssign } from 'src/app/model/subject-assign';
import { Topic } from 'src/app/model/topic';
import { ClassService } from 'src/app/services/class.service';
import { Response } from 'src/app/model/response';
import { TeacherService } from 'src/app/services/teacher.service';
import { TopicService } from 'src/app/services/topic.service';
import { SubjectService } from 'src/app/services/subject.service';
import { TopicStatus } from 'src/app/model/topic-status';
import { Teacher } from 'src/app/model/teacher';
import { TopicStatusService } from 'src/app/services/topic-status.service';
@Component({
  selector: 'app-add-topic-status',
  templateUrl: './add-topic-status.component.html',
  styleUrls: ['./add-topic-status.component.css']
})
export class AddTopicStatusComponent implements OnInit {
  public standardList: string[] = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
  public staffId: number = 1005;
  public assignIdList: SubjectAssign[] = [];
  public subjectList: Subject[] = [];
  public topicList: Topic[] = [];
  public classList: Class[] = [];
  public classRoomNo: number = 0;

  UpdateTopicStatusForm = new FormGroup({
    standard: new FormControl('', Validators.required),
    section: new FormControl('', Validators.required),
    subject: new FormControl('', Validators.required),
    unit: new FormControl('', Validators.required),
    beginDate: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    completedDate: new FormControl(''),
    remarks:new FormControl(''),
  })
  constructor(private classService: ClassService,
    private teacherService: TeacherService,
    private topicService: TopicService,
    private subjectService: SubjectService,
    private topicStatusService: TopicStatusService) { }

  ngOnInit(): void {
  }
  getSections() {
    this.classService.getClassesByStandard(this.standard?.value).subscribe(response => {
      let responseBody: Response = response;
      this.classList = responseBody.data;
      console.log(this.classList);
    }, error => {
      window.alert(error.error.message);
    })
  }
  getTopics() {
    console.log(this.subject?.value.split("-").shift());
    this.topicService.getTopics(this.subject?.value.split("-").shift()).subscribe(response => {
      let responseBody: Response = response;
      this.topicList = responseBody.data;
      console.log(this.topicList);
    }, error => {
      window.alert(error.error.message);
    });
  }
  getSubjects() {
    this.teacherService.getSubjectAssignIds(this.staffId).subscribe(response => {
      let responseBody: Response = response;//10,11,13
      console.log(responseBody);
      this.assignIdList = responseBody.data;//10,11,13
      this.classService.getClassRoomNo(this.standard?.value, this.section?.value).subscribe(response => {
        let responseBody: Response = response;
        this.classRoomNo = responseBody.data;//2
        console.log(this.classRoomNo);
        for (let i in this.assignIdList) {//10,2->EVS
          this.subjectService.getRoomNo(Number(this.assignIdList[i])).subscribe(response => {
            let responseBody: Response = response;
            let roomNo: number = responseBody.data;
            console.log(roomNo)
            if (roomNo == this.classRoomNo) {
              this.subjectService.getSubjectCode(Number(this.assignIdList[i]), this.classRoomNo).subscribe(response => {
                let responseBody: Response = response;
                console.log(responseBody.data);
                this.subjectService.getSubject(responseBody.data).subscribe(response => {
                  let responseBody: Response = response;
                  console.log(responseBody.data);
                  this.subjectList.push(responseBody.data);
                }, error => {
                  window.alert(error.error.message);
                })
              }, error => {
                window.alert(error.error.message);
              });
            }
          }, error => {
            window.alert(error.error.message);
          });
        }
      }, error => {
        window.alert(error.error.message);
      })
    }, error => {
      window.alert(error.error.message);
    });
    console.log(this.subjectList);
  }
  addTopicStatus() {
    let unitNo: string = this.unit?.value.split("-").shift();
    console.log(unitNo);
    this.classService.getClassRoomNo(this.standard?.value, this.section?.value).subscribe(response => {
      let responseBody: Response = response;
      this.classRoomNo = responseBody.data;
      console.log(this.classRoomNo);
      const topicStatus: TopicStatus = new TopicStatus();
      topicStatus.beginDate = this.beginDate?.value;
      topicStatus.status = this.status?.value;
      topicStatus.completedDate = this.completedDate?.value;
      topicStatus.remarks=this.remarks?.value;
      const topic: Topic = new Topic();
      topic.unitNo = unitNo;
      const teacher: Teacher = new Teacher();
      teacher.id = this.staffId;
      const classDetail: Class = new Class();
      classDetail.roomNo = this.classRoomNo;
      topicStatus.topic = topic;
      topicStatus.teacher = teacher;
      topicStatus.classDetail = classDetail;
      this.topicStatusService.addTopicStatus(topicStatus).subscribe(response => {
        let responseBody: Response = response;
        console.log(responseBody.message);
        window.alert(responseBody.message);
      }, error => {
        window.alert(error.error.message);
      });
    }, error => {
      window.alert(error.error.message);
    });
  }
  get standard() {
    return this.UpdateTopicStatusForm.get('standard');
  }
  get section() {
    return this.UpdateTopicStatusForm.get('section');
  }
  get subject() {
    return this.UpdateTopicStatusForm.get('subject');
  }
  get unit() {
    return this.UpdateTopicStatusForm.get('unit');
  }
  get beginDate() {
    return this.UpdateTopicStatusForm.get('beginDate');
  }
  get status() {
    return this.UpdateTopicStatusForm.get('status');
  }
  get completedDate() {
    return this.UpdateTopicStatusForm.get('completedDate');
  }
  get remarks(){
    return this.UpdateTopicStatusForm.get('remarks');
  }
}

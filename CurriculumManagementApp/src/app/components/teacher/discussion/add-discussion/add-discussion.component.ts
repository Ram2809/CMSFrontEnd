import { Component, OnInit } from '@angular/core';
import { SubjectAssign } from 'src/app/model/subject-assign';
import { DiscussionService } from 'src/app/services/discussion.service';
import { SubjectService } from 'src/app/services/subject.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { Response } from 'src/app/model/response';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'src/app/model/subject';
import { Topic } from 'src/app/model/topic';
import { TopicService } from 'src/app/services/topic.service';
import { Discussion } from 'src/app/model/discussion';
import { Teacher } from 'src/app/model/teacher';
import { Class } from 'src/app/model/class';
import { ClassService } from 'src/app/services/class.service';
@Component({
  selector: 'app-add-discussion',
  templateUrl: './add-discussion.component.html',
  styleUrls: ['./add-discussion.component.css']
})
export class AddDiscussionComponent implements OnInit {
  public standardList: string[] = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
  public staffId: number = 1002;
  public assignIdList: SubjectAssign[] = [];
  public subjectList: Subject[] = [];
  public topicList: Topic[] = [];
  public classList: Class[] = [];
  public classRoomNo: number = 0;
  public isHidden: boolean = true;
  public roomNoList: Number[] = [];
  AddDiscussionForm = new FormGroup({
    standard: new FormControl('', Validators.required),
    section: new FormControl('', Validators.required),
    subject: new FormControl('', Validators.required),
    unit: new FormControl('', Validators.required),
    question: new FormControl('', Validators.required),
    answer: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
  });
  // AddQuestionForm = new FormGroup({
  //   question: new FormControl('', Validators.required),
  //   answer: new FormControl('', Validators.required),
  //   date: new FormControl('', Validators.required),
  // });
  constructor(private subjectService: SubjectService,
    private teacherService: TeacherService,
    private discussionService: DiscussionService,
    private topicService: TopicService,
    private classService: ClassService) { }

  ngOnInit(): void {

  }
  getSections() {
    this.classService.getClassesByStandard(this.standard?.value).subscribe(response => {
      let responseBody: Response = response;
      this.classList = responseBody.data;
      console.log(this.classList);
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
  addDiscussion() {
    let response: boolean = window.confirm("Are you sure want to continue?");
    if (response) {
      const discussion: Discussion = new Discussion();
      discussion.question = this.question?.value;
      discussion.answer = this.answer?.value;
      discussion.date = this.date?.value;
      const topic: Topic = new Topic();
      topic.unitNo = this.unit?.value.split("-").shift();
      const teacher: Teacher = new Teacher();
      teacher.id = this.staffId;
      const classDetail: Class = new Class();
      classDetail.roomNo = this.classRoomNo;
      discussion.topic = topic;
      discussion.teacher = teacher;
      discussion.classDetail = classDetail;
      console.log(discussion);
      this.discussionService.addDiscussion(discussion).subscribe(response => {
        let responseBody: Response = response;
        console.log(responseBody);
        window.alert(responseBody.message);
        this.AddDiscussionForm.reset();
      }, error => {
        window.alert(error.error.message);
      });
    }
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
  get standard() {
    return this.AddDiscussionForm.get('standard');
  }
  get section() {
    return this.AddDiscussionForm.get('section');
  }
  get subject() {
    return this.AddDiscussionForm.get('subject');
  }
  get unit() {
    return this.AddDiscussionForm.get('unit');
  }
  get question() {
    return this.AddDiscussionForm.get('question');
  }
  get answer() {
    return this.AddDiscussionForm.get('answer');
  }
  get date() {
    return this.AddDiscussionForm.get('date');
  }
}

import { Component, OnInit } from '@angular/core';
import { DiscussionService } from 'src/app/services/discussion.service';
import { SubjectService } from 'src/app/services/subject.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { Response } from 'src/app/model/response';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'src/app/model/subject';
import { Unit } from 'src/app/model/unit';
import { UnitService } from 'src/app/services/unit.service';
import { Discussion } from 'src/app/model/discussion';
import { Teacher } from 'src/app/model/teacher';
import { Class } from 'src/app/model/class';
import { ClassService } from 'src/app/services/class.service';
import { TopicService } from 'src/app/services/topic.service';
import { Topic } from 'src/app/model/topic';

@Component({
  selector: 'app-add-discussion',
  templateUrl: './add-discussion.component.html',
  styleUrls: ['./add-discussion.component.css']
})
export class AddDiscussionComponent implements OnInit {
  public standardList: string[] = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
  public staffId: number = 0;
  public assignIdList: Number[] = [];
  public subjectCodeList: String[] = [];
  public subjectList: Subject[] = [];
  public unitList: Unit[] = [];
  public classList: Class[] = [];
  public classRoomNo: number = 0;
  public isHidden: boolean = true;
  public roomNoList: Number[] = [];
  public topicList: Topic[] = [];
  AddDiscussionForm = new FormGroup({
    standard: new FormControl('', Validators.required),
    section: new FormControl('', Validators.required),
    subject: new FormControl('', Validators.required),
    unit: new FormControl('', Validators.required),
    topic: new FormControl('', Validators.required),
    question: new FormControl('', Validators.required),
    answer: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
  });
  constructor(private subjectService: SubjectService,
    private teacherService: TeacherService,
    private discussionService: DiscussionService,
    private unitService: UnitService,
    private classService: ClassService,
    private topicService: TopicService) { }

  ngOnInit(): void {
    this.staffId = Number(localStorage.getItem('staffId'));
    console.log(this.staffId);
  }
  getSections() {
    this.classService.getClassesByStandard(this.standard?.value).subscribe(response => {
      let responseBody: Response = response;
      this.classList = responseBody.data;
      console.log(this.classList);
    })
  }
  getUnits() {
    console.log(this.subject?.value.split("-").shift());
    this.unitService.getUnits(this.subject?.value.split("-").shift()).subscribe(response => {
      let responseBody: Response = response;
      this.unitList = responseBody.data;
      console.log(this.unitList);
    }, error => {
      window.alert(error.error.message);
    });
  }
  getTopics() {
    this.topicService.getTopics(this.unit?.value.split("-").shift()).subscribe(response => {
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
      topic.id = this.topic?.value.split("-").shift();
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
      let responseBody: Response = response;
      console.log(responseBody);
      this.assignIdList = responseBody.data;
      this.classService.getClassRoomNo(this.standard?.value, this.section?.value).subscribe(response => {
        let responseBody: Response = response;
        this.classRoomNo = responseBody.data;
        console.log(this.classRoomNo);
        this.subjectService.getSubjectCodeList(this.assignIdList, this.classRoomNo).subscribe(response => {
          let responseBody: Response = response;
          this.subjectCodeList = responseBody.data;
          console.log(this.subjectCodeList);
          this.subjectService.getSubjectList(this.subjectCodeList).subscribe(response => {
            let responseBody: Response = response;
            this.subjectList = responseBody.data;
            console.log(this.subjectList);
          }, error => {
            window.alert(error.error.message);
          })
        }, error => {
          window.alert(error.error.message);
        })
      }, error => {
        window.alert(error.error.message);
      });
    }, error => {
      window.alert(error.error.message);
    });
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
  get topic() {
    return this.AddDiscussionForm.get('topic');
  }
}

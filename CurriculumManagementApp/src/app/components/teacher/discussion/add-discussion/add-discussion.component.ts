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
@Component({
  selector: 'app-add-discussion',
  templateUrl: './add-discussion.component.html',
  styleUrls: ['./add-discussion.component.css']
})
export class AddDiscussionComponent implements OnInit {
  public staffId: number = 1002;
  public assignIdList: SubjectAssign[] = [];
  public subjectList: Subject[] = [];
  public topicList: Topic[] = [];
  public isHidden: boolean = true;
  AddDiscussionForm = new FormGroup({
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
    private topicService: TopicService) { }

  ngOnInit(): void {
    this.teacherService.getSubjectAssignIds(this.staffId).subscribe(response => {
      let responseBody: Response = response;
      console.log(responseBody);
      this.assignIdList = responseBody.data;
      for (let i in this.assignIdList) {
        this.subjectService.getSubjectCode(Number(this.assignIdList[i])).subscribe(response => {
          let responseBody: Response = response;
          this.subjectService.getSubject(responseBody.data).subscribe(response => {
            let responseBody: Response = response;
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
    console.log(this.subjectList);
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
    const discussion: Discussion = new Discussion();
    discussion.question = this.question?.value;
    discussion.answer = this.answer?.value;
    discussion.date = this.date?.value;
    const topic: Topic = new Topic();
    topic.unitNo = this.unit?.value.split("-").shift();
    const teacher: Teacher = new Teacher();
    teacher.id = this.staffId;
    discussion.topic = topic;
    discussion.teacher = teacher;
    console.log(discussion);
    this.discussionService.addDiscussion(discussion).subscribe(response => {
      let responseBody: Response = response;
      console.log(responseBody);
      window.alert(responseBody.message);
    }, error => {
      window.alert(error.error.message);
    })
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

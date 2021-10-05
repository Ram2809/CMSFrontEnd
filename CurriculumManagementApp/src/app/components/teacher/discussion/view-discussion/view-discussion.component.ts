import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Class } from 'src/app/model/class';
import { ClassService } from 'src/app/services/class.service';
import { TopicService } from 'src/app/services/topic.service';
import { Response } from 'src/app/model/response';
import { Topic } from 'src/app/model/topic';
import { SubjectAssign } from 'src/app/model/subject-assign';
import { Subject } from 'src/app/model/subject';
import { SubjectService } from 'src/app/services/subject.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { Discussion } from 'src/app/model/discussion';
import { DiscussionService } from 'src/app/services/discussion.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view-discussion',
  templateUrl: './view-discussion.component.html',
  styleUrls: ['./view-discussion.component.css']
})
export class ViewDiscussionComponent implements OnInit {
  public standardList: string[] = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
  public staffId: number = 0;
  public topicList: Topic[] = [];
  public classList: Class[] = [];
  public assignIdList: SubjectAssign[] = [];
  public subjectList: Subject[] = [];
  public classRoomNo: number = 0;
  public discussionList: Discussion[] = [];
  public isHidden: boolean = false;
  public errorMessage: string = "";

  ViewDiscussionForm = new FormGroup({
    standard: new FormControl('', Validators.required),
    section: new FormControl('', Validators.required),
    subject: new FormControl('', Validators.required),
    unit: new FormControl('', Validators.required),
    option: new FormControl(''),
  });

  constructor(private classService: ClassService,
    private topicService: TopicService,
    private subjectService: SubjectService,
    private teacherService: TeacherService,
    private discussionService: DiscussionService,
    private router: Router) { }

  getSections() {
    this.classService.getClassesByStandard(this.standard?.value).subscribe(response => {
      let responseBody: Response = response;
      this.classList = responseBody.data;
      console.log(this.classList);
    }, error => {
      window.alert(error.error.message);
    });
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
  getDiscussions() {
    let unitNo: string = this.unit?.value.split("-").shift();
    console.log(unitNo);
    this.classService.getClassRoomNo(this.standard?.value, this.section?.value).subscribe(response => {
      let responseBody: Response = response;
      this.classRoomNo = responseBody.data;
      console.log(this.classRoomNo);
      this.discussionService.getDiscussions(unitNo, this.classRoomNo, this.staffId).subscribe(response => {
        let responseBody: Response = response;
        this.discussionList = responseBody.data;
        this.isHidden = false;
        console.log(this.discussionList);
      }, error => {
        this.isHidden = true;
        this.errorMessage = error.error.message;
        window.alert(error.error.message);
      });
    }, error => {
      window.alert(error.error.message);
    })
    this.isHidden = true;
  }
  ngOnInit(): void {
    this.staffId = Number(localStorage.getItem('staffId'));
    console.log(this.staffId);
  }
  updateDiscussion() {
    localStorage.setItem('questionNo', this.option?.value);
    this.router.navigate(['/teacher/updatediscussion'])
  }
  deleteDiscussion() {
    let response: boolean = window.confirm("Are you sure want to continue?");
    if (response) {
      console.log(this.option?.value);
      this.discussionService.deleteDiscussion(this.option?.value).subscribe(response => {
        let responseBody: Response = response;
        console.log(responseBody);
        window.alert(responseBody.message);
      }, error => {
        window.alert(error.error.message);
      });
    }
  }
  get standard() {
    return this.ViewDiscussionForm.get('standard');
  }
  get section() {
    return this.ViewDiscussionForm.get('section');
  }
  get subject() {
    return this.ViewDiscussionForm.get('subject');
  }
  get unit() {
    return this.ViewDiscussionForm.get('unit');
  }
  get option() {
    return this.ViewDiscussionForm.get('option');
  }
}

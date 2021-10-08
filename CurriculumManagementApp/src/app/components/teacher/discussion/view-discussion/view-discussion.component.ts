import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Class } from 'src/app/model/class';
import { ClassService } from 'src/app/services/class.service';
import { UnitService } from 'src/app/services/unit.service';
import { Response } from 'src/app/model/response';
import { Unit } from 'src/app/model/unit';
import { Subject } from 'src/app/model/subject';
import { SubjectService } from 'src/app/services/subject.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { Discussion } from 'src/app/model/discussion';
import { DiscussionService } from 'src/app/services/discussion.service';
import { Router } from '@angular/router';
import { TopicService } from 'src/app/services/topic.service';
import { Topic } from 'src/app/model/topic';
@Component({
  selector: 'app-view-discussion',
  templateUrl: './view-discussion.component.html',
  styleUrls: ['./view-discussion.component.css']
})
export class ViewDiscussionComponent implements OnInit {
  public standardList: string[] = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
  public staffId: number = 0;
  public unitList: Unit[] = [];
  public classList: Class[] = [];
  public assignIdList: Number[] = [];
  public subjectCodeList: String[] = [];
  public subjectList: Subject[] = [];
  public classRoomNo: number = 0;
  public topicList: Topic[] = [];
  public discussionList: Discussion[] = [];
  public isHidden: boolean = false;
  public errorMessage: string = "";

  ViewDiscussionForm = new FormGroup({
    standard: new FormControl('', Validators.required),
    section: new FormControl('', Validators.required),
    subject: new FormControl('', Validators.required),
    unit: new FormControl('', Validators.required),
    topic: new FormControl('', Validators.required),
    option: new FormControl(''),
  });

  constructor(private classService: ClassService,
    private unitService: UnitService,
    private subjectService: SubjectService,
    private teacherService: TeacherService,
    private discussionService: DiscussionService,
    private topicService: TopicService,
    private router: Router) { }

  getSections() {
    this.classService.getClassesByStandard(this.standard?.value).subscribe(response => {
      let responseBody: Response = response;
      this.classList = responseBody.data;
    }, error => {
      window.alert(error.error.message);
    });
  }
  getUnits() {
    this.unitService.getUnits(this.subject?.value.split("-").shift()).subscribe(response => {
      let responseBody: Response = response;
      this.unitList = responseBody.data;
    }, error => {
      window.alert(error.error.message);
    });
  }
  getTopics() {
    this.topicService.getTopics(this.unit?.value.split("-").shift()).subscribe(response => {
      let responseBody: Response = response;
      this.topicList = responseBody.data;
    }, error => {
      window.alert(error.error.message);
    });
  }
  getSubjects() {
    this.teacherService.getSubjectAssignIds(this.staffId).subscribe(response => {
      let responseBody: Response = response;
      this.assignIdList = responseBody.data;
      this.classService.getClassRoomNo(this.standard?.value, this.section?.value).subscribe(response => {
        let responseBody: Response = response;
        this.classRoomNo = responseBody.data;
        this.subjectService.getSubjectCodeList(this.assignIdList, this.classRoomNo).subscribe(response => {
          let responseBody: Response = response;
          this.subjectCodeList = responseBody.data;
          this.subjectService.getSubjectList(this.subjectCodeList).subscribe(response => {
            let responseBody: Response = response;
            this.subjectList = responseBody.data;
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
  getDiscussions() {
    let topicNo: number = this.topic?.value.split("-").shift();
    this.classService.getClassRoomNo(this.standard?.value, this.section?.value).subscribe(response => {
      let responseBody: Response = response;
      this.classRoomNo = responseBody.data;
      this.discussionService.getDiscussions(topicNo, this.classRoomNo, this.staffId).subscribe(response => {
        let responseBody: Response = response;
        this.discussionList = responseBody.data;
        this.isHidden = false;
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
  }
  updateDiscussion() {
    localStorage.setItem('questionNo', this.option?.value);
    this.router.navigate(['/teacher/updatediscussion'])
  }
  deleteDiscussion() {
    let response: boolean = window.confirm("Are you sure want to continue?");
    if (response) {
      this.discussionService.deleteDiscussion(this.option?.value).subscribe(response => {
        let responseBody: Response = response;
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
  get topic() {
    return this.ViewDiscussionForm.get('topic');
  }
}

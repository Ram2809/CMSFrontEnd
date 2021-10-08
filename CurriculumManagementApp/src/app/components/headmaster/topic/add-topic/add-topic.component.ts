import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Class } from 'src/app/model/class';
import { SubjectAssign } from 'src/app/model/subject-assign';
import { ClassService } from 'src/app/services/class.service';
import { SubjectService } from 'src/app/services/subject.service';
import { Response } from 'src/app/model/response';
import { Unit } from 'src/app/model/unit';
import { UnitService } from 'src/app/services/unit.service';
import { Topic } from 'src/app/model/topic';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-add-topic',
  templateUrl: './add-topic.component.html',
  styleUrls: ['./add-topic.component.css']
})
export class AddTopicComponent implements OnInit {
  public standardList: string[] = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
  public subjectAssignList: SubjectAssign[] = [];
  public unitList: Unit[] = [];
  AddTopicForm = new FormGroup({
    standard: new FormControl('', Validators.required),
    unit: new FormControl('', Validators.required),
    subject: new FormControl('', Validators.required),
    topicName: new FormControl('', Validators.required),
  });
  constructor(private classService: ClassService,
    private subjectService: SubjectService,
    private unitService: UnitService,
    private topicService:TopicService) { }

  ngOnInit(): void {
  }
  getSubjects() {
    let responseBody: Response = new Response();
    let classList: Class[] = [];
    this.classService.getClassesByStandard(this.standard?.value).subscribe(response => {
      responseBody = response;
      classList = responseBody.data;
      this.subjectService.getSubjets(Number(classList[0].roomNo)).subscribe(response => {
        responseBody = response;
        this.subjectAssignList = responseBody.data;
      }, error => {
        window.alert(error.error.message);
      });
    }, error => {
      window.alert(error.error.message);
    });
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
  addTopic() {
    let response: boolean = window.confirm("Are you sure want to continue?");
    if (response) {
      const topic: Topic = new Topic();
      topic.name = this.topicName?.value;
      const unit: Unit = new Unit();
      unit.unitNo = this.unit?.value.split("-").shift();
      topic.unit=unit;
      this.topicService.addTopic(topic).subscribe(response=>{
        let responseBody:Response=response;
        window.alert(responseBody.message);
      },error=>{
        window.alert(error.error.message);
      })
    }
  }
  get standard() {
    return this.AddTopicForm.get('standard');
  }
  get unit() {
    return this.AddTopicForm.get('unit');
  }
  get topicName() {
    return this.AddTopicForm.get('topicName');
  }
  get subject() {
    return this.AddTopicForm.get('subject');
  }

}

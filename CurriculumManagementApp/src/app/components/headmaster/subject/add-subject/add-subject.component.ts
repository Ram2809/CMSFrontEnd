import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'src/app/model/subject';
import { ClassService } from 'src/app/services/class.service';
import { SubjectService } from 'src/app/services/subject.service';
import { Class } from 'src/app/model/class';
import { Response } from 'src/app/model/response';
import { SubjectAssign } from 'src/app/model/subject-assign';
@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css']
})
export class AddSubjectComponent implements OnInit {
  public standardList: string[] = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
  public classList: Class[]=[];
  public response: Response = new Response();
  AddSubjectForm = new FormGroup({
    code: new FormControl('', [Validators.required, Validators.maxLength(6)]),
    name: new FormControl('', Validators.required),
    standard: new FormControl('', Validators.required),
  });
  constructor(private classService: ClassService,
    private subjectService: SubjectService) { }

  ngOnInit(): void {
  }
  addSubject() {
    const subject: Subject = new Subject();
    subject.code = this.code?.value;
    subject.name = this.name?.value;
    this.subjectService.addSubject(subject).subscribe(data => {
      this.response = data;
      window.alert(this.response.message);
      console.log(this.response);
      this.classService.getClassesByStandard(this.standard?.value).subscribe(data => {
        this.response = data;
        this.classList = this.response.data;
        for (var i = 0; i < this.classList.length; i++) {
          console.log(this.classList[i].roomNo);
          console.log(this.code?.value);
          this.assignSubject(this.code?.value ,Number(this.classList[i].roomNo));
        }
      });
    });
  }
  assignSubject(code: string,roomNo: number) {
    const subject: Subject = new Subject();
    subject.code = code;
    const classDetail: Class = new Class();
    classDetail.roomNo = roomNo;
    const subjectAssign: SubjectAssign = new SubjectAssign();
    subjectAssign.subject = subject;
    subjectAssign.classDetail = classDetail;
    this.subjectService.assignSubject(subjectAssign).subscribe(data => {
      this.response = data;
      window.alert(this.response.message);
    })
  }
  get code() {
    return this.AddSubjectForm.get('code');
  }
  get name() {
    return this.AddSubjectForm.get('name');
  }
  get standard() {
    return this.AddSubjectForm.get('standard');
  }
}

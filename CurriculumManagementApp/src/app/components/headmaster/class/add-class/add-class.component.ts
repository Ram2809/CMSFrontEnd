import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Class } from 'src/app/model/class';
import { ClassService } from 'src/app/services/class.service';
import { Response } from 'src/app/model/response';
import { Subject } from 'src/app/model/subject';
import { SubjectAssign } from 'src/app/model/subject-assign';
import { SubjectService } from 'src/app/services/subject.service';
import { NotificationService } from 'src/app/services/notification.service';
@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css']
})
export class AddClassComponent implements OnInit {
  public classList: Class[] = [];
  public subjectAssignList: SubjectAssign[] = [];
  public subject: Subject = new Subject();
  AddClassForm = new FormGroup({
    standard: new FormControl('', [Validators.required, Validators.maxLength(3)]),
    section: new FormControl('', [Validators.required,Validators.maxLength(2)]),
    roomNo: new FormControl('', [Validators.required,Validators.min(1)]),
  });

  constructor(private classService: ClassService,
    private subjectService: SubjectService,
    private notificationService:NotificationService) { }

  ngOnInit(): void {
  }

  addClass() {
    const classDetail: Class = new Class();
    classDetail.roomNo = this.roomNo?.value;
    classDetail.standard = this.standard?.value;
    classDetail.section = this.section?.value;
    let response: boolean = window.confirm("Are you sure want to continue?");
    if (response) {
      this.classService.addClass(classDetail).subscribe(response => {
        let responseBody: Response = response;
        this.notificationService.successMessage(responseBody.message!);
        this.AddClassForm.reset();
        this.classList = [];
        this.classService.getClassesByStandard(String(classDetail.standard)).subscribe(response => {
          let responseBody: Response = response;
          this.classList = responseBody.data;
          if (this.classList.length != 0) {
            this.subjectService.getSubjets(Number(this.classList[0].roomNo)).subscribe(response => {
              let responseEntity: Response = response;
              this.subjectAssignList = responseEntity.data;
              for (var i = 0; i < this.subjectAssignList.length; i++) {
                this.assignSubject(String(this.subjectAssignList[i].subject?.code), Number(classDetail.roomNo));
              }
            });
          }
        });
      }, error => {
       this.notificationService.errorMessage(error.error.message);
      });
    }
  }
  assignSubject(code: string, roomNo: number) {
    const subject: Subject = new Subject();
    subject.code = code;
    const classDetail: Class = new Class();
    classDetail.roomNo = roomNo;
    const subjectAssign: SubjectAssign = new SubjectAssign();
    subjectAssign.subject = subject;
    subjectAssign.classDetail = classDetail;
    this.subjectService.assignSubject(subjectAssign).subscribe(response => {
      let responseBody: Response = response;
    }, error => {
      window.alert(error.error.message);
    });
  }
  get standard() {
    return this.AddClassForm.get('standard');
  }
  get section() {
    return this.AddClassForm.get('section')
  }
  get roomNo() {
    return this.AddClassForm.get('roomNo');
  }
}

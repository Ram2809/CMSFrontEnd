import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Class } from 'src/app/model/class';
import { SubjectAssign } from 'src/app/model/subject-assign';
import { ClassService } from 'src/app/services/class.service';
import { Response } from 'src/app/model/response';
import { SubjectService } from 'src/app/services/subject.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { Teacher } from 'src/app/model/teacher';
import { TeacherAssign } from 'src/app/model/teacher-assign';
@Component({
  selector: 'app-staff-assign',
  templateUrl: './staff-assign.component.html',
  styleUrls: ['./staff-assign.component.css']
})
export class StaffAssignComponent implements OnInit {
  public standardList: string[] = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
  public classList: Class[] = [];
  public subjectAssignList: SubjectAssign[] = [];
  public roomNo: number = 0;
  public staffList: Teacher[] = [];

  AssignStaffForm = new FormGroup({
    standard: new FormControl('', Validators.required),
    section: new FormControl('', Validators.required),
    subject: new FormControl('', Validators.required),
    teacher: new FormControl('', Validators.required),
  });

  constructor(private classService: ClassService,
    private subjectService: SubjectService,
    private teacherService: TeacherService) { }

  ngOnInit(): void {
    this.teacherService.getStaffs().subscribe(response => {
      let responseBody: Response = response;
      console.log(responseBody.data);
      this.staffList = responseBody.data;
    }, error => {
      window.alert(error.error.message);
    });
  }
  getSections() {
    this.classService.getClassesByStandard(this.standard?.value).subscribe(response => {
      let responseBody: Response = response;
      this.classList = responseBody.data;
      console.log(this.classList);
    }, error => {
      window.alert(error.error.message);
    });
  }
  getSubjects() {
    let responseBody: Response = new Response();
    this.classService.getClassRoomNo(this.standard?.value, this.section?.value).subscribe(response => {
      let responseBody: Response = response;
      console.log(responseBody.data);
      this.roomNo = responseBody.data;
      this.subjectService.getSubjets(this.roomNo).subscribe(response => {
        let responseBody: Response = response;
        console.log(responseBody.data);
        this.subjectAssignList = responseBody.data;
      }, error => {
        window.alert(error.error.message);
      });
    }, error => {
      window.alert(error.error.message);
    });
  }
  assignStaff() {
    let response: boolean = window.confirm("Are you sure want to continue?");
    if (response) {
      this.subjectService.getAssignId(this.roomNo, this.subject?.value.split("-").shift()).subscribe(response => {
        let responseBody: Response = response;
        console.log(responseBody.data);
        let subjectAssignId = responseBody.data;
        const teacherAssign: TeacherAssign = new TeacherAssign();
        const teacher: Teacher = new Teacher();
        teacher.id = this.teacher?.value.split("-").shift();
        console.log(teacher.id);
        const subjectAssign: SubjectAssign = new SubjectAssign();
        subjectAssign.id = subjectAssignId;
        console.log(subjectAssign.id);
        teacherAssign.teacher = teacher;
        teacherAssign.subjectAssign = subjectAssign;
        console.log(teacherAssign);
        this.teacherService.assignStaff(teacherAssign).subscribe(responseBody => {
          let responseEntity: Response = response;
          console.log(responseEntity.message);
          window.alert(responseEntity.message);
          this.AssignStaffForm.reset();
        }, error => {
          window.alert("Staff Assigned Already!If you want change the staff,Go to edit section!");
        });
      }, error => {
        window.alert(error.error.message);
      });
    }
  }
  get standard() {
    return this.AssignStaffForm.get('standard');
  }
  get section() {
    return this.AssignStaffForm.get('section');
  }
  get subject() {
    return this.AssignStaffForm.get('subject');
  }
  get teacher() {
    return this.AssignStaffForm.get('teacher');
  }
}

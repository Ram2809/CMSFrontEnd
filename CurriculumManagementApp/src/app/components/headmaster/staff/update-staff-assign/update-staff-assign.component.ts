import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Class } from 'src/app/model/class';
import { Response } from 'src/app/model/response';
import { SubjectAssign } from 'src/app/model/subject-assign';
import { Teacher } from 'src/app/model/teacher';
import { TeacherAssign } from 'src/app/model/teacher-assign';
import { ClassService } from 'src/app/services/class.service';
import { SubjectService } from 'src/app/services/subject.service';
import { TeacherService } from 'src/app/services/teacher.service';
@Component({
  selector: 'app-update-staff-assign',
  templateUrl: './update-staff-assign.component.html',
  styleUrls: ['./update-staff-assign.component.css']
})
export class UpdateStaffAssignComponent implements OnInit {

  public standardList: string[] = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
  public classList: Class[] = [];
  public subjectAssignList: SubjectAssign[] = [];
  public roomNo: number = 0;
  public staffList: Teacher[] = [];
  public staff: Teacher = new Teacher();
  public subjectAssignId: number = 0;
  public staffId: number = 0;

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
  getStaff() {
    this.subjectService.getAssignId(this.roomNo, this.subject?.value.split("-").shift()).subscribe(response => {
      let responseBody: Response = response;
      console.log(responseBody.data);
      this.subjectAssignId = responseBody.data;
      this.teacherService.getTeacherId(this.subjectAssignId).subscribe(response => {
        let responseBody: Response = response;
        this.staffId = responseBody.data;
        console.log(this.staffId);
        this.teacherService.getStaff(this.staffId).subscribe(response => {
          let responseBody: Response = response;
          this.staff = responseBody.data;
          console.log(this.staff);
        }, error => {
          window.alert(error.message);
        })
      }, error => {
        window.alert(error.message);
      });
    }, error => {
      window.alert(error.message);
    });
  }
  assignStaff() {
    const teacherAssign:TeacherAssign=new TeacherAssign();
    this.teacherService.updateStaffAssign(this.subjectAssignId,this.teacher?.value.split("-").shift(),teacherAssign).subscribe(response=>{
      let responseBody:Response=response;
      window.alert(responseBody.message);
      this.AssignStaffForm.reset();
    },error=>{
      window.alert(error.message);
    });
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

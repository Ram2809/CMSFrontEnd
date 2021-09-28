import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClassService } from 'src/app/services/class.service';
import { Response } from 'src/app/model/response';
import { Student } from 'src/app/model/student';
import { Class } from 'src/app/model/class';
import { StudentService } from 'src/app/services/student.service';
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  public standardList: string[] = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
  public classList: Class[] = [];
  public response: Response = new Response();
  public roomNo: number | any;
  AddStudentForm = new FormGroup({
    rollNo: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl(''),
    dateOfBirth: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    contactNo: new FormControl('', [Validators.required, Validators.pattern("[0-9]{10}")]),
    address: new FormControl('', Validators.required),
    standard: new FormControl('', Validators.required),
    section: new FormControl('', Validators.required)
  });
  constructor(private classService: ClassService,
    private studentService: StudentService) { }
  ngOnInit(): void {
  }
  addStudent() {
    const student = new Student();
    student.rollNo = this.rollNo?.value;
    student.firstName = this.firstName?.value;
    student.lastName = this.lastName?.value;
    student.dateOfBirth = this.dateOfBirth?.value;
    student.gender = this.gender?.value;
    student.contactNo = this.contactNo?.value;
    student.address = this.address?.value;
    const classDetail = new Class();
    this.classService.getClassRoomNo(this.standard?.value, this.section?.value).subscribe(data => {
      console.log(this.response);
      this.response = data;
      this.roomNo = this.response.data;
      classDetail.roomNo = this.roomNo;
      student.classDetail = classDetail;
      console.log(student);
      this.studentService.addStudent(student).subscribe(data => {
        this.response = data;
        console.log(this.response);
        window.alert(this.response.message);
      })
    })
  }
  getSections() {
    this.classService.getClassesByStandard(this.standard?.value).subscribe(data => {
      console.log(data);
      this.response = data;
      this.classList = this.response.data;
      console.log(this.classList);
    })
  }
  get rollNo() {
    return this.AddStudentForm.get('rollNo');
  }
  get firstName() {
    return this.AddStudentForm.get('firstName');
  }
  get lastName() {
    return this.AddStudentForm.get('lastName');
  }
  get dateOfBirth() {
    return this.AddStudentForm.get('dateOfBirth');
  }
  get gender() {
    return this.AddStudentForm.get('gender')
  }
  get contactNo() {
    return this.AddStudentForm.get('contactNo')
  }
  get address() {
    return this.AddStudentForm.get('address')
  }
  get standard() {
    return this.AddStudentForm.get('standard');
  }
  get section() {
    return this.AddStudentForm.get('section');
  }
}

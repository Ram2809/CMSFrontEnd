import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Class } from 'src/app/model/class';
import { ClassService } from 'src/app/services/class.service';
import { Response } from 'src/app/model/response';
@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css']
})
export class AddClassComponent implements OnInit {

  AddClassForm = new FormGroup({
    standard: new FormControl('', [Validators.required, Validators.maxLength(4)]),
    section: new FormControl('', Validators.required),
    roomNo: new FormControl('', Validators.required),
  });

  constructor(private classService: ClassService) { }

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
        window.alert(responseBody.message);
        this.AddClassForm.reset();
      }, error => {
        window.alert(error.error.message);
      });
    }
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

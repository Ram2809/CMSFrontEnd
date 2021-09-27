import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClassService } from 'src/app/services/class.service';
import { Response } from 'src/app/model/response';
import { Class } from 'src/app/model/class';
@Component({
  selector: 'app-add-timetable',
  templateUrl: './add-timetable.component.html',
  styleUrls: ['./add-timetable.component.css']
})
export class AddTimetableComponent implements OnInit {
  public standardList: string[] = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
  public daysList:string[]=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  public classList:Class[]=[];
  AddTimetableForm=new FormGroup({
    standard:new FormControl('',Validators.required),
    section:new FormControl('',Validators.required),
    day:new FormControl('',Validators.required),
  });
  constructor(private classService:ClassService) { }

  ngOnInit(): void {
  }
  getSections() {
    this.classService.getClassesByStandard(this.standard?.value).subscribe(response=> {
      let responseBody:Response=response;
      this.classList=responseBody.data;
      console.log(this.classList);
    })
  }
  get standard(){
    return this.AddTimetableForm.get('standard');
  }
  get section(){
    return this.AddTimetableForm.get('section');
  }
  get day(){
    return this.AddTimetableForm.get('day');
  }
}

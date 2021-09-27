import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Class } from 'src/app/model/class';
import { ClassService } from 'src/app/services/class.service';
import { SubjectService } from 'src/app/services/subject.service';
import { Response } from 'src/app/model/response';
import { SubjectAssign } from 'src/app/model/subject-assign';
import { Subject } from 'src/app/model/subject';
@Component({
  selector: 'app-view-subjects',
  templateUrl: './view-subjects.component.html',
  styleUrls: ['./view-subjects.component.css']
})
export class ViewSubjectsComponent implements OnInit {
  public standardList: string[] = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
  public subjectAssignList:SubjectAssign[]=[];
  public subject:Subject=new Subject();
  public isHidden:boolean=false;
  public subjectAssign:SubjectAssign=new SubjectAssign();
  ViewSubjectsForm=new FormGroup({
    standard:new FormControl('',Validators.required),
    option:new FormControl(''),
  });
  constructor(private router:Router,
    private subjectService:SubjectService,
    private classService:ClassService) { }

  ngOnInit(): void {
  }
  getSubjects()
  {
    let responseBody:Response=new Response();
    let classList:Class[]=[];
    this.classService.getClassesByStandard(this.standard?.value).subscribe(response=>{
      responseBody=response;
      classList=responseBody.data;
      this.subjectService.getSubjets(Number(classList[0].roomNo)).subscribe(response=>{
        responseBody=response;
        console.log(response.data);
        this.subjectAssignList=responseBody.data;
        this.isHidden=true;
      });
    });

  }
  deleteSubject()
  {
    console.log(this.option?.value);
    this.subjectService.deleteSubject(this.option?.value).subscribe(response=>{
      let responseBody:Response=response;
      window.alert(responseBody.message);
    })
  }
  updateSubject()
  {
    localStorage.setItem('subjectCode',this.option?.value);
    this.router.navigate(['admin/updatesubject']);
  }
  backToMain(){
    this.router.navigate(['admin']);
  }
  get standard(){
    return this.ViewSubjectsForm.get('standard');
  }
  get option(){
    return this.ViewSubjectsForm.get('option');
  }
}

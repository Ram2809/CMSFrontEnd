import { Component, OnInit } from '@angular/core';
import { Subject } from 'src/app/model/subject';
import { SubjectService } from 'src/app/services/subject.service';
import { Response } from 'src/app/model/response';
import { Router } from '@angular/router';
@Component({
  selector: 'app-update-subject',
  templateUrl: './update-subject.component.html',
  styleUrls: ['./update-subject.component.css']
})
export class UpdateSubjectComponent implements OnInit {
  public subject:Subject=new Subject();
  public code:string="";
  constructor(private subjectService:SubjectService,
    private router:Router) { }

  ngOnInit(): void {
    this.code=String(localStorage.getItem('subjectCode'));
    console.log(this.code);
    this.subjectService.getSubject(this.code).subscribe(response=>{
      let responseBody:Response=response;
      this.subject=responseBody.data;
      console.log(this.subject);
    });
  }
  updateSubject()
  {
    this.subjectService.updateSubject(this.code,this.subject).subscribe(response=>{
      let responseBody:Response=response;
      window.alert(responseBody.message);
      this.router.navigate(['admin/viewsubjects']);
    });
  }
}

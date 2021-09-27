import { Component, OnInit } from '@angular/core';
import { Class } from 'src/app/model/class';
import { ClassService } from 'src/app/services/class.service';
import { Router } from '@angular/router';
import { Response } from 'src/app/model/response';
@Component({
  selector: 'app-view-class',
  templateUrl: './view-class.component.html',
  styleUrls: ['./view-class.component.css']
})
export class ViewClassComponent implements OnInit {
  public response:Response=new Response();
  public classList:Class[]=[];
  public roomNo:number=0;
  constructor(private classService:ClassService,private router:Router) { }
  ngOnInit(): void {
    this.classService.getAllClasses().subscribe(data=>{
      this.response=data;
      this.classList=this.response.data;
      console.log(this.classList);
    })
  }
  updateClass()
  {
    console.log(this.roomNo);
    //localStorage.setItem('roomNo',JSON.stringify(this.roomNo));
    this.router.navigate(['/updateclass',this.roomNo]);
  }
  // deleteClass()
  // {
  //   this.classService.deleteClass(this.roomNo).subscribe(data=>{
  //     console.log(data);
  //     this.response=data;
  //     window.alert(this.response.message);
  //     this.ngOnInit();
  //   })
  // }
  backToMain()
  {
    this.router.navigate(['admin'])
  }
}

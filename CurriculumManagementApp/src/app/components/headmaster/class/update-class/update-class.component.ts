import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Class } from 'src/app/model/class';
import { ClassService } from 'src/app/services/class.service';
import { Response } from 'src/app/model/response';
@Component({
  selector: 'app-update-class',
  templateUrl: './update-class.component.html',
  styleUrls: ['./update-class.component.css']
})
export class UpdateClassComponent implements OnInit {

  public classDetail:Class|any;
  public roomNo:number=0;
  public response:Response=new Response();
  constructor(private classService:ClassService,
    private route:ActivatedRoute,
    private router:Router) { }
  ngOnInit(): void {
    this.classDetail=new Class()
    this.roomNo=this.route.snapshot.params['roomNo']
    this.classService.getClass(this.roomNo).subscribe(data=>{
      console.log(data);
      this.response=data
      this.classDetail=this.response.data
      console.log(this.classDetail);
    })
  }
  updateClass()
  {
    console.log(this.roomNo)
    console.log(this.classDetail)
      this.classService.updateClass(this.roomNo,this.classDetail).subscribe(data=>{
        console.log(data)
        this.response=data
        window.alert(this.response.message)
        this.router.navigate(['viewclass'])
      }) 
  }
}

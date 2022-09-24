import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AllstudentService } from '../allstudent.service';

@Component({
  selector: 'app-studentdetails',
  templateUrl: './studentdetails.component.html',
  styleUrls: ['./studentdetails.component.css']
})
export class StudentdetailsComponent implements OnInit {
  public studentdetails:any={};
  constructor(private activatedRoute:ActivatedRoute,private allstudentService:AllstudentService) 
  {
    this.activatedRoute.params.subscribe(
      (data:any)=>{
        console.log(data.id);
        this.getstudentdetails(data.id);
      }
     
    )
   }
   getstudentdetails(id:string)
   {
     this.allstudentService.getstudentdetails(id).subscribe(
       (data:any)=>{
         this.studentdetails=data;
       }
     )
   }

  ngOnInit(): void {
  }

}

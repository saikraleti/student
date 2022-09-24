import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllstudentService } from '../allstudent.service';

@Component({
  selector: 'app-allstudent',
  templateUrl: './allstudent.component.html',
  styleUrls: ['./allstudent.component.css']
})
export class AllstudentComponent implements OnInit {
  public allstudents:any=[];
  public term:string="";
  public column:string="";
  public order:string="";
  public pageno:number=0;
  public limit:number=0;

  constructor(private allstudentService:AllstudentService,private router:Router) { 
    this.allstudentService.getallstudents()
    .subscribe(
      (data:any)=>{
        console.log(data,'data got in all students')
        this.allstudents=data;
      },
        (err:any)=>{
          alert("internal server error")
        }
        )  
  }
  filter()
  {
    this.allstudentService.filteredallstudents(this.term)
      .subscribe(
        (data:any)=>{
          this.allstudents=data;
        },
        (err:any)=>{
          alert("data not found")
        }
      )

  }
  delete(id:string)
  {
    this.allstudentService.deleteallstudents(id)
    .subscribe(
      (data:any)=>{
        alert("deleted successfully");
        location.reload();
      },
      (err:any)=>{
        alert("internal server error")
      }
    )
  }
  sort()
  {
    this.allstudentService.sortedallstudents(this.column,this.order)
    .subscribe(
      (data:any)=>{
        this.allstudents=data;
      },
      (err:any)=>{
        alert("not found")
      }
    )
  } 
  page()
  {
    this.allstudentService.pagedallstudents(this.pageno,this.limit)
    .subscribe(
      (data:any)=>{
        this.allstudents=data;
      },
      (err:any)=>{
        alert("not found")
      }
    )
  }
     View(id:String)
    {
      this.router.navigateByUrl('/dashboard/studentdetails/'+id)
    }
     edit(id:string)
     {
      this.router.navigateByUrl('/dashboard/editstudent/'+id);
     }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { max, min } from 'rxjs';
import { AllstudentService } from '../allstudent.service';

@Component({
  selector: 'app-createstudent',
  templateUrl: './createstudent.component.html',
  styleUrls: ['./createstudent.component.css']
})
export class CreatestudentComponent implements OnInit {
  public allstudentForm:FormGroup=new FormGroup({
    name:new FormControl(null,[Validators.required]),
    id:new FormControl(),
    gender:new FormControl(null,[Validators.required]),
    mobile:new FormControl(null,[Validators.required]),
    email:new FormControl(null,[Validators.required]),
    batch:new FormControl(),
   
    address:new FormGroup({
      city:new FormControl(null,[Validators.required]),
      mandal:new FormControl(null,[Validators.required]),
      district:new FormControl(null,[Validators.required]),
      state:new FormControl(null,[Validators.required]),
      pincode:new FormControl(null,[Validators.required])}),
    
    educations:new FormArray([]),
    company:new FormGroup({
      companyname:new FormControl(),
      location:new FormControl(),
      package:new FormControl(),
      offerDate:new FormControl()}),

    sourcetype:new FormControl(),
  })
    
  public id:string="";
  public isEdit:boolean=false;

  constructor(private allstudentService:AllstudentService,private activatedRoute:ActivatedRoute)
   {
    this.allstudentForm.get('sourcetype')?.valueChanges.subscribe
    (
      (data:any)=>
      {
        if(data=='direct')
        {
          this.allstudentForm.addControl('direct',new FormControl());
          this.allstudentForm.removeControl('referalName');
        }
        else
        {
          this.allstudentForm.addControl('referalName',new FormControl());
          this.allstudentForm.removeControl('direct');
        }
      }
    )

    this.activatedRoute.params.subscribe(
      (data:any)=>
      {
       if(data.id)
       {
        this.id=data.id;
        this.isEdit=true;
        this.getallstudentdetails(data.id);
       }
       
      }
    )
    }

    getallstudentdetails(id:string)
    {
      return this.allstudentService.getstudentdetails(id).subscribe
      (
        (data:any)=>
        {

          for (let education of data.educations){
            this.add();
          }

          console.log(data,  this.allstudentForm.value);

          this.allstudentForm.patchValue(data);

        }
      
      )

    }

     getstudentdetails(id:string)
    {
      this.allstudentService.getstudentdetails(id).subscribe(
        (data:any)=>{
          this.allstudentForm.patchValue(data);
        }
      )
    }
    get educationFormArray()
    {
      return this.allstudentForm.get('educations') as FormArray
    }
    add()
    {
      this.educationFormArray.push
      (
        new FormGroup({
          qualification:new FormControl(),
          year:new FormControl(),
          percentage:new FormControl(null,[Validators.required,Validators.min(0),Validators.max(100)])
        })
      )
    }
    delete(i:number)
    {
      this.educationFormArray.removeAt(i);
    }
    submit()
    {
      if(this.isEdit)
      {
      this.allstudentService.updateallstudent(this.id,this.allstudentForm.value).subscribe
      (
        (data:any)=>{
         alert("added successfully")
        },
        (err:any)=>
        {
         alert("internal error occurred")
        }
      )
      }
      else
      {
      this.allstudentService.createstudentdetails(this.allstudentForm.value).subscribe
      (
        (data:any)=>{
         alert("added successfully")
        },
        (err:any)=>
        {
         alert("internal error occurred")
        }
      )
      }
    }

  ngOnInit(): void {
  }

}

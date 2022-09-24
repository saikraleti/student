import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm:FormGroup= new FormGroup({
    username:new FormControl(),
    password:new FormControl()
  })
  constructor(private loginService:LoginService,private router:Router) { }
  submit()
  {
    console.log(this.loginForm.value)
    this.loginService.createlogin(this.loginForm.value)
    .subscribe(
      
        (data:any)=>
        {
          alert("login successfull")
          localStorage.setItem("my-app-token",data.token);
          this.router.navigateByUrl('/dashboard')
        },
        (err:any)=>
        {
          alert("invalid email or password")
        }
      
    )
  }
  ngOnInit(): void {
  }

}

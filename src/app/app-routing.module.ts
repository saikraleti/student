import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllstudentComponent } from './allstudent/allstudent.component';
import { AuthGuard } from './auth.guard';
import { CreatestudentComponent } from './createstudent/createstudent.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { NotifyGuard } from './notify.guard';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { StudentdetailsComponent } from './studentdetails/studentdetails.component';

const routes: Routes = [ 
  {path:'login',component:LoginComponent},
  {path:"dashboard",component:DashboardComponent,canActivate:[AuthGuard],children:[
    {path:"allstudent",component:AllstudentComponent},
    {path:"createstudent",component:CreatestudentComponent,canDeactivate:[NotifyGuard]},
    {path:"studentdetails/:id",component:StudentdetailsComponent},
    {path:"editstudent/:id",component:CreatestudentComponent}
  ]},
  {path:"",component:LoginComponent},
  {path:"**",component:PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

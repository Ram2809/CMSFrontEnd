import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/headmaster/admin-dashboard/admin-dashboard.component';
import { AddClassComponent } from './components/headmaster/class/add-class/add-class.component';
import { UpdateClassComponent } from './components/headmaster/class/update-class/update-class.component';
import { ViewClassComponent } from './components/headmaster/class/view-class/view-class.component';
import { AddStudentComponent } from './components/headmaster/student/add-student/add-student.component';
import { ViewStudentsComponent } from './components/headmaster/student/view-students/view-students.component';
import { AddAddressComponent } from './components/teacher/profile/add-address/add-address.component';
import { TeacherSignupComponent } from './components/teacher/profile/teacher-signup/teacher-signup.component';


const routes: Routes = [
  {path:'admin',component:AdminDashboardComponent},
  {path:'addclass',component:AddClassComponent},
  {path:'viewclass',component:ViewClassComponent},
  {path:'updateclass/:roomNo',component:UpdateClassComponent},
  {path:'addstudent',component:AddStudentComponent},
  {path:'viewstudents',component:ViewStudentsComponent},
  {path:'teacher/signup',component:TeacherSignupComponent},
  {path:'teacher/addaddress/:id',component:AddAddressComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

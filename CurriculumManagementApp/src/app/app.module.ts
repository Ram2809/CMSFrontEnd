import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddClassComponent } from './components/headmaster/class/add-class/add-class.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminDashboardComponent } from './components/headmaster/admin-dashboard/admin-dashboard.component';
import { ViewClassComponent } from './components/headmaster/class/view-class/view-class.component';
import { UpdateClassComponent } from './components/headmaster/class/update-class/update-class.component';
import { AddStudentComponent } from './components/headmaster/student/add-student/add-student.component';
import { ViewStudentsComponent } from './components/headmaster/student/view-students/view-students.component';
import { TeacherSignupComponent } from './components/teacher/profile/teacher-signup/teacher-signup.component';
import { AddAddressComponent } from './components/teacher/profile/add-address/add-address.component';
import { AddLoginDataComponent } from './components/teacher/profile/add-login-data/add-login-data.component';
@NgModule({
  declarations: [
    AppComponent,
    AddClassComponent,
    AdminDashboardComponent,
    ViewClassComponent,
    UpdateClassComponent,
    AddStudentComponent,
    ViewStudentsComponent,
    TeacherSignupComponent,
    AddAddressComponent,
    AddLoginDataComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

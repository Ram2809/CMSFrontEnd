import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
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
import { AddSubjectComponent } from './components/headmaster/subject/add-subject/add-subject.component';
import { ViewSubjectsComponent } from './components/headmaster/subject/view-subjects/view-subjects.component';
import { UpdateSubjectComponent } from './components/headmaster/subject/update-subject/update-subject.component';
import { AddTopicComponent } from './components/headmaster/topic/add-topic/add-topic.component';
import { ViewTopicsComponent } from './components/headmaster/topic/view-topics/view-topics.component';
import { UpdateTopicComponent } from './components/headmaster/topic/update-topic/update-topic.component';
import { AddTimetableComponent } from './components/headmaster/timetable/add-timetable/add-timetable.component';
import { AddDiscussionComponent } from './components/teacher/discussion/add-discussion/add-discussion.component';
import { StaffAssignComponent } from './components/headmaster/staff/staff-assign/staff-assign.component';
import { ViewstaffsComponent } from './components/headmaster/staff/viewstaffs/viewstaffs.component';
import { ViewDiscussionComponent } from './components/teacher/discussion/view-discussion/view-discussion.component';
import { UpdateDiscussionComponent } from './components/teacher/discussion/update-discussion/update-discussion.component';
import { ViewDiscussionsComponent } from './components/headmaster/discussion/view-discussions/view-discussions.component';
import { ViewTimetableComponent } from './components/headmaster/timetable/view-timetable/view-timetable.component';
import { DropdownListModule } from 'ngx-dropdown-list';
import { UpdateTimetableComponent } from './components/headmaster/timetable/update-timetable/update-timetable.component';
import { ViewTeachersComponent } from './components/headmaster/staff/view-teachers/view-teachers.component';
import { AdminSignupComponent } from './components/headmaster/profile/admin-signup/admin-signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from "@angular/material/dialog";
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
    AddSubjectComponent,
    ViewSubjectsComponent,
    UpdateSubjectComponent,
    AddTopicComponent,
    ViewTopicsComponent,
    UpdateTopicComponent,
    AddTimetableComponent,
    AddDiscussionComponent,
    StaffAssignComponent,
    ViewstaffsComponent,
    ViewDiscussionComponent,
    UpdateDiscussionComponent,
    ViewDiscussionsComponent,
    ViewTimetableComponent,
    UpdateTimetableComponent,
    ViewTeachersComponent,
    AdminSignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    DropdownListModule,
    BrowserAnimationsModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[UpdateTopicComponent]
})
export class AppModule { }

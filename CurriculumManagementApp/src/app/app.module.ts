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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from "@angular/material/dialog";
import { AddTopicStatusComponent } from './components/teacher/topic/add-topic-status/add-topic-status.component';
import { ViewTopicStatusComponent } from './components/teacher/topic/view-topic-status/view-topic-status.component';
import { UpdateTopicStatusComponent } from './components/teacher/topic/update-topic-status/update-topic-status.component';
import { ViewSyllabusComponent } from './components/teacher/topic/view-syllabus/view-syllabus.component';
import { ViewStudentComponent } from './components/teacher/student/view-student/view-student.component';
import { StaffViewTimetableComponent } from './components/teacher/timetable/staff-view-timetable/staff-view-timetable.component';
import { TopicStatusComponent } from './components/headmaster/topic/topic-status/topic-status.component';
import { AdminForgotPasswordComponent } from './components/home/headmaster/admin-forgot-password/admin-forgot-password.component';
import { AdminLoginComponent } from './components/home/headmaster/admin-login/admin-login.component';
import { AdminSignupComponent } from './components/home/headmaster/admin-signup/admin-signup.component';
import { HomeComponent } from './components/home/home/home.component';
import { AdminViewProfileComponent } from './components/headmaster/profile/admin-view-profile/admin-view-profile.component';
import { AdminUpdateProfileComponent } from './components/headmaster/profile/admin-update-profile/admin-update-profile.component';
import { TeacherDashboardComponent } from './components/teacher/teacher-dashboard/teacher-dashboard.component';
import { TeacherLoginComponent } from './components/home/teacher/teacher-login/teacher-login.component';
import { TeacherForgotpasswordComponent } from './components/home/teacher/teacher-forgotpassword/teacher-forgotpassword.component';
import { AddAddressComponent } from './components/home/teacher/add-address/add-address.component';
import { AddLoginDataComponent } from './components/home/teacher/add-login-data/add-login-data.component';
import { TeacherSignupComponent } from './components/home/teacher/teacher-signup/teacher-signup.component';
import { StaffViewProfileComponent } from './components/teacher/profile/staff-view-profile/staff-view-profile.component';
import { StaffUpdateProfileComponent } from './components/teacher/profile/staff-update-profile/staff-update-profile.component';

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
    AddTopicStatusComponent,
    ViewTopicStatusComponent,
    UpdateTopicStatusComponent,
    ViewSyllabusComponent,
    ViewStudentComponent,
    StaffViewTimetableComponent,
    TopicStatusComponent,
    AdminLoginComponent,
    AdminForgotPasswordComponent,
    HomeComponent,
    AdminViewProfileComponent,
    AdminUpdateProfileComponent,
    TeacherDashboardComponent,
    TeacherLoginComponent,
    TeacherForgotpasswordComponent,
    StaffViewProfileComponent,
    StaffUpdateProfileComponent,
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
  entryComponents: [UpdateTopicComponent,
    UpdateTopicStatusComponent,
    AdminForgotPasswordComponent,
  ]
})
export class AppModule { }

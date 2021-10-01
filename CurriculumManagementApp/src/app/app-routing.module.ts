import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/headmaster/admin-dashboard/admin-dashboard.component';
import { AddClassComponent } from './components/headmaster/class/add-class/add-class.component';
import { UpdateClassComponent } from './components/headmaster/class/update-class/update-class.component';
import { ViewClassComponent } from './components/headmaster/class/view-class/view-class.component';
import { ViewDiscussionsComponent } from './components/headmaster/discussion/view-discussions/view-discussions.component';
import { AdminViewProfileComponent } from './components/headmaster/profile/admin-view-profile/admin-view-profile.component';
import { StaffAssignComponent } from './components/headmaster/staff/staff-assign/staff-assign.component';
import { ViewTeachersComponent } from './components/headmaster/staff/view-teachers/view-teachers.component';
import { ViewstaffsComponent } from './components/headmaster/staff/viewstaffs/viewstaffs.component';
import { AddStudentComponent } from './components/headmaster/student/add-student/add-student.component';
import { ViewStudentsComponent } from './components/headmaster/student/view-students/view-students.component';
import { AddSubjectComponent } from './components/headmaster/subject/add-subject/add-subject.component';
import { UpdateSubjectComponent } from './components/headmaster/subject/update-subject/update-subject.component';
import { ViewSubjectsComponent } from './components/headmaster/subject/view-subjects/view-subjects.component';
import { AddTimetableComponent } from './components/headmaster/timetable/add-timetable/add-timetable.component';
import { UpdateTimetableComponent } from './components/headmaster/timetable/update-timetable/update-timetable.component';
import { ViewTimetableComponent } from './components/headmaster/timetable/view-timetable/view-timetable.component';
import { AddTopicComponent } from './components/headmaster/topic/add-topic/add-topic.component';
import { TopicStatusComponent } from './components/headmaster/topic/topic-status/topic-status.component';
import { UpdateTopicComponent } from './components/headmaster/topic/update-topic/update-topic.component';
import { ViewTopicsComponent } from './components/headmaster/topic/view-topics/view-topics.component';
import { AdminForgotPasswordComponent } from './components/home/headmaster/admin-forgot-password/admin-forgot-password.component';
import { AdminLoginComponent } from './components/home/headmaster/admin-login/admin-login.component';
import { AdminSignupComponent } from './components/home/headmaster/admin-signup/admin-signup.component';
import { HomeComponent } from './components/home/home/home.component';
import { AddAddressComponent } from './components/home/teacher/add-address/add-address.component';
import { AddLoginDataComponent } from './components/home/teacher/add-login-data/add-login-data.component';
import { TeacherForgotpasswordComponent } from './components/home/teacher/teacher-forgotpassword/teacher-forgotpassword.component';
import { TeacherLoginComponent } from './components/home/teacher/teacher-login/teacher-login.component';
import { TeacherSignupComponent } from './components/home/teacher/teacher-signup/teacher-signup.component';
import { AddDiscussionComponent } from './components/teacher/discussion/add-discussion/add-discussion.component';
import { UpdateDiscussionComponent } from './components/teacher/discussion/update-discussion/update-discussion.component';
import { ViewDiscussionComponent } from './components/teacher/discussion/view-discussion/view-discussion.component';
import { StaffViewProfileComponent } from './components/teacher/profile/staff-view-profile/staff-view-profile.component';
import { ViewStudentComponent } from './components/teacher/student/view-student/view-student.component';
import { TeacherDashboardComponent } from './components/teacher/teacher-dashboard/teacher-dashboard.component';
import { StaffViewTimetableComponent } from './components/teacher/timetable/staff-view-timetable/staff-view-timetable.component';
import { AddTopicStatusComponent } from './components/teacher/topic/add-topic-status/add-topic-status.component';
import { UpdateTopicStatusComponent } from './components/teacher/topic/update-topic-status/update-topic-status.component';
import { ViewSyllabusComponent } from './components/teacher/topic/view-syllabus/view-syllabus.component';
import { ViewTopicStatusComponent } from './components/teacher/topic/view-topic-status/view-topic-status.component';


const routes: Routes = [
  {
    path: 'admin', component: AdminDashboardComponent, children: [
      { path: 'addclass', component: AddClassComponent },
      {
        path: 'viewclass', component: ViewClassComponent, children: [
          { path: 'updateclass/:roomNo', component: UpdateClassComponent },
        ]
      },
      { path: 'addstudent', component: AddStudentComponent },
      { path: 'viewstudents', component: ViewStudentsComponent },
      { path: 'addsubject', component: AddSubjectComponent },
      { path: 'viewsubjects', component: ViewSubjectsComponent },
      { path: 'updatesubject', component: UpdateSubjectComponent },
      { path: 'addtopic', component: AddTopicComponent },
      { path: 'viewtopics', component: ViewTopicsComponent },
      { path: 'updatetopic', component: UpdateTopicComponent },
      { path: 'addtimetable', component: AddTimetableComponent },
      { path: 'staffassign', component: StaffAssignComponent },
      { path: 'viewstaffs', component: ViewstaffsComponent },
      { path: 'viewdiscussions', component: ViewDiscussionsComponent },
      { path: 'viewtimetable', component: ViewTimetableComponent },
      { path: 'updatetimetable', component: UpdateTimetableComponent },
      { path: 'viewteachers', component: ViewTeachersComponent },
      { path: 'viewtopicstatus', component: TopicStatusComponent },
      {path:'viewprofile',component:AdminViewProfileComponent},
    ]
  },
  {path:'home',component:HomeComponent,
  children:[
    {path:'admin/signup',component:AdminSignupComponent},
    {path:'admin/login',component:AdminLoginComponent},
    {path:'admin/forgotpassword',component:AdminForgotPasswordComponent},
    {path:'teacher/login',component:TeacherLoginComponent},
    {path:'teacher/forgotpassword',component:TeacherForgotpasswordComponent}
  ]},
  {path:'teacher',component:TeacherDashboardComponent,children:[

  { path: 'adddiscussion', component: AddDiscussionComponent },

  { path: 'viewdiscussion', component: ViewDiscussionComponent },
  { path: 'updatediscussion', component: UpdateDiscussionComponent },

  { path: 'addtopicstatus', component: AddTopicStatusComponent },
  { path: 'viewtopicstatus', component: ViewTopicStatusComponent },
  { path: 'updatetopicstatus', component: UpdateTopicStatusComponent },
  { path: 'viewsyllabus', component: ViewSyllabusComponent },
  { path: 'viewstudents', component: ViewStudentComponent },
  { path: 'viewtimetable', component: StaffViewTimetableComponent },
  {path:'viewprofile',component:StaffViewProfileComponent},
]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

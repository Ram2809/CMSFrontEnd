import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/headmaster/admin-dashboard/admin-dashboard.component';
import { AddClassComponent } from './components/headmaster/class/add-class/add-class.component';
import { UpdateClassComponent } from './components/headmaster/class/update-class/update-class.component';
import { ViewClassComponent } from './components/headmaster/class/view-class/view-class.component';
import { ViewDiscussionsComponent } from './components/headmaster/discussion/view-discussions/view-discussions.component';
import { AdminSignupComponent } from './components/headmaster/profile/admin-signup/admin-signup.component';
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
import { UpdateTopicComponent } from './components/headmaster/topic/update-topic/update-topic.component';
import { ViewTopicsComponent } from './components/headmaster/topic/view-topics/view-topics.component';
import { AddDiscussionComponent } from './components/teacher/discussion/add-discussion/add-discussion.component';
import { UpdateDiscussionComponent } from './components/teacher/discussion/update-discussion/update-discussion.component';
import { ViewDiscussionComponent } from './components/teacher/discussion/view-discussion/view-discussion.component';
import { AddAddressComponent } from './components/teacher/profile/add-address/add-address.component';
import { AddLoginDataComponent } from './components/teacher/profile/add-login-data/add-login-data.component';
import { TeacherSignupComponent } from './components/teacher/profile/teacher-signup/teacher-signup.component';

const routes: Routes = [
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'addclass', component: AddClassComponent },
  { path: 'viewclass', component: ViewClassComponent },
  { path: 'updateclass/:roomNo', component: UpdateClassComponent },
  { path: 'addstudent', component: AddStudentComponent },
  { path: 'viewstudents', component: ViewStudentsComponent },
  { path: 'teacher/signup', component: TeacherSignupComponent },
  { path: 'teacher/addaddress/:id', component: AddAddressComponent },
  { path: 'teacher/addlogin/:id', component: AddLoginDataComponent },
  { path: 'admin/addsubject', component: AddSubjectComponent },
  { path: 'admin/viewsubjects', component: ViewSubjectsComponent },
  { path: 'admin/updatesubject', component: UpdateSubjectComponent },
  { path: 'admin/addtopic', component: AddTopicComponent },
  { path: 'admin/viewtopics', component: ViewTopicsComponent },
  { path: 'admin/updatetopic', component: UpdateTopicComponent },
  { path: 'admin/addtimetable', component: AddTimetableComponent },
  { path: 'teacher/adddiscussion', component: AddDiscussionComponent },
  { path: 'admin/staffassign', component: StaffAssignComponent },
  { path: 'admin/viewstaffs', component: ViewstaffsComponent },
  {path:'teacher/viewdiscussion',component:ViewDiscussionComponent},
  {path:'teacher/updatediscussion',component:UpdateDiscussionComponent},
  {path:'admin/viewdiscussions',component:ViewDiscussionsComponent},
  {path:'admin/viewtimetable',component:ViewTimetableComponent},
  {path:'admin/updatetimetable',component:UpdateTimetableComponent},
  {path:'viewteachers',component:ViewTeachersComponent},
  {path:'admin/signup',component:AdminSignupComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

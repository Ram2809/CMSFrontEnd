import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/headmaster/admin-dashboard/admin-dashboard.component';
import { AddClassComponent } from './components/headmaster/class/add-class/add-class.component';
import { UpdateClassComponent } from './components/headmaster/class/update-class/update-class.component';
import { ViewClassComponent } from './components/headmaster/class/view-class/view-class.component';
import { ViewDiscussionsComponent } from './components/headmaster/discussion/view-discussions/view-discussions.component';
import { AddMajorComponent } from './components/headmaster/major/add-major/add-major.component';
import { ViewMajorsComponent } from './components/headmaster/major/view-majors/view-majors.component';
import { AdminViewProfileComponent } from './components/headmaster/profile/admin-view-profile/admin-view-profile.component';
import { ViewQualificationsComponent } from './components/headmaster/qualification/view-qualifications/view-qualifications.component';
import { StaffAssignComponent } from './components/headmaster/staff/staff-assign/staff-assign.component';
import { UpdateStaffAssignComponent } from './components/headmaster/staff/update-staff-assign/update-staff-assign.component';
import { ViewTeachersComponent } from './components/headmaster/staff/view-teachers/view-teachers.component';
import { ViewstaffsComponent } from './components/headmaster/staff/viewstaffs/viewstaffs.component';
import { AddStudentComponent } from './components/headmaster/student/add-student/add-student.component';
import { UpdateStudentComponent } from './components/headmaster/student/update-student/update-student.component';
import { ViewStudentsComponent } from './components/headmaster/student/view-students/view-students.component';
import { AddSubjectComponent } from './components/headmaster/subject/add-subject/add-subject.component';
import { UpdateSubjectComponent } from './components/headmaster/subject/update-subject/update-subject.component';
import { ViewSubjectsComponent } from './components/headmaster/subject/view-subjects/view-subjects.component';
import { AddTimetableComponent } from './components/headmaster/timetable/add-timetable/add-timetable.component';
import { UpdateTimetableComponent } from './components/headmaster/timetable/update-timetable/update-timetable.component';
import { ViewTimetableComponent } from './components/headmaster/timetable/view-timetable/view-timetable.component';
import { AddTopicComponent } from './components/headmaster/topic/add-topic/add-topic.component';
import { ViewTopicsComponent } from './components/headmaster/topic/view-topics/view-topics.component';
import { AddUnitComponent } from './components/headmaster/unit/add-unit/add-unit.component';
import { UnitStatusComponent } from './components/headmaster/unit/unit-status/unit-status.component';
import { UpdateUnitComponent } from './components/headmaster/unit/update-unit/update-unit.component';
import { ViewUnitsComponent } from './components/headmaster/unit/view-units/view-units.component';
import { AdminForgotPasswordComponent } from './components/home/headmaster/admin-forgot-password/admin-forgot-password.component';
import { AdminLoginComponent } from './components/home/headmaster/admin-login/admin-login.component';
import { AdminSignupComponent } from './components/home/headmaster/admin-signup/admin-signup.component';
import { HomeComponent } from './components/home/home/home.component';
import { TeacherForgotpasswordComponent } from './components/home/teacher/teacher-forgotpassword/teacher-forgotpassword.component';
import { TeacherLoginComponent } from './components/home/teacher/teacher-login/teacher-login.component';
import { AddDiscussionComponent } from './components/teacher/discussion/add-discussion/add-discussion.component';
import { UpdateDiscussionComponent } from './components/teacher/discussion/update-discussion/update-discussion.component';
import { ViewDiscussionComponent } from './components/teacher/discussion/view-discussion/view-discussion.component';
import { StaffViewProfileComponent } from './components/teacher/profile/staff-view-profile/staff-view-profile.component';
import { ViewAssignedSubjectsComponent } from './components/teacher/profile/view-assigned-subjects/view-assigned-subjects.component';
import { ViewStudentComponent } from './components/teacher/student/view-student/view-student.component';
import { TeacherDashboardComponent } from './components/teacher/teacher-dashboard/teacher-dashboard.component';
import { StaffViewTimetableComponent } from './components/teacher/timetable/staff-view-timetable/staff-view-timetable.component';
import { AddUnitStatusComponent } from './components/teacher/unit/add-unit-status/add-unit-status.component';
import { UpdateUnitStatusComponent } from './components/teacher/unit/update-unit-status/update-unit-status.component';
import { ViewSyllabusComponent } from './components/teacher/unit/view-syllabus/view-syllabus.component';
import { ViewUnitStatusComponent } from './components/teacher/unit/view-unit-status/view-unit-status.component';

const routes: Routes = [
  {
    path: 'admin', component: AdminDashboardComponent,
    children: [
      { path: 'addclass', component: AddClassComponent },
      { path: 'viewclass', component: ViewClassComponent },
      { path: 'updateclass/:roomNo', component: UpdateClassComponent },
      { path: 'addstudent', component: AddStudentComponent },
      { path: 'viewstudents', component: ViewStudentsComponent },
      { path: 'addsubject', component: AddSubjectComponent },
      { path: 'viewsubjects', component: ViewSubjectsComponent },
      { path: 'updatesubject', component: UpdateSubjectComponent },
      { path: 'addunit', component: AddUnitComponent },
      { path: 'viewunits', component: ViewUnitsComponent },
      { path: 'updateunit', component: UpdateUnitComponent },
      { path: 'addtimetable', component: AddTimetableComponent },
      { path: 'staffassign', component: StaffAssignComponent },
      { path: 'viewstaffs', component: ViewstaffsComponent },
      { path: 'viewdiscussions', component: ViewDiscussionsComponent },
      { path: 'viewtimetable', component: ViewTimetableComponent },
      { path: 'updatetimetable', component: UpdateTimetableComponent },
      { path: 'viewteachers', component: ViewTeachersComponent },
      { path: 'viewunitstatus', component: UnitStatusComponent },
      { path: 'viewprofile', component: AdminViewProfileComponent },
      { path: 'admin/updatestudent', component: UpdateStudentComponent },
      { path: 'updatestaffassign', component: UpdateStaffAssignComponent },
      { path: 'addtopic', component: AddTopicComponent },
      { path: 'viewtopics', component: ViewTopicsComponent },
      { path: 'addmajor', component: AddMajorComponent },
      { path: 'viewmajors', component: ViewMajorsComponent },
      { path: 'viewqualifications', component: ViewQualificationsComponent },
    ]
  },
  {
    path: 'home', component: HomeComponent,
    children: [
      { path: 'admin/signup', component: AdminSignupComponent },
      { path: 'admin/login', component: AdminLoginComponent },
      { path: 'admin/forgotpassword', component: AdminForgotPasswordComponent },
      { path: 'teacher/login', component: TeacherLoginComponent },
      { path: 'teacher/forgotpassword', component: TeacherForgotpasswordComponent }
    ]
  },
  {
    path: 'teacher', component: TeacherDashboardComponent,
    children: [
      { path: 'adddiscussion', component: AddDiscussionComponent },
      { path: 'viewdiscussion', component: ViewDiscussionComponent },
      { path: 'updatediscussion', component: UpdateDiscussionComponent },
      { path: 'addunitstatus', component: AddUnitStatusComponent },
      { path: 'viewunitstatus', component: ViewUnitStatusComponent },
      { path: 'updateunitstatus', component: UpdateUnitStatusComponent },
      { path: 'viewsyllabus', component: ViewSyllabusComponent },
      { path: 'viewstudents', component: ViewStudentComponent },
      { path: 'viewtimetable', component: StaffViewTimetableComponent },
      { path: 'viewprofile', component: StaffViewProfileComponent },
      { path: 'viewassignedsubjects', component: ViewAssignedSubjectsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

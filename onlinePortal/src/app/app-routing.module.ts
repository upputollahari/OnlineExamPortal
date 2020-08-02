import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { NewExamComponent } from './new-exam/new-exam.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExamListComponent } from './exam-list/exam-list.component';
import { StartexamComponent } from './startexam/startexam.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AdminGuardService } from './services/admin-guard.service';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  { path: '**', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'loginUser', component: SigninComponent },
  { path: 'newUser', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AdminGuardService] },
  { path: 'attemtedUserList', component: UserListComponent, canActivate: [AdminGuardService] },
  { path: 'newExam', component: NewExamComponent, canActivate: [AdminGuardService] },
  { path: 'allExams', component: ExamListComponent, canActivate: [AuthGuardService] },
  { path: 'startExam/:id', component: StartexamComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

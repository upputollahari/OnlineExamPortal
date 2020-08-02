import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExamService } from '../services/exam.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  allExams;
  constructor(private router: Router, private examService: ExamService) { }

  ngOnInit() {
    this.examService.getAllExam().subscribe((data) => {
      // tslint:disable-next-line: no-string-literal
      this.allExams = data['msg'];
      console.log(this.allExams);
    });
  }
  logOut() {
    localStorage.clear();
    this.router.navigateByUrl('/');
  }
}

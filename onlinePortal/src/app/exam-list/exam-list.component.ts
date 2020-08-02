import { Component, OnInit } from '@angular/core';
import { ExamService } from '../services/exam.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.css']
})
export class ExamListComponent implements OnInit {
  allExams;
  constructor(private examService: ExamService, private router: Router) { }

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

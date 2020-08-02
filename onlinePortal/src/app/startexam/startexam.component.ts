/* tslint:disable */
import { Component, OnInit } from '@angular/core';
import { QuestionData } from '../models/question-data.model';
import { ExamService } from '../services/exam.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-startexam',
  templateUrl: './startexam.component.html',
  styleUrls: ['./startexam.component.css']
})
export class StartexamComponent implements OnInit {
  isLoading = false;
  questions = [];
  id:any="";
  examDetails:any;
  answer = new Array(10).fill("0");
  marks=new Array(10).fill("0");;
  totalmarks=0;
  correctAnswer = new Array(10).fill(0);
  constructor(private examService: ExamService,private route: ActivatedRoute,private router: Router) {
    this.getAllExam();

  }

  ngOnInit() {
    this.route.params.subscribe((param) => {
      // this.userName = param["userName"];
      // this.id = param._id;
      this.id = param.id;
      console.log('id : ' + this.id);

    });
  }
  getAllExam() {
    console.log(this.id);
    this.examService.getExam(this.id).subscribe((data) => {
     this.examDetails = data["msg"];
     if(this.examDetails[0]){
      this.questions=this.examDetails[0].questions;
      for (let q =0; q < 10; q++) {
        this.correctAnswer[q] = this.questions[q].correctOption;
        this.marks[q]=this.questions[q].mark;
      }
     }

    //  console.log(this.examDetails[0].questions);

     console.log(this.questions);
    });
  }
  onSubmit() {
    for (let a = 0; a < 10; a++) {
      if(this.answer[a] === this.correctAnswer[a]) {
      this.totalmarks+=this.marks[a];
      }
    }
    console.log(this.totalmarks);
    console.log(this.correctAnswer);
    this.examService.sendMarks(this.examDetails[0].title,this.examDetails[0].subject,this.totalmarks);
      this.router.navigateByUrl('/allExams');
      // this.questions=[];
  }

}

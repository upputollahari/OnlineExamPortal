import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ExamService } from '../services/exam.service';

@Component({
  selector: 'app-new-exam',
  templateUrl: './new-exam.component.html',
  styleUrls: ['./new-exam.component.css']
})
export class NewExamComponent implements OnInit {
  newExamForm: FormGroup;
  constructor(private router: Router, private formBuilder: FormBuilder, private examService: ExamService) {
    this.buildForm();
  }

  ngOnInit() {
  }

  buildForm() {
    this.newExamForm = this.formBuilder.group({
      title: ['', Validators.required],
      totalMarks: ['', Validators.required],
      time: ['', Validators.required],
      subject: ['', Validators.required],
      questions: this.formBuilder.array([this.init()]),
    });
  }
  init() {
    return this.formBuilder.group({
      mark: ['', Validators.required],
      que: ['', Validators.required],
      option1: ['', Validators.required],
      option2: ['', Validators.required],
      option3: ['', Validators.required],
      option4: ['', Validators.required],
      correctOption: ['', Validators.required]
    });
  }

  addQuestion() {
    const control = this.newExamForm.get('questions') as FormArray;
    control.push(this.init());

  }
  removeQuestion(i) {
    const control = this.newExamForm.get('questions') as FormArray;
    if (control.length > 1) {
      control.removeAt(i);
    }
  }
  save() {
    if (this.newExamForm.valid) {
      this.examService.createExam(this.newExamForm.value)
        .subscribe(
          (resp) => {
            console.log(resp);

            // tslint:disable-next-line: no-string-literal
            if (resp['success'] === true) {
              this.newExamForm.reset();
              this.router.navigateByUrl('/dashboard');
            } else {
              console.log('error');
            }
          }
        );
    }
  }

  cancel() {
    this.router.navigateByUrl('/dashboard');
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  userDatailsItem;
  userDetails;
  emailId;
  constructor(private http: HttpClient) { }
  createExam(Exam) {
    return this.http.post(environment.apiBaseUrl + '/api/exams/createExam', Exam);
  }

  getAllExam() {
    return this.http.get(environment.apiBaseUrl + '/api/exams/getExam');
  }
  getExam(id) {
    return this.http.get(environment.apiBaseUrl + '/api/exams/getExam' + id);
  }
  sendMarks(title, subject, marks: number) {
    this.userDatailsItem = localStorage.getItem('userDetails');
    if (this.userDatailsItem) {
      this.userDetails = JSON.parse(this.userDatailsItem);
      this.emailId = this.userDetails.email;
    }
    const email = this.emailId;
    const data = {
      email,
      title,
      subject,
      marks
    };
    this.http.post(environment.apiBaseUrl + '/api/exams/submitResult', data)
      .subscribe(response => {
        console.log(response);
        alert('Your Submission has been made! Thank You.');
      });
  }
}

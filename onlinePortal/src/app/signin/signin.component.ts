import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  userDetails;
  message;
  showMessage = false;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }
  onSubmit(form) {
    this.userService.loginUser(form.value).subscribe(result => {
      this.userDetails = result;
      console.log(this.userDetails);
      localStorage.setItem('userDetails', JSON.stringify(this.userDetails));
      this.router.navigateByUrl('/allExams');
    }, err => {
      console.log(err.error.message);
      this.message = err.error.message;
      this.showMessage = true;
      setTimeout(() => this.showMessage = false, 4000);
    }
    );

  }
}

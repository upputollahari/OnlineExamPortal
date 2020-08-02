import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user: User;
  message;
  showMessage = false;
  constructor(private userService: UserService) { }

  ngOnInit() {
  }
  onSubmit(userForm) {
    this.userService.addUser(userForm.value).subscribe(result => {
      this.message = result.message;
      console.log(this.message);
      this.showMessage = true;
      setTimeout(() => this.showMessage = false, 4000);
      // this.router.navigateByUrl('/customers');
      userForm.form.reset();
    }, err => {
      console.log(err.error.message);
      this.message = err.error.message;
      setTimeout(() => this.showMessage = false, 4000);
      this.showMessage = true;
    }
    );
  }
}

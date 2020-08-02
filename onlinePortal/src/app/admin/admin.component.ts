import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  adimnDetails: any;
  message;
  showMessage = false;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }
  onSubmit(form) {

    this.userService.loginAdmin(form.value).subscribe(result => {
      this.adimnDetails = result;
      console.log(this.adimnDetails);
      localStorage.setItem('adminDetails', JSON.stringify(this.adimnDetails));
      this.router.navigateByUrl('/dashboard');
    }, err => {
      console.log(err.error.message);
      this.message = err.error.message;
      this.showMessage = true;
      setTimeout(() => this.showMessage = false, 4000);
    }
    );
  }
}

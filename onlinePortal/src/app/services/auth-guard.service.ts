import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  userDetailsItem;
  userDetails;
  email;
  constructor(private router: Router) { }
  canActivate() {

    this.userDetailsItem = localStorage.getItem('userDetails');
    if (this.userDetailsItem) {
      this.userDetails = JSON.parse(this.userDetailsItem);
      this.email = this.userDetails.email;
      if (this.email) { return true; }
      this.router.navigate(['/loginUser']);
      return false;
    }
    this.router.navigate(['/loginUser']);
    return false;
  }
}

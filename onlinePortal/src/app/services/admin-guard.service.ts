import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService {
  adminDetailsItem;
  adminDetails;
  email;
  constructor(private router: Router) { }
  canActivate() {

    this.adminDetailsItem = localStorage.getItem('adminDetails');
    if (this.adminDetailsItem) {
      this.adminDetails = JSON.parse(this.adminDetailsItem);
      this.email = this.adminDetails.email;
      if (this.email) { return true; }
      this.router.navigate(['/admin']);
      return false;
    }
    this.router.navigate(['/admin']);
    return false;
  }
}

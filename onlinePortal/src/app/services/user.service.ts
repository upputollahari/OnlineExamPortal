import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  addUser(user: any): Observable<any> {
  //  console.log(user);
   return this.http.post(environment.apiBaseUrl + '/api/users/registerUser', user);
  }

  loginUser(user: any): Observable<any> {
    return this.http.post(environment.apiBaseUrl + '/api/users/userAuthenticate', user);
  }
  loginAdmin(admin: any): Observable<any> {
    return this.http.post(environment.apiBaseUrl + '/api/users/adminAuthenticate', admin);
  }
  getAllUsers() {
    return this.http.get(environment.apiBaseUrl + '/api/users/getAllUsers');
  }
}

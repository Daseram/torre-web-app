import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/shared/services/session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router, private session: SessionService) {
  }

  ENVURL = 'https://torre-restserver.herokuapp.com'

  login(user: { email: string, password: string }) {
    const url = `${this.ENVURL}/api/auth/login`;
    const headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, user, { headers });
  }

  register( newUser: { name:string, email: string, password: string }) {
    const url = `${this.ENVURL}/api/users`;
    const headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, newUser, { headers });
  }

  logOut() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}

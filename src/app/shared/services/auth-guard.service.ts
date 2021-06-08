import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router, private session: SessionService) { }

  canActivate() {
    const token = this.session.getToken();
    if (!token) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}

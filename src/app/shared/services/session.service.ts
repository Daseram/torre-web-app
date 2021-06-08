import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  setToken(token: string) {
    if (token) {
      sessionStorage.setItem('token', token);
    }
  }

  getToken() {
    let token = '';
    token = sessionStorage.getItem('token');
    return token;
  }
}

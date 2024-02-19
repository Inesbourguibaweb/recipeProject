import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/** define the interface to konw what kind of response we get from the post function */
interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}
@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBrRgLi8hzeK-18oBJdaPhh47d4Rbi86EI',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
  }
}

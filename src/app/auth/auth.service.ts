import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/** define the interface to konw what kind of response we get from the post function */
interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}
interface LoginResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBrRgLi8hzeK-18oBJdaPhh47d4Rbi86EI',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((errorResp) => {
          let errorMessage = 'An unknown error occured !';
          if (!errorResp.error || !errorResp.error.error) {
            throwError(errorMessage);
          }
          switch (errorResp.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMessage = 'Email already exists';
          }
          return throwError(errorMessage);
        })
      );
  }

  signIn(email: string, password: string) {
    return this.http
      .post<LoginResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBrRgLi8hzeK-18oBJdaPhh47d4Rbi86EI',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((errorResp) => {
          let errorMessage = 'An unknown error occured !';
          if (!errorResp.error || !errorResp.error.error) {
            throwError(errorMessage);
          }
          switch (errorResp.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMessage = 'Email already exists';
          }
          return throwError(errorMessage);
        })
      );
  }
}

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';
import { Router } from '@angular/router';

/** define the interface to konw what kind of response we get from the post function */
export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean /** this key is returned only in login method */;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  /**A Subject is a special type of Observable that allows values to be multicasted to many Observers.
   * Subjects are like EventEmitters.
   * Every Subject is an Observable and an Observer.
   * You can subscribe to a Subject, and you can call next to feed values as well as error and complete.
   *  */

  // user = new Subject<User>();
  user = new BehaviorSubject<User>(null);

  /**Sign up */
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
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
          /**+resData.expiresIn : use + to convert it into a number */
        })
      );
  }

  /**Sign In */
  signIn(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBrRgLi8hzeK-18oBJdaPhh47d4Rbi86EI',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
          /**+resData.expiresIn : use + to convert it into a number */
        })
      );
  }

  /**Logout function */
  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
  }

  /**Handle authentication */

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expireToken: number
  ) {
    const expireDate = new Date(new Date().getTime() + expireToken * 1000);
    const user = new User(email, userId, token, expireDate);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  /**Handling error for sign in and sign up */

  private handleError(errorResp: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured !';
    if (!errorResp.error || !errorResp.error.error) {
      throwError(errorMessage);
    }
    console.log('first', errorResp.error.error.message);
    switch (errorResp.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'Email already exists';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Email not found';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid password';
        break;
    }
    return throwError(errorMessage);
  }
}

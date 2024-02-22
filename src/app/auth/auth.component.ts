import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLogginMode = true;
  loginForm: FormGroup;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService) {}
  switchMode() {
    this.isLogginMode = !this.isLogginMode;
  }

  private initForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [
        Validators.minLength(6),
        Validators.required,
      ]),
    });
  }

  onSubmit() {
    console.log('form', this.loginForm.value);
    if (!this.loginForm.valid) {
      return;
    }
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if (this.isLogginMode) {
      this.isLoading = false;
      authObs = this.authService.signIn(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }
    authObs.subscribe(
      (resData) => {
        console.log('resData', resData);
        this.isLoading = false;
      },
      (errorMessage) => {
        console.error(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );
    this.loginForm.reset();
  }
  ngOnInit(): void {
    this.initForm();
  }
}

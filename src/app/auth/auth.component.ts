import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLogginMode = true;
  loginForm: FormGroup;

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
    if (this.isLogginMode) {
    } else {
      this.authService.signUp(email, password).subscribe((resData) => {
        console.log('resData', resData), (error) => console.error(error);
      });
    }
    this.loginForm.reset();
  }
  ngOnInit(): void {
    this.initForm();
  }
}

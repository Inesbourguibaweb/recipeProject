import { Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  isLogginMode = true;

  switchMode() {
    this.isLogginMode = !this.isLogginMode;
  }
}

import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AuthComponent],
  imports: [FormsModule, ReactiveFormsModule, AuthRoutingModule, CommonModule],
})
export class AuthModule {}

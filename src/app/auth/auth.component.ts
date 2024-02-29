import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

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
  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective;
  private closeSub: Subscription;

  constructor(
    private authService: AuthService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}
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

    /** An observer to subcribe to when signing up and logging in */
    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if (this.isLogginMode) {
      this.isLoading = false;
      /**the obs takes a new val at each log in */
      authObs = this.authService.signIn(email, password);
    } else {
      /**the obs takes a new val at each sign up */

      authObs = this.authService.signUp(email, password);
    }
    /** The subscribtion */
    authObs.subscribe(
      (resData) => {
        console.log('resData', resData);
        this.isLoading = false;
      },
      (errorMessage) => {
        console.error(errorMessage);
        this.error = errorMessage;
        this.showErrorAlert(errorMessage);
        this.isLoading = false;
      }
    );
    this.loginForm.reset();
  }

  /**Show component dynamically  */

  private showErrorAlert(message: string) {
    // const alertCmp = new AlertComponent();
    const alertCmpFactory =
      this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
  onHandleError() {
    this.error = null;
  }
  ngOnInit(): void {
    this.initForm();
  }
}

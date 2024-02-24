import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { DataStorageService } from './../shared/data-storage.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userSub: Subscription;
  isAuthenticated: Boolean = false;
  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      console.log('user', user);
      console.log('user', !!user);
      this.isAuthenticated = !!user;
      this.router.navigate(['/recipes']);
    });
  }
  storeRecipes() {
    this.dataStorageService.storeRecipes();
  }
  fetchRecipes() {
    this.dataStorageService.fetchRecipes().subscribe();
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}

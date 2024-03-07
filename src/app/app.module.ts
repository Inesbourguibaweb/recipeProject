import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModel } from './app-routing.module';
import { AuthComponent } from './auth/auth.component';
import { RecipesModule } from './recipes/recipes.module';
import { ShoppinListModule } from './shopping-list/shopping-list.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModel,
    HttpClientModule,
    RecipesModule,
    ShoppinListModule,
    SharedModule,
    CoreModule,
    AuthModule,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}

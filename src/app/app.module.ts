import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmpComponent } from './emp/emp.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { LoadingBarModule } from '@ngx-loading-bar/core';
// for HttpClient import:
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { AuthComponent } from './auth/auth.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    EmpComponent,
    AuthComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LoadingBarModule,
    LoadingBarHttpClientModule,  // for HttpClient use
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

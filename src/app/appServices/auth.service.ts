import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../config';
import { AuthResponse } from './../appInterface/auth-response.interface';
import { catchError, tap } from 'rxjs/operators';
import { ErrorService } from './error.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from './../appModels/user.modal';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenExpirationTimer : any;
  user = new BehaviorSubject<User>(null);

  signupURL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${config.API_KEY}`;
  signinURL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${config.API_KEY}`;

  constructor(private http: HttpClient,
    private errorservice: ErrorService,
    private router: Router) { }

  signUp(email, password) {
   return this.http.post<AuthResponse>(this.signupURL,
        {
         email: email,
         password: password,
         returnSecureToken:true
        }).pipe(catchError(err => this.errorservice.handleError(err)),
        tap(res => {
           this.authenticatedUser(res.email, res.localId, res.idToken, +res.expiresIn);
        })
        );
      }

  signIn(email, password) {
    return this.http.post<AuthResponse>(this.signinURL,
      {
       email: email,
       password: password,
       returnSecureToken:true
      }).pipe(catchError(err => this.errorservice.handleError(err)),
      tap(res => {
        this.authenticatedUser(res.email, res.localId, res.idToken, +res.expiresIn);
     }));
  }

  autoSignIn() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    console.log(userData);
    if(!userData){
      return;
    }
    const loggedInUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    if(loggedInUser.token) {
      this.user.next(loggedInUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoSignOut(expirationDuration);
    }
  }

  signOut() {
    this.user.next(null);
    this.router.navigate(['']);
    localStorage.removeItem('userData');
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoSignOut(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
       this.signOut();
     }, expirationDuration);
  }

  private authenticatedUser(email, userId, token, expiresIn) {
    const expirationDate = new Date(new Date().getTime() + expiresIn*1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user) //storing data in user Subject..
    this.autoSignOut(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user))
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../appServices/auth.service';
import { AuthResponse } from '../appInterface/auth-response.interface';
import { ErrorService } from './../appServices/error.service';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  loginMode:boolean = true;
  Form: FormGroup;
  error: any;
  errorMsgs = this.errorservice.errorMsgs;

    constructor(private fb: FormBuilder,
    private auth: AuthService,
    private errorservice: ErrorService,
    private router: Router,
    private socialAuth: SocialAuthService) { }

  ngOnInit(): void {
    this.auth.user.subscribe(res => {
      if(res) {
        this.router.navigate(['./dashboard']);
      }
    })
    this.Form = this.fb.group({
      email: ['', [ Validators.required,Validators.email]],
      password: ['', [ Validators.required,Validators.minLength(6)]],
    })
  }

  onModeSwitch() {
    this.loginMode = !this.loginMode;
  }

  onSubmit(){
    if(this.Form.valid){
      console.log(this.Form.value);
      const email = this.Form.value.email;
      const password = this.Form.value.password;
      let authObservable: Observable<AuthResponse>;
      if(this.loginMode) {
        authObservable = this.auth.signIn(email, password);
      } else{
        authObservable = this.auth.signUp(email, password);
      }
      authObservable.subscribe(res => {
        console.log(res);
        this.router.navigate(['dashboard'])
      },
       err => {
         console.log(err);
         this.error = err;
       }
      )
    }

    else{
       alert("please Enter valid credentials!")
    }
  }

  onGoogleSignIn(){
    this.socialAuth.signIn(GoogleLoginProvider.PROVIDER_ID).then(user => {
      console.log(user);
      this.auth.googleSignIn(user.idToken).subscribe(
        (res) => {
          console.log(res)
          this.router.navigate(['dashboard'])
        },
        (err) => {console.log(err)},
        )
    });
  }
}

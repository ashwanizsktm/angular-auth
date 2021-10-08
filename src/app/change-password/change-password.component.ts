import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../appServices/auth.service';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  Form: FormGroup;
  success: boolean = false;
  hide: boolean = true;
  token = JSON.parse(localStorage.getItem('userData'))._token;
  constructor(private fb: FormBuilder,
    private auth: AuthService) { }

  ngOnInit(): void {
    this.Form = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(5)]],
    })
  }

  onSubmit() {
    if(this.Form.valid){
      // console.log(this.Form.value);
      const tokenAndData = {idToken:this.token, ...this.Form.value}
      this.auth.changePassword(tokenAndData).subscribe(res => {
        console.log(res);
      this.success = true;
      })
    } else{
      let key = Object.keys(this.Form.controls);
      key.filter( data => {
        let control = this.Form.controls[data];
        if(control.errors != null) {
          control.markAsTouched();
        }
      })
    }
  }

}

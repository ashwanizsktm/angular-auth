import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../appServices/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent implements OnInit {
  error: any = null;
  success: boolean = false;
  Form: FormGroup;
  constructor(private fb: FormBuilder,
    private auth: AuthService) {}

  ngOnInit(): void {
    this.Form = this.fb.group({
      email: ['', Validators.required],
    });
  }

  onForgetSubmit() {
    if (this.Form.valid) {
      console.log(this.Form.value);
      this.auth.forgetPassword(this.Form.value).subscribe(
        (res) => {console.log(res),
        this.success = true;
        },

        (err) => {console.log(err),
         this.error = err;
        },
        )
    } else {
      let key = Object.keys(this.Form.controls);
      key.filter((data) => {
        let control = this.Form.controls[data];
        if (control.errors != null) {
          control.markAsTouched();
        }
      });
    }
  }
}

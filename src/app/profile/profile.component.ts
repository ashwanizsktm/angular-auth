import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../appServices/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  editMode: boolean = false;
  profileInfo: any;
  token = JSON.parse(localStorage.getItem('userData'))._token;
  constructor(private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private route: ActivatedRoute) {
    }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: ['Edit Name'],
      picture: ['Edit Photo']
    })

    this.route.queryParamMap.subscribe(res =>{
      let qParams = res.get('EditMode');
      if(qParams !=null) {
        this.editMode = true;
      } else{
        this.editMode = false;
      }
    })

    this.auth.profileInfo.subscribe(res => {
      this.profileInfo = res;
      this.profileForm.setValue({
        name: res.displayName,
        picture: res.photoUrl
      })
    })
  }

  onEmpSubmit() {
    if(this.profileForm.valid) {
      // console.log(this.profileForm.value);
      const uData ={token: this.token, ...this.profileForm.value};
      this.auth.updateProfile(uData).subscribe(
        (res) => {
          console.log(res);
          this.auth.getProfile(this.token);
        },
        (err) => console.log(err)
      )
    }
    else{
      let key = Object.keys(this.profileForm.controls);
      key.filter(data =>{
        let control = this.profileForm.controls[data];
        if(control.errors !=null){
          control.markAsTouched();
        }
      })
    }
  }

  onDiscard() {
    // this.profileForm.reset();
    this.router.navigate([], {queryParams: {EditMode: null}})
  }
}

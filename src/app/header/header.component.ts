import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../appServices/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  userAvatar = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png';
  constructor(private auth: AuthService) { }
  ngOnInit(): void {
    this.auth.user.subscribe(res => {
      // 1 way
      // if(res) {
      //   this.isLoggedIn = true;
      // } else{
      //   this.isLoggedIn = false;
      // }
      // 2. way
      this.isLoggedIn = res ? true : false;
    })
  }

  onSignOut() {
    this.auth.signOut();
  }

}

import { Component, OnInit } from '@angular/core';
import {OktaAuthService} from '@okta/okta-angular';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {
  isAuthenticate = false;
  userFullName: string;

  constructor(private oktaAuthService: OktaAuthService) { }

  ngOnInit(): void {
    this.oktaAuthService.$authenticationState.subscribe(
      result => {
        this.isAuthenticate = result;
        this.getUserDetails();
      }
    );
  }

  private getUserDetails(): void {
    if (this.isAuthenticate) {
      this.oktaAuthService.getUser().then(
        res => {
          this.userFullName = res.name;
        }
      );
    }
  }

  public logout(): void{
    this.oktaAuthService.signOut();
  }
}

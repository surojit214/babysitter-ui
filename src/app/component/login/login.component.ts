import { Component, OnInit } from '@angular/core';
import OktaConfig from '../../config/okta-config';
import * as OktaSignIn from '@okta/okta-signin-widget';
import {OktaAuthService} from '@okta/okta-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  oktaSignin: any;

  constructor(private oktaAuthService: OktaAuthService) {
    this.oktaSignin = new OktaSignIn({
      logo: 'assets/images/baby-face.png',
      features: {registration: true},
      baseUrl: OktaConfig.oidc.issuer.split('/oauh2'),
      clientId: OktaConfig.oidc.clientId,
      redirectUri: OktaConfig.oidc.redirectUri,
      authParams: {
        pkce: true,
        issuer: OktaConfig.oidc.issuer,
        scopes: OktaConfig.oidc.scope
      }
    });
  }

  ngOnInit(): void {
    this.oktaSignin.remove();
    this.oktaSignin.renderEl({el: '#okta-signin-widget'},
      (response) => {
        if (response.status === 'SUCCESS') {
          this.oktaAuthService.signInWithRedirect();
        }
      },
      (error) => {
        return error;
      }
    );
  }

}

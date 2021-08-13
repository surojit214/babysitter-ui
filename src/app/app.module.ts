import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UserListComponent } from './component/user/user-list/user-list.component';
import {HttpClientModule} from '@angular/common/http';
import {UserService} from './service/user-service';
import { UserCreateComponent } from './component/user/user-create/user-create.component';
import {Router, RouterModule, Routes} from '@angular/router';
import { UserDetailComponent } from './component/user/user-detail/user-detail.component';
import {MatTabsModule} from '@angular/material/tabs';
import {NgbNavModule} from '@ng-bootstrap/ng-bootstrap';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './component/login/login.component';
import { LoginStatusComponent } from './component/login-status/login-status.component';
import {OKTA_CONFIG, OktaAuthGuard, OktaAuthModule, OktaCallbackComponent} from '@okta/okta-angular';
import OktaConfig from './config/okta-config';
import {CustomLoginComponent} from './component/custom-login/custom-login.component';

const oktaConfig = Object.assign({
  onAuthRequired: (oktaAuth, injector) => {
    const router = injector.get(Router);
    router.navigate(['/login']);
  }
}, OktaConfig.oidc);

const routes: Routes = [
  {path: 'login/callback', component: OktaCallbackComponent},
  {path: 'login', component: CustomLoginComponent},
  {path: 'users/:id', component: UserDetailComponent},
  {path: 'users', component: UserListComponent, canActivate: [OktaAuthGuard]},
  {path: 'usertype/:usertype', component: UserListComponent, canActivate: [OktaAuthGuard]},
  {path: '', redirectTo: '/users', pathMatch: 'full'},
  {path: '**', redirectTo: '/users', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserCreateComponent,
    UserDetailComponent,
    LoginComponent,
    LoginStatusComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    MatTabsModule,
    NgbNavModule,
    MatToolbarModule,
    MatIconModule,
    ReactiveFormsModule,
    OktaAuthModule
  ],
  providers: [UserService, {provide: OKTA_CONFIG, useValue: oktaConfig}],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailsCmsUserComponent } from './list-cms-users/details-cms-user/details-cms-user.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCmsUserComponent } from './cmsUser/add-cms-user/add-cms-user.component';
import { ErrorComponent } from './error/error.component';
import { CmsUserListComponent } from './list-cms-users/list-cms-users.component';
import { AddNewAddressComponent } from './address/add-new-address/add-new-address.component';
import { EditAddressComponent } from './address/edit-address/edit-address.component';
import { ListAddressComponent } from './address/list-address/list-address.component';
import { EditCmsUserComponent } from './cmsUser/edit-cms-user/edit-cms-user.component';
import { ListContentsComponent } from './content/list-contents/list-contents.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { TokenInterceptorComponent } from './auth/token-interceptor/token-interceptor.component';
import { AdminHomePageComponent } from './admin-home-page/admin-home-page.component';
import { UserHomePageComponent } from './user-home-page/user-home-page.component';
import { DefaultHomePageComponent } from './default-home-page/default-home-page.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    AppComponent, 
    AddCmsUserComponent,
    CmsUserListComponent,
    DetailsCmsUserComponent,
    EditCmsUserComponent,
    ErrorComponent,
    AddNewAddressComponent,
    EditAddressComponent,
    ListAddressComponent,
    ListContentsComponent,
    LoginComponent,
    LogoutComponent,
    TokenInterceptorComponent,
    AdminHomePageComponent,
    UserHomePageComponent,
    DefaultHomePageComponent,
    NavBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatTooltipModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorComponent, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

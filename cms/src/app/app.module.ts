import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailsCmsUserComponent } from './list-cms-users/details-cms-user/details-cms-user.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCmsUserComponent } from './cmsUser/add-cms-user/add-cms-user.component';
import { ErrorComponent } from './errorPages/error/error.component';
import { CmsUserListComponent } from './list-cms-users/list-cms-users.component';
import { AddNewAddressComponent } from './address/add-new-address/add-new-address.component';
import { EditAddressComponent } from './address/edit-address/edit-address.component';
import { ListAddressComponent } from './address/list-address/list-address.component';
import { EditCmsUserComponent } from './cmsUser/edit-cms-user/edit-cms-user.component';
import { ListContentsComponent } from './content/list-contents/list-contents.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LoginComponent } from './auth/login/login.component';
import { AdminHomePageComponent } from './home/admin-home-page/admin-home-page.component';
import { UserHomePageComponent } from './home/user-home-page/user-home-page.component';
import { DefaultHomePageComponent } from './home/default-home-page/default-home-page.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { TokenInterceptorService } from './services/token.interceptor.service';
import { ForbiddenComponent } from './errorPages/forbidden/forbidden.component';
import { EditContentComponent } from './content/edit-content/edit-content.component';

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
    AdminHomePageComponent,
    UserHomePageComponent,
    DefaultHomePageComponent,
    NavBarComponent,
    ForbiddenComponent,
    EditContentComponent,
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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

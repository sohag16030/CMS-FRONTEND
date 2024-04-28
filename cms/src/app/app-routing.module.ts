import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetailsCmsUserComponent } from './list-cms-users/details-cms-user/details-cms-user.component';
import { AddCmsUserComponent } from './cmsUser/add-cms-user/add-cms-user.component';
import { ErrorComponent } from './errorPages/error/error.component';
import { CmsUserListComponent } from './list-cms-users/list-cms-users.component';
import { ListAddressComponent } from './address/list-address/list-address.component';
import { AddNewAddressComponent } from './address/add-new-address/add-new-address.component';
import { EditAddressComponent } from './address/edit-address/edit-address.component';
import { ListContentsComponent } from './content/list-contents/list-contents.component';
import { AdminHomePageComponent } from './home/admin-home-page/admin-home-page.component';
import { UserHomePageComponent } from './home/user-home-page/user-home-page.component';
import { DefaultHomePageComponent } from './home/default-home-page/default-home-page.component';
import { AuthGuard } from './services/authguard.service';
import { ForbiddenComponent } from './errorPages/forbidden/forbidden.component';

const appRoute: Routes = [

  //Home page
  { path: '', component: DefaultHomePageComponent },
  { path: 'AdminHomePage', component: AdminHomePageComponent , canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN'] }},
  { path: 'UserHomePage', component: UserHomePageComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_USER'] } },

  //auth route
  // { path: 'Login', component: LoginComponent },

  //cmsUser route
  { path: 'CmsUsers', component: CmsUserListComponent , canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN'] }},
  {
    path: 'CmsUsers', children: [
      { path: 'CmsUser/:id', component: DetailsCmsUserComponent , canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN','ROLE_USER'] }},
    ]
  },
  { path: 'AddCmsUser', component: AddCmsUserComponent },

  //address route
  { path: 'Addresses', component: ListAddressComponent , canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN','ROLE_USER'] }},
  { path: 'AddAddress', component: AddNewAddressComponent , canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN','ROLE_USER'] } },
  { path: 'Addresses/:addressId', component: EditAddressComponent , canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN','ROLE_USER'] }},
  
  //content route
  { path: 'Contents', component: ListContentsComponent , canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN','ROLE_USER'] }},
  //{ path: 'Contents/:contentId', component: EditContentComponent },

  { path: 'Unauthorized', component: ForbiddenComponent },
  { path: 'Notfound', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoute)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

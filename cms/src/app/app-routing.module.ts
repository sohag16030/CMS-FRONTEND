import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetailsCmsUserComponent } from './list-cms-users/details-cms-user/details-cms-user.component';
import { AddCmsUserComponent } from './cmsUser/add-cms-user/add-cms-user.component';
import { ErrorComponent } from './error/error.component';
import { CmsUserListComponent } from './list-cms-users/list-cms-users.component';
import { ListAddressComponent } from './address/list-address/list-address.component';
import { AddNewAddressComponent } from './address/add-new-address/add-new-address.component';
import { EditAddressComponent } from './address/edit-address/edit-address.component';
import { EditCmsUserComponent } from './cmsUser/edit-cms-user/edit-cms-user.component';
import { ListContentsComponent } from './content/list-contents/list-contents.component';
import { LoginComponent } from './auth/login/login.component';
import { AdminHomePageComponent } from './admin-home-page/admin-home-page.component';
import { UserHomePageComponent } from './user-home-page/user-home-page.component';
import { DefaultHomePageComponent } from './default-home-page/default-home-page.component';

const appRoute: Routes = [

  //Home page
  { path: '', component: DefaultHomePageComponent },
  { path: 'AdminHomePage', component: AdminHomePageComponent },
  { path: 'UserHomePage', component: UserHomePageComponent },

  //auth route
  { path: 'Login', component: LoginComponent },

  //cmsUser route
  { path: 'CmsUsers', component: CmsUserListComponent },
  {
    path: 'CmsUsers', children: [
      { path: 'CmsUser/:id', component: DetailsCmsUserComponent },
    ]
  },
  { path: 'AddCmsUser', component: AddCmsUserComponent },
  { path: 'CmsUsers/:cmsUserId', component: EditCmsUserComponent },

  //address route
  { path: 'Addresses', component: ListAddressComponent },
  { path: 'AddAddress', component: AddNewAddressComponent },
  { path: 'Addresses/:addressId', component: EditAddressComponent },
  
  //content route
  { path: 'Contents', component: ListContentsComponent },
  //{ path: 'Contents/:contentId', component: EditContentComponent },

  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoute)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

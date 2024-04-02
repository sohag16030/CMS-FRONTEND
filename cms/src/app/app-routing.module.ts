import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetailsCmsUserComponent } from './list-cms-users/details-cms-user/details-cms-user.component';
import { EditCmsUserComponent } from './edit-cms-user/edit-cms-user.component';
import { AddCmsUserComponent } from './add-cms-user/add-cms-user.component';
import { ErrorComponent } from './error/error.component';
import { CmsUserListComponent } from './list-cms-users/list-cms-users.component';

const appRoute: Routes = [
  { path: '', component: CmsUserListComponent },
  { path: 'CmsUsers', component: CmsUserListComponent },
  {
    path: 'CmsUsers', children: [
      { path: 'CmsUser/:id', component: DetailsCmsUserComponent },
    ]
  },
  { path: 'AddCmsUser', component: AddCmsUserComponent },
  { path: 'CmsUser/Edit/:id', component: EditCmsUserComponent },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoute)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

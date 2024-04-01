import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCmsUsersComponent } from './list-cms-users/list-cms-users.component';
import { DetailsCmsUserComponent } from './list-cms-users/details-cms-user/details-cms-user.component';
import { EditCmsUserComponent } from './edit-cms-user/edit-cms-user.component';
import { AddCmsUserComponent } from './add-cms-user/add-cms-user.component';

const appRoute: Routes = [
  { path: '', component: ListCmsUsersComponent},
  { path: 'CmsUsers', component: ListCmsUsersComponent},
  {
    path: 'CmsUsers', children: [
      { path: 'CmsUsers/:id', component: DetailsCmsUserComponent },
    ]
  },
  { path: 'AddCmsUsers', component: AddCmsUserComponent},
  { path: 'CmsUsers/EditCmsUsers/:id', component: EditCmsUserComponent },
  // { path: '**', component: ErrorComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(appRoute)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

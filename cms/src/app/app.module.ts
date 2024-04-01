import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListCmsUsersComponent } from './list-cms-users/list-cms-users.component';
import { DetailsCmsUserComponent } from './list-cms-users/details-cms-user/details-cms-user.component';
import { EditCmsUserComponent } from './edit-cms-user/edit-cms-user.component';
import { CreateCmsUserComponent } from './create-cms-user/create-cms-user.component';

@NgModule({
  declarations: [
    AppComponent,
    ListCmsUsersComponent,
    DetailsCmsUserComponent,
    EditCmsUserComponent,
    CreateCmsUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListCmsUsersComponent } from './list-cms-users/list-cms-users.component';
import { DetailsCmsUserComponent } from './list-cms-users/details-cms-user/details-cms-user.component';
import { EditCmsUserComponent } from './edit-cms-user/edit-cms-user.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AddCmsUserComponent } from './add-cms-user/add-cms-user.component';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    ListCmsUsersComponent,
    DetailsCmsUserComponent,
    EditCmsUserComponent,
    AddCmsUserComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

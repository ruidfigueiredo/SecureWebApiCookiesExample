import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AccountService } from './account.service';
import { AddCsrfHeaderInterceptorService } from './add-csrf-header-interceptor.service';
import { AppComponent } from './app.component';
import { UserService } from './user.service';
import { WithCredentialsInterceptorService } from './with-credentials-interceptor.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    AccountService,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: WithCredentialsInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AddCsrfHeaderInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

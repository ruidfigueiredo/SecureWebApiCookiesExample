import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AccountService } from './account.service';
import { WithCredentialsInterceptorService } from './with-credentials-interceptor.service';
import { UserService } from './user.service';

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
    { provide: HTTP_INTERCEPTORS, useClass: WithCredentialsInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

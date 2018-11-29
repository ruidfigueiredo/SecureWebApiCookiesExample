import { Component } from '@angular/core';
import { AccountService } from './account.service';
import { UserService } from './user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {  
  registerFeedback: string = '';
  loginFeedback: string = '';
  loggedInUserEmail: string = '';


  constructor(private accountService: AccountService, private userService: UserService) { }

  register(email: string, password: string, repassword: string) {
    this.registerFeedback = '';
    if (email === '' || password === '' || repassword === '') {
      this.registerFeedback = 'All fields are required';
      return;
    }
    if (password !== repassword) {
      this.registerFeedback = 'Password don\'t match';
      return;
    }

    this.accountService.register(email, password).subscribe(_ => {
      this.registerFeedback = `${email} registered with success, you can now log in`
    }, (errorResponse: HttpErrorResponse) => {
      this.registerFeedback = errorResponse.error;
    });
  }

  login(email: string, password: string) {
    this.loginFeedback = '';
    this.accountService.login(email, password).subscribe(_ => {
      this.loginFeedback = 'Login successful. Try the requests that requires user to be logged in.';
    }, (errorResponse: HttpErrorResponse) => {
      this.loginFeedback = errorResponse.error;
    });
  }

  logout() {
    this.loginFeedback = '';
    this.accountService.logout().subscribe(_ => {
      this.loginFeedback = 'Logout successful';
      this.loggedInUserEmail = '';
    }, (errorResponse: HttpErrorResponse) => {
      this.loginFeedback = errorResponse.error;
    });
  }

  getLoggedInUserEmail() {
    this.userService.getEmail().subscribe(email => {
      this.loggedInUserEmail = `${email}`;
    }, (errorResponse: HttpErrorResponse) => {
      this.loggedInUserEmail = `${errorResponse.status} ${errorResponse.statusText}`;
    });
  }
}

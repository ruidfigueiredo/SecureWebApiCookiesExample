import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

//the with-credentails-interceptor is adding withCredentials to the httpClient calls in this service
@Injectable()
export class AccountService{
    constructor(private httpClient: HttpClient) { }

    register(email: string, password: string){
        return this.httpClient.post(`${environment.apiBaseUrl}/api/account/register`, {
            email,
            password
        }, {
            responseType: 'text'
        });
    }
    
    login(email: string, password: string){
        return this.httpClient.post(`${environment.apiBaseUrl}/api/account/login`, {
            email,
            password
        }, {
            responseType: 'text'
        });
    }

    logout(){
        return this.httpClient.post(`${environment.apiBaseUrl}/api/account/logout`, {}, {
            responseType: 'text'
        });
    }
}
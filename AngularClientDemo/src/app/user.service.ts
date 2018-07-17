import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable()
export class UserService{
    constructor(private httpClient: HttpClient) { }

    getEmail(){
        //the with-credentails-interceptor is adding withCredentials to this call
        return this.httpClient.get(`${environment.apiBaseUrl}/api/user/name`, {
            responseType: 'text'            
        });        
    }
}
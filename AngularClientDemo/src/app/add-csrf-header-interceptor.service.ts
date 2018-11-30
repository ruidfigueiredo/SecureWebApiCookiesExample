import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AddCsrfHeaderInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var requestToken = this.getCookieValue("XSRF-REQUEST-TOKEN");
        return next.handle(req.clone({
            headers: req.headers.set("X-XSRF-TOKEN", requestToken)
        }));
    }

    private getCookieValue(cookieName: string) {
        const allCookies = decodeURIComponent(document.cookie).split("; ");
        for (let i = 0; i < allCookies.length; i++) {
            const cookie = allCookies[i];
            if (cookie.startsWith(cookieName + "=")){
                return cookie.substring(cookieName.length + 1);
            }
        }
        return "";
    }
}
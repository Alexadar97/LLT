
import { Injectable } from '@angular/core';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';
import { CanActivate, CanActivateChild, Router } from '@angular/router';

@Injectable()
export class WebserviceService {
    constructor(private http: Http, private router: Router) {
        if (this.getcheckToken() == null || this.getcheckToken() == "") {
            localStorage.removeItem('Daim-istop');
            this.router.navigateByUrl('/login');
        }
        else if (this.session() == null) {
            this.router.navigateByUrl('/login');
        }
    }
    getcheckToken() {
        return this.getCookie('daim-istop-cookies');
    }
    session() {
        // Decode the String
        if (localStorage.getItem("Daim-istop") != null) {
            var encodedString = localStorage.getItem("Daim-istop");
            encodedString = encodedString.substring(7, encodedString.length - 1);
            var decodedString = atob(encodedString);
            return JSON.parse(decodedString);
        }
    }

    method(url, data, method): Observable<any> {
        if (method === 'post') {
            const headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            headers.append('Authorization', this.token);
            return this.http.post(url, data, { headers: headers })
                .map((response: Response) => response.json())
                .catch((error: any) => {
                    if (error.status === 500) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 400) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 409) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 406) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 403) {


                    }
                });
        }
        if (method === 'postlogin') {
            const headers = new Headers();
            headers.append('content-type', 'application/json');
            return this.http.post(url, data, { headers: headers })
                .map((response: Response) => response);
        }
        if (method === 'postjson') {
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');

            return this.http.post(url, data, { headers: headers })
                .map((response: Response) => response.json())
                .catch((error: any) => {
                    if (error.status === 500) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 400) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 409) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 406) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 403) {

                    }
                });
        }
        if (method === 'getjson') {
            const headers = new Headers();
            headers.append('content-type', 'application/json');
            headers.append('Authorization', this.token);

            return this.http.get(url, { headers: headers })
                .map((response: Response) => response.json())
                .catch((error: any) => {
                    if (error.status === 500) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 400) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 409) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 406) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 403) {

                    }
                });
        }
        if (method === 'postjsonlogin') {
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Authorization', this.token);
            return this.http.post(url, data, { headers: headers })
                .map((response: Response) => response.json())
                .catch((error: any) => {
                    if (error.status === 500) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 400) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 409) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 406) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 403) {


                    }
                });
        }
        if (method === 'postfilemultipart') {
            const headers = new Headers();
            headers.append('Content-Type', 'multipart/form-data');
            headers.append('Authorization', this.token);
            return this.http.post(url, data, { headers: headers })
                .map((response: Response) => response.json())
                .catch((error: any) => {
                    if (error.status === 500) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 400) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 409) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 406) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 403) {


                    }
                });
        }
        if (method === 'get') {
            const headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            headers.append('Authorization', this.token);
            return this.http.get(url, { headers: headers })
                .map((response: Response) => response.json())
                .catch((error: any) => {
                    if (error.status === 500) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 400) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 409) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 406) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 403) {


                    }
                });
        }
        if (method === 'delete') {
            const headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            headers.append('Authorization', this.token);
            return this.http.delete(url, { headers: headers })
                .map((response: Response) => response.json())
                .catch((error: any) => {
                    if (error.status === 500) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 400) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 409) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 406) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 403) {
                    }
                    else {
                        return Observable.throw(new Error(error.status));
                    }
                })
                .finally(() => {
                });
        }
        if (method === 'file') {
            let headers = new Headers();
            headers.append('Accept', 'application/json');
            headers.append('Authorization', this.token);
            let options = new RequestOptions({ headers: headers });
            return this.http.post(url, data, { headers: headers })
                .map((response: Response) => response.json())
                .catch((error: any) => {
                    if (error.status === 500) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 400) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 409) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 406) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 403) {

                    }
                });
        }
        if (method === 'JWT_DownloadExcelWithFilename') {
            const headers = new Headers();
            headers.append('Authorization', this.token);
            return this.http.get(url, { responseType: ResponseContentType.Blob, headers: headers })
                .map(res => {
                    return {
                        filename: data,
                        data: res.blob()
                    };
                })
                .catch((error: any) => {
                    if (error.status === 500) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 400) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 409) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 406) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 403) {
                    }
                });

        }
        if (method === 'downloadfile') {
            const headers = new Headers();
            headers.append('Authorization', this.token);
            return this.http.get(url, { responseType: ResponseContentType.Blob, headers: headers })
                .map(res => {
                    return {
                        filename: data,
                        data: res.blob()
                    };
                })
                .catch((error: any) => {
                    if (error.status === 500) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 400) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 409) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 406) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 403) {
                    }
                })
                .finally(() => {
                });
        }
        if (method === 'downloadfilejson') {
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Authorization', this.token);
            return this.http.post(url, data, {responseType: ResponseContentType.Blob, headers: headers })
            
            .map(res => {
                return {
                    filename: data,
                    data: res.blob()
                };
            })
                .catch((error: any) => {
                    if (error.status === 500) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 400) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 409) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 406) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 403) {
                    }
                })
                .finally(() => {
                });
        }
    }
    getCookie(cname) {
        var name = cname + "=";
        var cArr = window.document.cookie.split(';');
        for (var i = 0; i < cArr.length; i++) {
            var c = cArr[i].trim();
            if (c.indexOf(name) == 0)
                return c.substring(name.length, c.length);
        }
        return "";
    }
    token: any;
    getToken() {
        this.token = this.getCookie('istp-cookies');
    }
}

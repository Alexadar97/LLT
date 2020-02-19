import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
declare var $;
@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    userbuids = [];
    usermodids: any;
    userroleid: any;
    teamid: any;
    deliverytoken = '';
    constructor(private router: Router) {
        var selectboxvalue = (window.location.href).split("/");
        setTimeout(() => {
            if (selectboxvalue[selectboxvalue.length - 2] == 'requestaccesshome') {
                $("#navbarselect").val('requestaccess')
            }
           else if (selectboxvalue[selectboxvalue.length - 2] == 'dashboard') {
                $("#navbarselect").val(selectboxvalue[selectboxvalue.length - 1])
            }
            else {
                $("#navbarselect").val(selectboxvalue[selectboxvalue.length - 2])
            }
        }, 10)
    }

    canActivate() {
        if (this.getToken() == null || this.getToken() == "") {
            localStorage.removeItem('linelosstracker');
            this.router.navigateByUrl('/login');
        }
        else if (this.session() == null) {
            this.router.navigateByUrl('/login');
        }
        else {
            return true;
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
    getToken() {
        return this.getCookie('linelosstracker-cookies');
    }
    canActivateChild() {
        return true;
    }

    session() {
        // Decode the String
        if (localStorage.getItem("linelosstracker") != null) {
            var encodedString = localStorage.getItem("linelosstracker");
            encodedString = encodedString.substring(7, encodedString.length - 1);
            var decodedString = atob(encodedString);
            return JSON.parse(decodedString);
        }
    }

}
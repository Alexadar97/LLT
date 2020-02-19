import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { HttpModule } from '@angular/http';
import { DatatransferService } from '../../datatransfer.service'
import { WebserviceService } from '../../webservice.service'
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

declare var $

import { Router } from '@angular/router'; @Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any;
  isLoading = false;
  private opsppsloginapi = this.getdata.appconstant + 'user/login';
  constructor(private http: Http, private FormBuilder: FormBuilder, private router: Router, private getdata: DatatransferService,
    private makeapi: WebserviceService, ) {
    this.form = this.FormBuilder.group({

      "shortid": [null, Validators.compose([Validators.required])],
      "password": [null, Validators.compose([Validators.required])],
      // "usertype": [null, Validators.compose([Validators.required])],
      // "firstname": [''],
      // "lastname": [''],
      // "email": [''],
      // "status": [''],

    });
  }

  ngOnInit() {
  }
  PPS: any;
  data: any;
  changepage(value) {
    if (value == "ops") {
      this.data = "ops"
    }

    else if (value == "home") {
      this.data = "home"
    }
    else {
      this.data = "final"
    }
  }
  // ppssavelist:any;
  // onSubmit() {

  //   if (this.form.invalid) {
  //     this.markFormGroupTouched(this.form);
  //     return false;

  //   }
  //   else {
  //     var reqdata = this.form.value;

  //     return this.makeapi.method(this.opsppsloginapi, reqdata, "postjson")
  //       .subscribe(data => {
  //         if(data.status = "Success"){
  //           if(data.usertype == "OPS"){
  //             this.router.navigateByUrl("/dashboard/ops")
  //           }else if(data.usertype == "PPS"){
  //             this.router.navigateByUrl("/dashboard/home")
  //           }else if(data.usertype == "Admin"){
  //             this.router.navigateByUrl("/dashboard/final")
  //           }
  //           this.ppssavelist = data
  //         }

  //       },
  //         Error => {
  //         });

  //   }


  // }
  enterkey(value) {

  }
  onSubmit() {
    if (this.form.invalid) {
      this.markFormGroupTouched(this.form);
      return false;
    }
    else {
      this.isLoading = true
      localStorage.removeItem("cluster")
      let reqdata = { "shortid": this.form.value.shortid, "password": this.form.value.password };
      return this.makeapi.method(this.opsppsloginapi, JSON.stringify(reqdata), "postlogin")
        .subscribe(response => {
          var data = response.json();
          if (data.status == "Success") {
            this.isLoading = false
            this.setCookie('linelosstracker-cookies', response.headers.get('token'), 3)
            this.makeapi.getToken();
            // Encode the String
            var stringdata = JSON.stringify(data)
            var encodeddata = btoa(stringdata);
            encodeddata = "az-vel" + encodeddata;
            localStorage.setItem("linelosstracker", JSON.stringify(encodeddata));
            if (data.usertype == "admin") {
              localStorage.setItem("llt", "#dashboard")
              this.router.navigateByUrl("/dashboard/main-dashboard")
            } else if (data.depttype == "PPS") {
              localStorage.setItem("llt", "#llt")
              this.router.navigateByUrl("/dashboard/pps")
            } else if (data.depttype == "OPS") {
              localStorage.setItem("llt", "#llt")
              this.router.navigateByUrl("/dashboard/ops")
            } else {
              localStorage.setItem("llt", "#llt")
              this.router.navigateByUrl("/dashboard/final")
            }

          }
          else {
            this.isLoading = false
            this.getdata.showNotification('bottom', 'right', 'Invalid Short ID or Password !!', "danger");
            // this.getdata.notify('Invalid Short ID or Password !!', "error");
          }
        },
          Error => {
          });
    }
  }
  token: any;
  setCookie(cname, cvalue, expireHrs) {
    var d = new Date();
    d.setTime(d.getTime() + (expireHrs * 3600000000));
    var expires = "expires=" + d.toUTCString();
    window.document.cookie = cname + "=" + cvalue + "; " + expires;
  }
  getToken() {
    this.token = this.getCookie('daim-istop-cookies');
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
  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }


}



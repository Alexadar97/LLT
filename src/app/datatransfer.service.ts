import { Injectable } from '@angular/core';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';
declare var $: any;
@Injectable()
export class DatatransferService {

  // appconstant = 'http://172.30.1.131:8888/DaimLLT/';

  // appconstant = 'http://172.30.1.181:8080/DaimLLT/';

  appconstant = 'http://13.234.64.82:8080/DaimLLT/llt/';
  // appconstant = 'http://13.234.64.82:8080/DaimLLT/';


  constructor(private Router:Router) { }

  // notify(msg,type){
  //   $.notify(msg,type,{position:"bottom right",globalPosition:"bottom right"});
  // }

  // showNotification1(from, align, msg, type) {

  //   $.notify({
  //     icon: 'notifications',
  //     message: msg

  //   }, {
  //       type: type,
  //       timer: 2000,
  //       placement: {
  //         from: from,
  //         align: align
  //       }
  //     });
  // }

  showhomePageMenu = 'show'

  showNotification(from, align, msg, type) {

    $.notify({
      icon: 'notifications',
      message: msg

    }, {
      type: type,
      timer: 2000,
      placement: {
        from: from,
        align: align
      }
    });
  }
  
  opseditid:any
  opsedit(opseditid){
    this.opseditid = opseditid;
    this.Router.navigate(['dashboard/opsedit'],{queryParams : { opseditid : this.opseditid}})
  }
  ppeditid:any
  ppeditview:any
  ppseditvalue(ppeditid){
    this.ppeditid = ppeditid;
    this.Router.navigate(['dashboard/ppsedit'],{queryParams : { ppeditid : this.ppeditid}})
  
  }
  finaleditid:any
  finaledit(finaleditid){
    this.finaleditid = finaleditid;
    this.Router.navigate(['dashboard/finaluseredit'],{queryParams : { finaleditid : this.finaleditid}})
    
  }
  ppsfinalid:any
  ppsfinalvalue:any
  ppsfinaleditvalue(ppsfinalid){
    this.ppsfinalid = ppsfinalid;
    this.Router.navigate(['dashboard/admin-update'],{queryParams : { ppsfinalid : this.ppsfinalid}})
    this.ppsfinalvalue = "completed"
  }
  ppsDraftid=null
  ppsDraft(ppsDraftid){
    this.ppsDraftid = ppsDraftid;
    this.Router.navigate(['dashboard/pps-add'],{queryParams : { ppsDraftid : this.ppsDraftid}})
  }
}

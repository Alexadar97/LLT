import { Component, OnInit, ViewChild } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { HttpModule } from '@angular/http';
import { DatatransferService } from '../../../datatransfer.service'
import { WebserviceService } from '../../../webservice.service'
import { AuthGuard } from '../../../canactivate.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Router } from '@angular/router';

declare var $, moment;

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css']
})
export class UserManagerComponent implements OnInit {

  private searchUserApi = this.getdata.appconstant + 'user/search';
  private DeptListApi = this.getdata.appconstant + 'user/list';
  private SavedepitApi = this.getdata.appconstant + 'user/save';
  private GetApi = this.getdata.appconstant + 'user/get';
  private listDptApi = this.getdata.appconstant + 'department/list';
  private seachapi = this.getdata.appconstant + 'user/searchUserManager';
  private listSubClusterApi = this.getdata.appconstant + 'finalresponse/list';
  p1=1;
  AddusermanagerForm:FormGroup
  constructor( private http: Http,private Formbuilder: FormBuilder, private router: Router, private getdata: DatatransferService,
    private makeapi: WebserviceService,private AuthGuard:AuthGuard) { 
      this.AddusermanagerForm = this.Formbuilder.group({
        'id': [null],
        "shortid": [null, Validators.compose([Validators.required])],
        "username": [null, Validators.compose([Validators.required])],
        "emailid": [null, Validators.compose([Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')])],
        "finalresponseid": [null, Validators.compose([Validators.required])],
        "usertype":"user",
        "finalresponsename":[null, Validators.compose([Validators.required])],
      });
     }

  ngOnInit() {
    this.getUserList()
    this.getDeptList()
    this.getList()
  }
  isLoading = false
  getUserListdata=[]
  getUserList(){
    this.isLoading = true
    let reqdata = {};
    return this.makeapi.method(this.DeptListApi, '', "postjson")
      .subscribe(data => {
        this.isLoading = false
        this.getUserListdata = data
      },
        Error => {
        });
  }
  getsearchlist(value){
    return this.makeapi.method(this.seachapi,"searchstr="+value,"post")
    .subscribe(data=>{
      this.getUserListdata = data
    },
    Error=>{

    })
  }
  getListdata=[]
  getList(){
    let reqdata = {};
    return this.makeapi.method(this.listSubClusterApi, '', "postjson")
      .subscribe(data => {
        this.getListdata = data
      },
        Error => {
        });
  }
  edit(id){
    return this.makeapi.method(this.GetApi +"/"+id, '', "get")
      .subscribe(data => {
        this.AddusermanagerForm.patchValue(data)
      },
        Error => {
        });
  }
  getDeptListdata=[]
  getDeptList(){
    let reqdata = {};
    return this.makeapi.method(this.listDptApi, '', "postjson")
      .subscribe(data => {
        this.getDeptListdata = data
      },
        Error => {
        });
  }
  save(){
    if (this.AddusermanagerForm.invalid) {
      this.markFormGroupTouched(this.AddusermanagerForm);
      this.getdata.showNotification('bottom', 'right', 'Form is invalid !!', "danger");
      return false;
    } else {
    $("#submit").modal("show")
    }
  }
  confirmAdduserManager() {
    if (this.AddusermanagerForm.invalid) {
      this.markFormGroupTouched(this.AddusermanagerForm);
      this.getdata.showNotification('bottom', 'right', 'Form is invalid !!', "danger");
      return false;
    } else {
      var getform = this.AddusermanagerForm.value;
      getform.value = getform.valuex;
      delete getform.costcentername
      if (getform.id == null) {
        delete getform.id;
      }
      getform.deptid = +this.AddusermanagerForm.value.deptid
      getform.finalresponsename = this.departmentname
      return this.makeapi.method(this.SavedepitApi, getform, "postjson")
        .subscribe(data => {
          this.getUserList();
          this.AddusermanagerForm.reset()
          if (getform.id == null) {
            this.getdata.showNotification('bottom', 'right', 'Form Submitted Successfully !!', "success");
            // this.getdata.notify('Cluster Name Saved Successfully !!', "success");
          } else if (getform.id != null) {
            this.getdata.showNotification('bottom', 'right', 'Form Edited Successfully !!', "success");
            // this.getdata.notify('Cluster Name Edited Successfully !!', "success");
          }
          $("#submit").modal("hide")
          // this.getdata.showNotification('bottom', 'right', 'User Manager Saved Successfully !!', "success");

        },
          Error => {
          });
    }

  }
  Assignelist = [];
  todalAssignelistdata: any;
  shortidname: any
  Assignenamekeydown(value) {
    var getdata = this.AddusermanagerForm.value;
    let reqdata = "shortid=" + value
    return this.makeapi.method(this.searchUserApi, reqdata, "post")
      .subscribe(data => {
        this.shortidname = data.shortid
        if (data.firstname != null && data.lastname != null) {
          getdata.username = data.firstname + " " + data.lastname;
          getdata.shortid = data.shortid
          getdata.emailid = data.email
        } else {
          getdata.shortid = ""
        }
        this.AddusermanagerForm.patchValue(getdata);
      },
        Error => {
        });

  }
  departmentname:any
  department(value){
    for(let i=0; i<this.getListdata.length; i++){
      var emobj = this.getListdata[i]
      if(emobj.id == value){
        this.departmentname = emobj.finalresponsename
      }
    }
    var getdata = this.AddusermanagerForm.value
    getdata.finalresponsename = this.departmentname
    this.AddusermanagerForm.patchValue(getdata)
  }
  private markFormGroupTouched(formGroup: FormGroup) {
    for (let i in formGroup.controls)
      formGroup.controls[i].markAsTouched();
  }
}

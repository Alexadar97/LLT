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

declare var $;


@Component({
  selector: 'app-master-final-responsibility',
  templateUrl: './master-final-responsibility.component.html',
  styleUrls: ['./master-final-responsibility.component.css']
})
export class MasterFinalResponsibilityComponent implements OnInit {
  p1 = 1;
  isLoading = false
  private saveSubClusterApi = this.getdata.appconstant + 'finalresponse/save';
  private listSubClusterApi = this.getdata.appconstant + 'finalresponse/list';
  private listClusterApi = this.getdata.appconstant + 'subcluster/list';
  private GetApi = this.getdata.appconstant + 'finalresponse/get';
  private seachapi = this.getdata.appconstant + 'finalresponse/searchFinalResponse';

  SubclusterForm:FormGroup
  constructor( private http: Http,private Formbuilder: FormBuilder, private router: Router, private getdata: DatatransferService,
    private makeapi: WebserviceService,private AuthGuard:AuthGuard) { 
    this.SubclusterForm = this.Formbuilder.group({
      'id': [null],
      "finalresponsename": [null, Validators.compose([Validators.required])],
      "subclusterid": [null, Validators.compose([Validators.required])],
    });
   }

  ngOnInit() {
    this.getList()
    this.getClusterList()
  }
  getListdata=[]
  getList(){
    this.isLoading = true
    let reqdata = {};
    return this.makeapi.method(this.listSubClusterApi, '', "postjson")
      .subscribe(data => {
        this.isLoading = false
        this.getListdata = data
      },
        Error => {
        });
  }
  getsearchlist(value){
    this.isLoading = true
    return this.makeapi.method(this.seachapi,"searchstr="+value,"post")
    .subscribe(data=>{
      this.isLoading = false
      this.getListdata = data
    },
    Error=>{

    })
  }
  edit(id){
    return this.makeapi.method(this.GetApi +"/"+id, '', "get")
      .subscribe(data => {
        this.SubclusterForm.patchValue(data)
      },
        Error => {
        });
  }
  geClusterListdata=[]
  getClusterList(){
    this.isLoading = true
    let reqdata = {};
    return this.makeapi.method(this.listClusterApi, '', "postjson")
      .subscribe(data => {
        this.isLoading = false
        this.geClusterListdata = data
      },
        Error => {
        });
  }
  save(){
    if (this.SubclusterForm.invalid) {
      this.markFormGroupTouched(this.SubclusterForm);
      this.getdata.showNotification('bottom', 'right', 'Form is invalid !!', "danger");
      return false;
    } else {
    $("#submit").modal("show")
    }
  }
  confrimsubmitprrequest(){
    this.isLoading = true
      var getform = this.SubclusterForm.value;
      if (getform.id == null) {
        delete getform.id;
      }
       getform.clusterid = +this.SubclusterForm.value.clusterid
      return this.makeapi.method(this.saveSubClusterApi, getform, "postjson")
        .subscribe(data => {
          this.isLoading = false
          this.getList();
          if (getform.id == null) {
            this.getdata.showNotification('bottom', 'right', 'Form Submitted Successfully !!', "success");
            // this.getdata.notify('Cluster Name Saved Successfully !!', "success");
          } else if (getform.id != null) {
            this.getdata.showNotification('bottom', 'right', 'Form Edited Successfully !!', "success");
            // this.getdata.notify('Cluster Name Edited Successfully !!', "success");
          }
          this.SubclusterForm.reset()
          $("#submit").modal("hide")

        },
          Error => {
          });
  }
  private markFormGroupTouched(formGroup: FormGroup) {
    for (let i in formGroup.controls)
      formGroup.controls[i].markAsTouched();
  }
}

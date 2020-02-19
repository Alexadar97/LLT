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
  selector: 'app-master-cluster',
  templateUrl: './master-cluster.component.html',
  styleUrls: ['./master-cluster.component.css']
})
export class MasterClusterComponent implements OnInit {
  p1 = 1;
  private saveDptApi = this.getdata.appconstant + 'cluster/save';
  private listDptApi = this.getdata.appconstant + 'cluster/list';
  private GetApi = this.getdata.appconstant + 'cluster/get';
  private seachapi = this.getdata.appconstant + 'cluster/searchCluster';
  isLoading = false
  ClusterForm: FormGroup
  constructor(private http: Http, private Formbuilder: FormBuilder, private router: Router, private getdata: DatatransferService,
    private makeapi: WebserviceService, private AuthGuard: AuthGuard) {
    this.ClusterForm = this.Formbuilder.group({
      'id': [null],
      "clustername": [null, Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {
    this.getList()
  }
  getListdata = []
  getList() {
    this.isLoading = true
    let reqdata = {};
    return this.makeapi.method(this.listDptApi, '', "postjson")
      .subscribe(data => {
        this.isLoading = false
        this.getListdata = data
      },
        Error => {
        });
  }
  getsearchlist(value) {
    this.isLoading = true
    return this.makeapi.method(this.seachapi, "searchstr=" + value, "post")
      .subscribe(data => {
        this.isLoading = false
        this.getListdata = data
      },
        Error => {

        })
  }
  edit(id) {
    var reqdata = {}
    return this.makeapi.method(this.GetApi + "/" + id, reqdata, "get")
      .subscribe(data => {
        this.ClusterForm.patchValue(data)
      },
        Error => {
        });
  }
  save() {
    if (this.ClusterForm.invalid) {
      this.markFormGroupTouched(this.ClusterForm);
      this.getdata.showNotification('bottom', 'right', 'Cluster Name is required !!', "danger");
      // this.getdata.notify('Cluster Name is required !!', "error");
      return false;
    } else {
      $("#submit").modal("show")
    }
  }
  confrimsubmitprrequest() {
    this.isLoading = true
    var getform = this.ClusterForm.value;
    if (getform.id == null) {
      delete getform.id;
    }
    return this.makeapi.method(this.saveDptApi, getform, "postjson")
      .subscribe(data => {
        this.getList();
        if (data.status == 'Success') {
          this.isLoading = false
          this.ClusterForm.reset()
          $("#submit").modal("hide")
          if (getform.id == null) {
            this.getdata.showNotification('bottom', 'right', 'Cluster Name Saved Successfully !!', "success");
            // this.getdata.notify('Cluster Name Saved Successfully !!', "success");
          } else if (getform.id != null) {
            this.getdata.showNotification('bottom', 'right', 'Cluster Name Edited Successfully !!', "success");
            // this.getdata.notify('Cluster Name Edited Successfully !!', "success");
          }

        }
      },
        Error => {
        });
  }
  private markFormGroupTouched(formGroup: FormGroup) {
    for (let i in formGroup.controls)
      formGroup.controls[i].markAsTouched();
  }
}

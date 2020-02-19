import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpModule } from '@angular/http';
import { DatatransferService } from '../../datatransfer.service'
import { WebserviceService } from '../../webservice.service'
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Router,ActivatedRoute } from '@angular/router';

declare var $;

@Component({
  selector: 'app-ppedit',
  templateUrl: './ppedit.component.html',
  styleUrls: ['./ppedit.component.css']
})
export class PpeditComponent implements OnInit {
  BasicForm: FormGroup;
  OPSForm:FormGroup;
  FinalForm:FormGroup
  isLoading = false;

  private updateopsapi = this.getdata.appconstant + 'request/updateByPPS';
  private getpplist = this.getdata.appconstant + 'request/getSingleLine';
  private getsubclusterApi = this.getdata.appconstant + 'subcluster/filterlist';
  private listClusterApi = this.getdata.appconstant + 'cluster/list';

  constructor(private Formbuilder: FormBuilder, private http: Http, private router: Router, private getdata: DatatransferService,
    private makeapi: WebserviceService,private route: ActivatedRoute ) {
    this.BasicForm = this.Formbuilder.group({
      "id":null,
      "month": [null, Validators.compose([Validators.required])],
      "date": [null, Validators.compose([Validators.required])],
      "model": [null, Validators.compose([Validators.required])],
      "loss_qty": [null, Validators.compose([Validators.required])],
      "loss_time": [null, Validators.compose([Validators.required])],
      "loss_description": [null, Validators.compose([Validators.required])],
      "init_responsibility": [null, Validators.compose([Validators.required])],
      "pps_main_cluster_id": [null, Validators.compose([Validators.required])],
      "pps_sub_cluster": [null, Validators.compose([Validators.required])],
      "ops_main_cluster_id": [null, Validators.compose([Validators.required])],
      "ops_sub_cluster": [null, Validators.compose([Validators.required])],
      "final_resposibility": [null, Validators.compose([Validators.required])],
      "frjustification": [null, Validators.compose([Validators.required])],
    });
    this.OPSForm = this.Formbuilder.group({
      // "final_cluster": [null, Validators.compose([Validators.required])],
      // "final_resposibility": [null, Validators.compose([Validators.required])],
      // "pps_status": [null, Validators.compose([Validators.required])],
      "supplier_name": [null],
      "vendor_code": [null],
    });
    this.FinalForm = this.Formbuilder.group({
      "month": [null, Validators.compose([Validators.required])],
      "date": [null, Validators.compose([Validators.required])],
      "model": [null, Validators.compose([Validators.required])],
      "loss_qty": [null, Validators.compose([Validators.required])],
      "loss_time": [null, Validators.compose([Validators.required])],
      "loss_description": [null, Validators.compose([Validators.required])],
      "init_responsibility": [null, Validators.compose([Validators.required])],
      "pps_main_cluster_id": [null, Validators.compose([Validators.required])],
      "pps_sub_cluster": [null, Validators.compose([Validators.required])],


      "supplier_name": [null, Validators.compose([Validators.required])],
      "vendor_code": [null, Validators.compose([Validators.required])],

      "ops_main_cluster_id": [null, Validators.compose([Validators.required])],
      "ops_sub_cluster": [null, Validators.compose([Validators.required])],
      "additional_remarks":[null, Validators.compose([Validators.required])],
      "root_cause_analysis": [null, Validators.compose([Validators.required])],
      "inter_cor_action": [null, Validators.compose([Validators.required])],
      "permanent_cor_action": [null, Validators.compose([Validators.required])],
    });


  }
  ppeditid:any
  ppsfinalvalue:any
  ppsfinalid:any
  ngOnInit() {
    this.getList()
    this.route.queryParams.filter(params => params.ppeditid)
    .subscribe(params => {
      this.ppeditid = params.ppeditid;
      this.getppvalues(this.ppeditid)
    });
    this.ppsfinalvalue = this.getdata.ppsfinalvalue
      this.route.queryParams.filter(params => params.ppsfinalid)
      .subscribe(params => {
        this.ppsfinalid = params.ppsfinalid;
        this.getfinalvalues(this.ppsfinalid)
      });


  }
  getListdata=[]
  getList(){
    this.isLoading = true
    let reqdata = {};
    return this.makeapi.method(this.listClusterApi, '', "postjson")
      .subscribe(data => {
        this.isLoading = false
        this.getListdata = data
      },
        Error => {
        });
  }
  clustername:any
  subcluid:any
  getsubclusterdta=[]
  getsubcluster(id){
    this.isLoading = true
    this.subcluid = id
    let reqdata = "id="+this.subcluid
    return this.makeapi.method(this.getsubclusterApi,reqdata, "post")
      .subscribe(data => {
        this.isLoading = false
        this.getsubclusterdta = data
      },
        Error => {
        });
  }
 opsclustername:any
  opssubcluid:any
  opsgetsubclusterdta=[]
  opssubcluster(id){
    this.isLoading = true
    this.opssubcluid = id
    let reqdata = "id="+this.opssubcluid
    return this.makeapi.method(this.getsubclusterApi,reqdata, "post")
      .subscribe(data => {
        this.isLoading = false
        this.opsgetsubclusterdta = data
      },
        Error => {
        });
  }


  Submit(){
  if (this.OPSForm.invalid) {
    this.markFormGroupTouched(this.OPSForm);
    // this.getdata.notify('All Fields are required !!', "error");
    this.getdata.showNotification('bottom', 'right', 'All fields are required !!', "danger");
    return false;

  }else{
  $("#submit").modal("show")
  }
}
  confirmSubmit() {
    this.isLoading = true
   var getform = this.OPSForm.value;
   getform.final_cluster = this.OPSForm.value.final_cluster;
   getform.final_resposibility = this.OPSForm.value.final_resposibility;
   getform.pps_status = this.OPSForm.value.pps_status;
   getform.supplier_name = this.OPSForm.value.supplier_name;
   getform.vendor_code = this.OPSForm.value.vendor_code;
      var reqdata = "id=" + this.BasicForm.value.id + "&supplier_name=" + getform.supplier_name + "&vendor_code=" + getform.vendor_code;
      return this.makeapi.method(this.updateopsapi, reqdata, "post")
        .subscribe(data => {
          if(data.status == 'Success'){
            this.isLoading = false
            // this.getdata.notify('PPS Updated !!', "success");
            this.getdata.showNotification('bottom', 'right', 'PPS Updated !!', "success");
            this.router.navigateByUrl("/dashboard/pps")
            $("#submit").modal("hide");
            this.OPSForm.reset();
          }

        },
          Error => {
          });
        }


getppvalues(id){
  this.isLoading = true
   this.makeapi.method(this.getpplist + "?id=" + id, "", "get")
      .subscribe(data => {
        this.isLoading = false
         this.BasicForm.patchValue(data[0])
      },
        Error => {
        });
}
changecluster(event){

}
changeres(event){

}
changeStatus(event){

}
getfinalvalues(id){
  this.isLoading = true
  this.makeapi.method(this.getpplist + "?id=" + id, "", "get")
  .subscribe(data => {
    this.isLoading = false
    this.BasicForm.patchValue(data[0])
    this.OPSForm.patchValue(data[0])
    this.FinalForm.patchValue(data[0])
  },
    Error => {
    });
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

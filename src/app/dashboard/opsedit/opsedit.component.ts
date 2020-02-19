import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpModule } from '@angular/http';
import { DatatransferService } from '../../datatransfer.service'
import { WebserviceService } from '../../webservice.service'
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Router, ActivatedRoute } from '@angular/router';

declare var $;

@Component({
  selector: 'app-opsedit',
  templateUrl: './opsedit.component.html',
  styleUrls: ['./opsedit.component.css']
})
export class OpseditComponent implements OnInit {
  private opsppslistapi = this.getdata.appconstant + 'request/ppsOpsList';
  private updateopsapi = this.getdata.appconstant + 'request/updateByOPS';
  private getopslist = this.getdata.appconstant + 'request/getSingleLine';
  private listClusterApi = this.getdata.appconstant + 'cluster/list';
  private getsubclusterApi = this.getdata.appconstant + 'subcluster/filterlist';
  private listSubClusterApi = this.getdata.appconstant + 'finalresponse/list';
  map1={}
  OPSForm: FormGroup
  PPSForm: FormGroup
  OPSremark: FormGroup
  constructor(private Formbuilder: FormBuilder, private http: Http, private router: Router, private getdata: DatatransferService,
    private makeapi: WebserviceService, private route: ActivatedRoute) {
    this.OPSForm = this.Formbuilder.group({
      "ops_sub_cluster": [null, Validators.compose([Validators.required])],
      "final_resposibility": "",
      "ops_main_cluster_id": [null, Validators.compose([Validators.required])],
      "opsmaincluster": "",
      "additional_remarks": "",
      "final_resposibility1": [null, Validators.compose([Validators.required])],
      "frjustification":""
    })

    this.PPSForm = this.Formbuilder.group({
      "id": null,
      "month": [null, Validators.compose([Validators.required])],
      "date": [null, Validators.compose([Validators.required])],
      "model": [null, Validators.compose([Validators.required])],
      "loss_qty": [null, Validators.compose([Validators.required])],
      "loss_time": [null, Validators.compose([Validators.required])],
      "loss_description": [null, Validators.compose([Validators.required])],
      "init_responsibility": [null, Validators.compose([Validators.required])],
      "init_responsibility1": [null, Validators.compose([Validators.required])],
      "pps_main_cluster_id": [null, Validators.compose([Validators.required])],
      "pps_sub_cluster": [null, Validators.compose([Validators.required])],
      "final_resposibility": [null, Validators.compose([Validators.required])],
      "vendor_code": [null, Validators.compose([Validators.required])],
      "supplier_name": [null, Validators.compose([Validators.required])],
    });
  this.map1 = {
    'SM-Q': 1,
    'SM-V': 2,
    'SM-P': 3,
    'IPL': 4,
    'MHE': 5,
    'LCIM': 6,
    'IBL': 7,
    'PPS': 8,
    'ME': 9,
    'MES': 10,
    'IT': 11,
    'FM': 12,
    'CFT-Q': 13,
    'CKD': 14,
    'CS': 15,
    'Under analysis': 16,
    'R&D': 17,
    'OBL': 18,
    'Cab Trim': 19,
    'Chassis': 20,
    'Engine': 21,
    'Transmission': 22,
    'Frame': 23,
    'LCM': 24,
    'Bus': 25,
    'HR': 26,

  }
  this.dropdownList1 = [
    { item_id: 1, item_text: 'SM-Q' },
    { item_id: 2, item_text: 'SM-V' },
    { item_id: 3, item_text: 'SM-P' },
    { item_id: 4, item_text: 'IPL' },
    { item_id: 5, item_text: 'MHE' },
    { item_id: 6, item_text: 'LCIM' },
    { item_id: 7, item_text: 'IBL' },
    { item_id: 8, item_text: 'PPS' },
    { item_id: 9, item_text: 'ME' },
    { item_id: 10, item_text: 'MES' },
    { item_id: 11, item_text: 'IT' },
    { item_id: 12, item_text: 'FM' },
    { item_id: 13, item_text: 'CFT-Q' },
    { item_id: 14, item_text: 'CKD' },
    { item_id: 15, item_text: 'CS' },
    { item_id: 16, item_text: 'Under analysis' },
    { item_id: 17, item_text: 'R&D' },
    { item_id: 18, item_text: 'OBL' },
    { item_id: 19, item_text: 'Cab Trim' },
    { item_id: 20, item_text: 'Chassis' },
    { item_id: 21, item_text: 'Engine' },
    { item_id: 22, item_text: 'Transmission' },
    { item_id: 23, item_text: 'Frame' },
    { item_id: 24, item_text: 'LCM' },
    { item_id: 25, item_text: 'Bus' },
    { item_id: 26, item_text: 'HR' },
  ];
}
ShowFilter1=false
dropdownList1 = [];
selectedItems1 = [];
dropdownSettings1 = {
  singleSelection: false,
  idField: 'item_id',
  textField: 'item_text',
  selectAllText: 'Select All',
  unSelectAllText: 'UnSelect All',
  itemsShowLimit: 5,
  allowSearchFilter: this.ShowFilter1
};
multiplearray = []
multipleallarray = []
select: any
onItemSelect1(item: any) {
  // this.multipleallarray = []
  // this.multiplearray.push(item.item_text)
  // this.select = "signle"
}
onSelectAll1(items: any) {
  // this.select = "multiple"
  // this.multiplearray = []
  // for (var i = 0; i < items.length; i++) {
  //   var arraylist = items[i].item_text
  //   this.multipleallarray.push(arraylist)
  // }

}
toogleShowFilter1() {

  this.ShowFilter1 = !this.ShowFilter1;
  this.dropdownSettings1 = Object.assign({}, this.dropdownSettings1, { allowSearchFilter: this.ShowFilter1 });
}
limitSelection1=false
handleLimitSelection1() {
  if (this.limitSelection) {
    this.dropdownSettings1 = Object.assign({}, this.dropdownSettings1, { limitSelection: 2 });
  } else {
    this.dropdownSettings1 = Object.assign({}, this.dropdownSettings1, { limitSelection: null });
  }
}
  opseditid: any;
  map = []
  ngOnInit() {
    // this.getppslist() 
    this.getList()
    this.FinalresList()
    this.route.queryParams.filter(params => params.opseditid)
      .subscribe(params => {
        this.opseditid = params.opseditid;
        this.getopasvalues(this.opseditid)
      });
  }
  Finalresdata = []
  finalresponsename = []
  isLoading = false
  FinalresList() {
    this.isLoading = true
    let reqdata = {};
    return this.makeapi.method(this.listSubClusterApi, '', "postjson")
      .subscribe(data => {
        this.isLoading = false
        this.Finalresdata = data
        for (let i = 0; i < data.length; i++) {
          var values = data[i].finalresponsename
          var id = data[i].id
          this.map[values] = id
        }

      },
        Error => {
        });
  }
  ShowFilter = false;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'finalresponsename',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    allowSearchFilter: this.ShowFilter
  };

  limitSelection = false;
  toogleShowFilter() {

    this.ShowFilter = !this.ShowFilter;
    this.dropdownSettings = Object.assign({}, this.dropdownSettings, { allowSearchFilter: this.ShowFilter });
  }

  handleLimitSelection() {
    if (this.limitSelection) {
      this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: 2 });
    } else {
      this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: null });
    }
  }
  onItemSelect(item: any) {
    // this.multipleallarray = []
    // this.multiplearray.push(item.item_text)
    // this.select = "signle"
  }
  onSelectAll(items: any) {
    // this.select = "multiple"
    // this.multiplearray=[]
    // for(var i=0; i<items.length; i++){
    //  var arraylist = items[i].item_text
    //   this.multipleallarray.push(arraylist)
    // }

  }
  Submit() {
    var getform = this.OPSForm.value
    if (getform.ops_main_cluster_id == 0) {
      getform.ops_main_cluster_id = null
    }
    this.OPSForm.patchValue(getform)
    if (this.OPSForm.invalid) {
      this.markFormGroupTouched(this.OPSForm);
      this.getdata.showNotification('bottom', 'right', 'All fields are required !!', "danger");
      // this.getdata.notify('All Fields are required !!', "error");
      return false;
    }
    else {
      $("#submit").modal("show")
    }
  }
  Update() {
    var getform = this.OPSForm.value
    if (getform.ops_main_cluster_id == 0) {
      getform.ops_main_cluster_id = null
    }
    if(this.selectedItems.length == 1 && getform.frjustification == ""){
      var showerror = true
    }else{
      showerror = false
    }
    this.OPSForm.patchValue(getform)
    if (this.OPSForm.invalid || showerror == true) {
      this.markFormGroupTouched(this.OPSForm);
      this.getdata.showNotification('bottom', 'right', 'All fields are required !!', "danger");
      // this.getdata.notify('All Fields are required !!', "error");
      return false;

    }
    else {
      $("#submit").modal("show")
    }
  }
  getListdata = []
  getList() {
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
  clustername: any
  subclustName: any
  getsubclusterdta = []
  frstatus: any
  getsubcluster(id) {
    this.isLoading = true
    for (let i = 0; i < this.getListdata.length; i++) {
      var emtobj = this.getListdata[i]
      if (emtobj.id == id) {
        this.subclustName = emtobj.clustername
      }
    }
    let reqdata = "id=" + id
    return this.makeapi.method(this.getsubclusterApi, reqdata, "post")
      .subscribe(data => {
        this.isLoading = false
        this.getsubclusterdta = data
      },
        Error => {
        });
  }

  getppsclusterdta = []
  ppssubcluster(id) {
    this.isLoading = true
    let reqdata = "id=" + id
    return this.makeapi.method(this.getsubclusterApi, reqdata, "post")
      .subscribe(data => {
        this.isLoading = false
        this.getppsclusterdta = data
      },
        Error => {
        });
  }
  remarks = ""
  confirmSubmit() {
    this.isLoading = true
    var getform = this.OPSForm.value;
    getform.ops_sub_cluster = this.OPSForm.value.ops_sub_cluster;
    getform.final_resposibility = this.OPSForm.value.final_resposibility

    if (this.OPSForm.value.additional_remarks == "null" || this.OPSForm.value.additional_remarks == null) {
      this.remarks = ""
    } else {
      this.remarks = this.OPSForm.value.additional_remarks
    }
    var SelectArray = []
    for (let i = 0; i < getform.final_resposibility1.length; i++) {
      var emtobj = getform.final_resposibility1[i].finalresponsename
      console.log(emtobj)
      SelectArray.push(emtobj)
      var arrselect = SelectArray.join(',');
      getform.final_resposibility = arrselect;
      console.log(getform.final_resposibility)
    }
    if (getform.final_resposibility1.length == 1) {
      getform.frstatus = 1
    } else {
      getform.frstatus = 0
    }
    delete getform.final_resposibility1
    var reqdata = "id=" + this.PPSForm.value.id + "&ops_main_cluster_id=" + getform.ops_main_cluster_id +
      "&ops_sub_cluster=" + getform.ops_sub_cluster + "&final_resposibility=" + getform.final_resposibility +
      "&additional_remarks=" + this.remarks + "&opsmaincluster=" + this.subclustName + "&frstatus=" + getform.frstatus + "&frjustification=" + getform.frjustification;
 
    return this.makeapi.method(this.updateopsapi, reqdata, "post")
      .subscribe(data => {
        if (data.status == 'Success') {
          this.isLoading = false
          this.getdata.showNotification('bottom', 'right', 'OPS Updated !!', "success");
          // this.getdata.notify('OPS Updated !!', "success");
          this.router.navigateByUrl("/dashboard/ops")
          $("#submit").modal("hide")
        }
      },
        Error => {
        });
  }

  // confirmUpdate() {
  //   var reqdata = "id=" + this.PPSForm.value.id + "&additional_remarks=" + this.OPSremark.value.additional_remarks;
  //   return this.makeapi.method(this.updateopsapi, reqdata, "post")
  //     .subscribe(data => {
  //       $("#submit").modal("hide")
  //       this.router.navigateByUrl("/dashboard/ops")

  //     },
  //       Error => {
  //       });
  // }
  opsmaincluster: any;
  ops_sub_cluster: any;
  splitarrayvaluefin = []
  splitarrayvalue = []
  splitarrayfin = []
  initialfrom: any
  splitarrayvaluefin2 = []
  splitarrayfin2 = []
  getopasvalues(id) {
    this.isLoading = true
    this.makeapi.method(this.getopslist + "?id=" + id, "", "get")
      .subscribe(data => {
        this.isLoading = false
        this.splitarrayvalue = []
        var datas = data[0]
        this.frstatus = data[0].frstatus
        this.opsmaincluster = data[0].opsmaincluster
        this.ops_sub_cluster = data[0].ops_sub_cluster
        $("#opssubcluster").val(this.ops_sub_cluster)
        this.PPSForm.patchValue(data[0])
        if (datas.ops_main_cluster_id == 0) {
          datas.ops_main_cluster_id = null
        }
        if (datas.final_resposibility != "") {
          var splitselectfin = datas.final_resposibility
          this.splitarrayfin.push(splitselectfin)
          for (var i = 0; i < this.splitarrayfin.length; i++) {
            for (var j = 0; j < this.splitarrayfin[i].split(",").length; j++) {
              this.splitarrayvaluefin.push(this.splitarrayfin[i].split(",")[j]);
            }
          }

          var SelectedArrfin = [];
          for (var i = 0; i < this.splitarrayvaluefin.length; i++) {
            SelectedArrfin.push({
              id: this.map[this.splitarrayvaluefin[i]],
              finalresponsename: this.splitarrayvaluefin[i]
            });
          }
          this.selectedItems = SelectedArrfin
          datas.final_resposibility1 = SelectedArrfin
        }
        this.initialfrom = datas.init_responsibility
           
        // Initial responsibility

        if (this.initialfrom != null) {
          var splitselectfin2 = datas.init_responsibility
          this.splitarrayfin2.push(splitselectfin2)
          for (var i = 0; i < this.splitarrayfin2.length; i++) {
            for (var j = 0; j < this.splitarrayfin2[i].split(",").length; j++) {
              this.splitarrayvaluefin2.push(this.splitarrayfin2[i].split(",")[j]);
            }
          }
    
          var SelectedArrfin2 = [];
          for (var i = 0; i < this.splitarrayvaluefin2.length; i++) {
            SelectedArrfin2.push({
              item_id: this.map1[this.splitarrayvaluefin2[i]],
              item_text: this.splitarrayvaluefin2[i]
            });
          }
          this.selectedItems1 = SelectedArrfin2
          datas.init_responsibility1 = SelectedArrfin2
          this.PPSForm.patchValue(datas)
        }
        if(datas.ops_main_cluster_id != null){
          this.getsubcluster(datas.ops_main_cluster_id)
        }
        this.OPSForm.patchValue(datas)
      },
        Error => {
        });


  }
  changeopt(value) {

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

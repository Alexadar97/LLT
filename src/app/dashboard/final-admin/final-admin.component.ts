import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpModule } from '@angular/http';
import { DatatransferService } from '../../datatransfer.service'
import { AuthGuard } from '../../canactivate.service';
import { WebserviceService } from '../../webservice.service'
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Router, ActivatedRoute } from '@angular/router';

declare var $, moment;

@Component({
  selector: 'app-final-admin',
  templateUrl: './final-admin.component.html',
  styleUrls: ['./final-admin.component.css']
})
export class FinalAdminComponent implements OnInit {
  OPSForm: FormGroup;
  FinalForm: FormGroup
  loading = false;
  ShowFilter = false;
  limitSelection = false;
  private ppsfinalapi = this.getdata.appconstant + 'request/save';
  private getpplist = this.getdata.appconstant + 'request/getSingleLine';
  private listClusterApi = this.getdata.appconstant + 'cluster/list';
  private getsubclusterApi = this.getdata.appconstant + 'subcluster/filterlist';
  private listSubClusterApi = this.getdata.appconstant + 'finalresponse/list';

  constructor(private Formbuilder: FormBuilder, private http: Http, private router: Router, private getdata: DatatransferService,
    private makeapi: WebserviceService, private route: ActivatedRoute, private AuthGuard: AuthGuard) {
    this.FinalForm = this.Formbuilder.group({
      "id": null,
      "month": [null, Validators.compose([Validators.required])],
      "date": [null, Validators.compose([Validators.required])],
      "model": [null, Validators.compose([Validators.required])],
      "loss_qty": [null, Validators.compose([Validators.required])],
      "loss_time": [null, Validators.compose([Validators.required])],
      "loss_description": [null, Validators.compose([Validators.required])],
      "pps_main_cluster_id": [null, Validators.compose([Validators.required])],
      "pps_sub_cluster": [null, Validators.compose([Validators.required])],
      "ppsmaincluster": "",

      "final_resposibility": "",
      "final_resposibility1": [null, Validators.compose([Validators.required])],
      "supplier_name": [null, Validators.compose([Validators.required])],
      "vendor_code": [null, Validators.compose([Validators.required])],

      "ops_main_cluster_id": [null, Validators.compose([Validators.required])],
      "opsmaincluster": "",
      "ops_sub_cluster": [null, Validators.compose([Validators.required])],
      "additional_remarks": "",
      "root_cause_analysis": [null, Validators.compose([Validators.required])],
      "inter_cor_action": [null, Validators.compose([Validators.required])],
      "permanent_cor_action": [null, Validators.compose([Validators.required])],
      "init_responsibility1": [null, Validators.compose([Validators.required])],
      "init_responsibility": '',
      "processgap": [null, Validators.compose([Validators.required])],
      "frjustification": [null, Validators.compose([Validators.required])],
      "year": "",
      "isDraft": "",
    });


  }

  ppsfinalvalue: any
  ppsfinalid: any
  usertype: any
  map: any
  AdminEdit: any
  ngOnInit() {
    this.AdminEdit = localStorage.getItem("AdminEdit")
    console.log(this.AdminEdit)
    this.usertype = this.AuthGuard.session().usertype
    this.FinalresList()
    $("#date").change(function () {
      console.log($("#date").val());

    })
    this.ppsfinalvalue = this.getdata.ppsfinalvalue
    this.route.queryParams.filter(params => params.ppsfinalid)
      .subscribe(params => {
        this.ppsfinalid = params.ppsfinalid;
        console.log(this.ppsfinalid)
        this.getfinalvalues(this.ppsfinalid)
      });

    this.getList()
    this.map = {
      'SM-Q': 1,
      'SM-P': 2,
      'SM-V': 3,
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
      'R&D':17,
      'OBL':18,
      'Cab Trim':19,
      'Chassis':20,
      'Engine':21,
      'Transmission':22,
      'Frame':23,
      'LCM':24,
      'Bus':25,
      'HR':26,
    }
    this.dropdownList = [
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
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    allowSearchFilter: this.ShowFilter
  };
  multiplearray = []
  multipleallarray = []
  select: any
  onItemSelect(item: any) {
    this.multipleallarray = []
    this.multiplearray.push(item.item_text)
    this.select = "signle"
  }
  onSelectAll(items: any) {
    this.select = "multiple"
    this.multiplearray = []
    for (var i = 0; i < items.length; i++) {
      var arraylist = items[i].item_text
      this.multipleallarray.push(arraylist)
    }
  }
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
  getListdata = []
  isLoading = false
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
  subcluid: any
  getsubclusterdta = []
  getsubcluster(id) {
    this.isLoading = true
    this.subcluid = id
    let reqdata = "id=" + this.subcluid
    return this.makeapi.method(this.getsubclusterApi, reqdata, "post")
      .subscribe(data => {
        this.isLoading = false
        this.getsubclusterdta = data
      },
        Error => {
        });
  }
  Finalresdata = []
  map1=[]
  FinalresList() {
    this.isLoading = true
    let reqdata = {};
    return this.makeapi.method(this.listSubClusterApi, '', "postjson")
      .subscribe(data => {
        this.isLoading = false
        this.Finalresdata = data
        for(let i=0; i<data.length; i++){
          var values = data[i].finalresponsename
          var id = data[i].id
          this.map1[values] = id
        }
      },
        Error => {
        });
  }
  ShowFilterfin = false;

  selectedItemsfin = [];
  dropdownSettingsfin = {
    singleSelection: false,
    idField: 'id',
    textField: 'finalresponsename',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    allowSearchFilter: this.ShowFilterfin
  };

  limitSelectionfin = false;
  toogleShowFilterfin() {

    this.ShowFilterfin = !this.ShowFilterfin;
    this.dropdownSettingsfin = Object.assign({}, this.dropdownSettingsfin, { allowSearchFilter: this.ShowFilterfin });
  }

  handleLimitSelectionfin() {
    if (this.limitSelectionfin) {
      this.dropdownSettingsfin = Object.assign({}, this.dropdownSettingsfin, { limitSelectionfin: 2 });
    } else {
      this.dropdownSettingsfin = Object.assign({}, this.dropdownSettingsfin, { limitSelectionfin: null });
    }
  }
  multipleallarrayfin = []
  multiplearrayfin = []
  selectfin: any
  onItemSelectfin(item: any) {
    this.multipleallarrayfin = []
    this.multiplearrayfin.push(item.finalresponsename)
    this.selectfin = "signle"
  }
  onSelectAllfin(items: any) {
    this.selectfin = "multiple"
    this.multiplearrayfin = []
    for (var i = 0; i < items.length; i++) {
      var arraylist = items[i].finalresponsename
      this.multipleallarrayfin.push(arraylist)
    }
  }
  opsclustername: any
  opssubcluid: any
  opsgetsubclusterdta = []
  opssubcluster(id) {
    this.opssubcluid = id
    let reqdata = "id=" + this.opssubcluid
    return this.makeapi.method(this.getsubclusterApi, reqdata, "post")
      .subscribe(data => {
        this.opsgetsubclusterdta = data
      },
        Error => {
        });
  }

  Submit() {
   var getform = this.FinalForm.value
    if((this.selectedItemsfin.length == 1) && (getform.frjustification == "" || getform.frjustification == null)){
      var showerror = true
    }else{
      showerror = false
    }
    if (showerror == true) {
      this.getdata.showNotification('bottom', 'right', 'Justification is required !!', "danger");
      return false;
   
    }
    else {
      $("#submit").modal("show")
    }
  }
  confirmSubmit() {
    this.isLoading = true
    var reqdata = this.FinalForm.value
    var SelectArray = []
    for (let i = 0; i < reqdata.init_responsibility1.length; i++) {
      var emtobj = reqdata.init_responsibility1[i].item_text
      SelectArray.push(emtobj)
      var arrselect = SelectArray.join(',');
      reqdata.init_responsibility = arrselect;
    }
    delete reqdata.init_responsibility1

    reqdata.createddate = this.createddate
    reqdata.shortid = this.AuthGuard.session().shortid
    reqdata.status = this.status
    reqdata.deleteStatus = this.deleteStatus
    reqdata.justification = this.justification
    var SelectArrayfin = []
    for (let i = 0; i < reqdata.final_resposibility1.length; i++) {
      var emtobjfin = reqdata.final_resposibility1[i].finalresponsename
      console.log(emtobjfin)
      SelectArray.push(emtobjfin)
      var arrselectfin = SelectArrayfin.join(',');
      reqdata.final_resposibility = arrselectfin;
      console.log(reqdata.final_resposibility)
    }
    delete reqdata.final_resposibility1

    // reqdata.date = $("#date").val()

    return this.makeapi.method(this.ppsfinalapi, reqdata, "postjson")
      .subscribe(data => {
        if (data.status == 'Success') {
          this.isLoading = false
          var SetRouter = localStorage.getItem("adminEdit")
          this.router.navigateByUrl("/dashboard/" + SetRouter)
          $("#submit").modal("hide");
          this.FinalForm.reset();
            this.getdata.showNotification('bottom', 'right', 'PPS Edited Successfully !!', "success");
            // this.getdata.notify('PPS Edited Successfully !!', "success");
        }
      },
        Error => {
        });
  }
  changecluster(event) {

  }
  changeres(event) {

  }
  changeStatus(event) {

  }
  splitarray = []
  splitarrayvalue = []
  editid = null
  createddate: any
  deleteStatus: any
  status: any
  justification: any
  splitarrayvaluefin = []
  splitarrayfin = []
  getfinalvalues(id) {
    this.isLoading = true
    this.makeapi.method(this.getpplist + "?id=" + id, "", "get")
      .subscribe(data => {
        this.isLoading = false
        this.splitarray = []
        this.splitarrayvalue = []
        var datas = data[0]
        var splitselect = datas.init_responsibility
        if(splitselect != null && splitselect != ""){
          this.splitarray.push(splitselect)
          for (var i = 0; i < this.splitarray.length; i++) {
            for (var j = 0; j < this.splitarray[i].split(",").length; j++) {
              this.splitarrayvalue.push(this.splitarray[i].split(",")[j]);
              // datas.init_responsibility = this.splitarrayvalue
            }
          }
          var SelectedArr = [];
          for (var i = 0; i < this.splitarrayvalue.length; i++) {
            SelectedArr.push({
              item_id: this.map[this.splitarrayvalue[i]],
              item_text: this.splitarrayvalue[i]
            });
          }
          this.selectedItems = SelectedArr
          data.init_responsibility1 = SelectedArr
  
        }
       
        var splitselectfin = datas.final_resposibility
        if(splitselectfin != null && splitselectfin != ""){
        this.splitarrayfin.push(splitselectfin)
        for (var i = 0; i < this.splitarrayfin.length; i++) {
          for (var j = 0; j < this.splitarrayfin[i].split(",").length; j++) {
            this.splitarrayvaluefin.push(this.splitarrayfin[i].split(",")[j]);
            // datas.init_responsibility = this.splitarrayvalue
          }
        }
        var SelectedArrfin = [];
        for (var i = 0; i < this.splitarrayvaluefin.length; i++) {
          SelectedArrfin.push({
            id: this.map1[this.splitarrayvaluefin[i]],
            finalresponsename: this.splitarrayvaluefin[i]
          });
        }
        this.selectedItemsfin = SelectedArrfin
        data.final_resposibility1 = SelectedArrfin
      }

        console.log(data.final_resposibility1)
        this.editid = datas.id
        this.status = datas.status
        this.createddate = datas.createddate
        this.deleteStatus = datas.deleteStatus
        this.justification = datas.justification
        this.getsubcluster(datas.pps_main_cluster_id)
        this.opssubcluster(datas.ops_main_cluster_id)
        if (datas.ops_main_cluster_id == 0) {
          datas.ops_main_cluster_id = null
        }
        this.FinalForm.patchValue(datas)
        $("#date").val(datas.date)
      },
        Error => {
        });
  }
  back() {
    var SetRouter = localStorage.getItem("adminEdit")
    this.router.navigateByUrl("/dashboard/" + SetRouter)
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

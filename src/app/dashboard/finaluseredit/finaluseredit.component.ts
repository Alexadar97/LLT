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
import { AuthGuard } from '../../canactivate.service';

declare var $;

@Component({
  selector: 'app-finaluseredit',
  templateUrl: './finaluseredit.component.html',
  styleUrls: ['./finaluseredit.component.css']
})
export class FinalusereditComponent implements OnInit {

  BasicForm: FormGroup;
  FinalForm: FormGroup
  map1={}
  loading = false;
  private opsppslistapi = this.getdata.appconstant + 'request/ppsOpsList';
  private updatefinalsave = this.getdata.appconstant + 'request/updateByFinalUser';
  private getopslist = this.getdata.appconstant + 'request/getSingleLine';
  private listClusterApi = this.getdata.appconstant + 'cluster/list';
  private listSubClusterApi = this.getdata.appconstant + 'finalresponse/list';
  constructor(private Formbuilder: FormBuilder, private http: Http, private router: Router, private getdata: DatatransferService,
    private makeapi: WebserviceService, private route: ActivatedRoute, private AuthGuard: AuthGuard) {
    this.BasicForm = this.Formbuilder.group({
      "id": null,
      "month": [null],
      "date": [null],
      "model": [null],
      "loss_qty": [null],
      "loss_time": [null],
      "loss_description": [null],
      "init_responsibility": [null],
      "init_responsibility1": [null],
      "pps_main_cluster_id": [null],
      "pps_sub_cluster": [null],
      "ops_main_cluster_id": [null],
      "ops_sub_cluster": [null],
      "additional_remarks": [null],
      "final_resposibility": [null],
      "final_resposibility1": [null],
      "supplier_name": [null],
      "vendor_code": [null],
      "frjustification": [null],
    });
    this.FinalForm = this.Formbuilder.group({
      "root_cause_analysis": [null, Validators.compose([Validators.required])],
      "inter_cor_action": [null, Validators.compose([Validators.required])],
      "permanent_cor_action": [null, Validators.compose([Validators.required])],
      "processgap": [null, Validators.compose([Validators.required])],
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
  finaleditid: any
  ngOnInit() {
    this.FinalresList()
    this.getList()
    this.route.queryParams.filter(params => params.finaleditid)
      .subscribe(params => {
        this.finaleditid = params.finaleditid;
        this.finaleditvalues(this.finaleditid)
      });
  }
  Finalresdata = []
  finalresponsename = []
  isLoading = false
  map={}
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
  submit() {
    if (this.FinalForm.invalid) {
      this.markFormGroupTouched(this.FinalForm);
      this.getdata.showNotification('bottom', 'right', 'All fields are required !!', "danger");
      // this.getdata.notify('All Fields are required !!', "error");
      return false;

    } else {
      $("#submit").modal("show")
    }
  }
  confirmUpdate() {
    this.isLoading = true
    var getform = this.FinalForm.value;

    if (this.FinalForm.value.root_cause_analysis == null) {
      getform.root_cause_analysis = ""
    } else {
      getform.root_cause_analysis = this.FinalForm.value.root_cause_analysis;
    }
    if (this.FinalForm.value.inter_cor_action == null) {
      getform.inter_cor_action = ""
    } else {
      getform.inter_cor_action = this.FinalForm.value.inter_cor_action;
    }
    if (this.FinalForm.value.permanent_cor_action == null) {
      getform.permanent_cor_action = ""
    } else {
      getform.permanent_cor_action = this.FinalForm.value.permanent_cor_action;
    }



    if (this.rcashortid == null) {
      getform.rcashortid = ""
    } else {
      getform.rcashortid = this.rcashortid
    }
    if (this.icashortid == null) {
      getform.icashortid = ""
    } else {
      getform.icashortid = this.icashortid
    }
    if (this.pcashortid == null) {
      getform.pcashortid = ""
    } else {
      getform.pcashortid = this.pcashortid
    }


    getform.shortid = this.AuthGuard.session().shortid
    var reqdata = "id=" + this.BasicForm.value.id + "&root_cause_analysis=" + getform.root_cause_analysis + "&inter_cor_action=" + getform.inter_cor_action
      + "&permanent_cor_action=" + getform.permanent_cor_action + "&rcashortid=" + getform.rcashortid + "&icashortid=" + getform.icashortid
      + "&pcashortid=" + getform.pcashortid + "&shortid=" + getform.shortid + "&processgap=" + getform.processgap;

    return this.makeapi.method(this.updatefinalsave, reqdata, "post")
      .subscribe(data => {
        if (data.status == 'Success') {
          this.isLoading = false
          this.getdata.showNotification('bottom', 'right', 'Final Responsibility Updated !!', "success");
          // this.getdata.notify('Final Responsibility Updated !!', "success");
          this.FinalForm.reset()
          $("#submit").modal("hide")
          this.router.navigateByUrl("/dashboard/final")
        }

      },
        Error => {
        });


  }
  rcashortid: any
  icashortid: any
  pcashortid: any
  rcatimestamp: any
  icatimestamp: any
  pcatimestamp: any
  splitarrayvaluefin = []
  splitarrayvalue = []
  splitarrayfin = []
  initialfrom: any
  splitarrayvaluefin2 = []
  splitarrayfin2 = []
  finaleditvalues(id) {
    this.isLoading = true
    this.makeapi.method(this.getopslist + "?id=" + id, "", "get")
      .subscribe(data => {
        var datas= data[0]
        this.isLoading = false
        this.rcashortid = data[0].rcashortid
        this.icashortid = data[0].icashortid
        this.pcashortid = data[0].pcashortid
        this.BasicForm.patchValue(data[0])
        this.FinalForm.patchValue(data[0])
        if (data[0].root_cause_analysis != null) {
          $("#root").attr("disabled", true);
        }
        if (data[0].inter_cor_action != null) {
          $("#inter").attr("disabled", true);
        }
        if (data[0].permanent_cor_action != null) {
          $("#permanent").attr("disabled", true);
        }
        this.rcatimestamp = data[0].rcatimestamp
        this.icatimestamp = data[0].icatimestamp
        this.pcatimestamp = data[0].pcatimestamp
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
          this.BasicForm.patchValue(datas)
        }
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

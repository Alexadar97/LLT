import { Component, OnInit, ViewChild } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { HttpModule } from '@angular/http';
import { DatatransferService } from '../../datatransfer.service'
import { WebserviceService } from '../../webservice.service'
import { AuthGuard } from '../../canactivate.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Router } from '@angular/router';

declare var $;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  InitialResponsibilityForm: FormGroup;
  FinalResponsibilityForm: FormGroup;
  ppssearch: FormGroup;
  private opsppslistapi = this.getdata.appconstant + 'request/ppsOpsList';
  private searchapi = this.getdata.appconstant + 'request/ppsOpsList';
  private deleteStatusApi = this.getdata.appconstant + 'request/deleteLine';
  private errorlistAPI = this.getdata.appconstant + 'lossestrack/list';
  private DownloadFileApi = this.getdata.appconstant + 'request/downloadExcel?status=';
  private listSubClusterApi = this.getdata.appconstant + 'finalresponse/list';
  private initalresAPI = this.getdata.appconstant + 'request/updateInitialResponse';
  private FianlresAPI = this.getdata.appconstant + 'request/updatefinalResponse';
  private deleteDraftApi = this.getdata.appconstant + 'request/delete';
  private getfilterddapi = this.getdata.appconstant + 'request/getFilterColumns';
  private PaginateAPI = this.getdata.appconstant + 'request/getPaginationCount';

  isLoading = false
  ShowFilter = false;
  limitSelection = false;
  map={}
  p1 = 1;
  p2 = 1;
  p3 = 1;
  constructor(private http: Http, private Formbuilder: FormBuilder, private router: Router, private getdata: DatatransferService,
    private makeapi: WebserviceService, private AuthGuard: AuthGuard) {
    this.ppssearch = this.Formbuilder.group({
      "ppssearch": [null],
    })
    this.InitialResponsibilityForm = this.Formbuilder.group({
      "id": [null],
      "init_responsibility": "",
      "init_responsibility1": [null, Validators.compose([Validators.required])],
      "justification": [null],
    });
    this.FinalResponsibilityForm = this.Formbuilder.group({
      "id": [null],
      "final_resposibility": [null, Validators.compose([Validators.required])],
      "frjustification": [null, Validators.compose([Validators.required])],
    });
    this.map = {
      'SM-Q':1,
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
    $(document).ready(function () {
      $('#list-item1').addClass("ppsclass");
    });
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
    // this.multipleallarray = []
    // this.multiplearray.push(item.item_text)
    // this.select = "signle"
  }
  onSelectAll(items: any) {
    // this.select = "multiple"
    // this.multiplearray = []
    // for (var i = 0; i < items.length; i++) {
    //   var arraylist = items[i].item_text
    //   this.multipleallarray.push(arraylist)
    // }

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
  Finalresdata = []
  FinalresList() {
    this.isLoading = true
    let reqdata = {};
    return this.makeapi.method(this.listSubClusterApi, '', "postjson")
      .subscribe(data => {
        this.isLoading = false
        this.Finalresdata = data
      },
        Error => {
        });
  }


  usetype: any
  depttype: any

  ngOnInit() {
    $('#list-item1').css({
      "border-bottom": "3px solid rgb(36, 37, 54)"
    })
    //   $(document).ready(function(){
    //     $('#list-item1').addClass("ppsclass");
    // });
    this.fileuploadtrue = false
    this.DraftList()
    this.getfilterlist()
    var depttype = this.AuthGuard.session().depttype
    // this.depttype = depttype.toLowerCase()
    // this.router.navigateByUrl("dashboard/"+this.depttype)
    // this.usetype = this.AuthGuard.session().usertype
    this.activetrue = true
    this.InitiateList()
    this.PaginationCount()
    //   $(document).ready(function(){
    //     $('#list-item1').addClass("ppsclass");
    // });
  }
  monthsList = [];
  ModelList = [];
  SupplierName = [];
  OPSMainCluster = [];
  PPSMainCluster = [];
  PPSSubCluster = [];
  FinalResponse = [];
  SupplierCode = [];
  OPSSubCluster = []
  getfilterlist() {
    this.isLoading = true
    return this.makeapi.method(this.getfilterddapi, "", "get")
      .subscribe(data => {
        this.isLoading = false
        this.monthsList = data.month
        this.ModelList = data.model
        this.SupplierName = data.supplier_name
        this.OPSMainCluster = data.opsmaincluster
        this.PPSMainCluster = data.ppsmaincluster
        this.PPSSubCluster = data.pps_sub_cluster
        this.FinalResponse = data.final_resposibility
        this.SupplierCode = data.vendor_code
        this.OPSSubCluster = data.ops_sub_cluster

        console.log(this.monthsList)
      },
        Error => {
        });
  }

  clearTypeCheckBoxes() {
    $(".typeSelectBox").each(function (index) {
      this.checked = false;
    });
  }

  clearFilterValues() {
    this.setvalues = [];

    this.clearTypeCheckBoxes();

  }
  vendorpopulateTypeArr(isChecked, event) {
    if (isChecked) {
      //existing logic
      this.vendorvalues.push(event)
      this.isselected = "true"

    } else {
      //for loop - remove the event  - this.typevalue
      var tmpArr = []
      for (var x = 0; x < this.vendorvalues.length; x++) {
        if (this.vendorvalues[x] != event) {
          tmpArr.push(this.vendorvalues[x])
        }

      }

      this.vendorvalues = tmpArr;
    }
  }
  vendorvalues = []
  setvalues = []
  prrequestlistbackup = []
  isselected: any
  vendor(event2, key) {
    this.isLoading = true
    var isChecked = event2.target.checked;
    var event = event2.target.value;
    if (event == "null") {
      this.Opslist = this.prrequestlistbackup
    } else {
      this.vendorpopulateTypeArr(isChecked, event)

      var existingValueIndex = -1;
      for (var i = 0; i < this.setvalues.length; i++) {
        var tmpObj = this.setvalues[i];
        if (tmpObj['filtertype'] == key) {
          existingValueIndex = i;
        }
      }
      if (this.DataSearch == undefined) {
        this.DataSearch = ""
      }

      var reqdata = { "filtertype": key, "values": this.vendorvalues }
      if (existingValueIndex == -1) {
        this.setvalues.push(reqdata)
      } else {
        this.setvalues[existingValueIndex] = reqdata
      }


      var senddata = { "searchstr": this.DataSearch, "status": this.searchvalue, "pagination": this.currentPage, "shortid": this.AuthGuard.session().shortid, "filterList": this.setvalues }

      if (this.vendorvalues.length == 0) {
        senddata = { "searchstr": this.DataSearch, "status": this.searchvalue, "pagination": this.currentPage, "shortid": this.AuthGuard.session().shortid, "filterList": this.setvalues }
      }
      var tmpArrSetValues = [];
      for (var i = 0; i < this.setvalues.length; i++) {
        var obj = this.setvalues[i]
        if (obj.values.length != 0) {
          tmpArrSetValues.push(obj);
        }
      }


      this.setvalues = tmpArrSetValues;

      senddata = { "searchstr": this.DataSearch, "status": this.searchvalue, "pagination": this.currentPage, "shortid": this.AuthGuard.session().shortid, "filterList": this.setvalues }
      // var reqdata = {"searchstr":this.serachvalue,"filtertype":key,"values":this.ivoicenvalue}
      return this.makeapi.method(this.opsppslistapi, senddata, "postjson")
        .subscribe(data => {
          this.selectedvalue = true
          this.isLoading = false
          this.Opslist = data
          this.Pending = data
          this.DraftLIstData = data
          this.FinalLIstData = data
          this.PaginationCount()
        },
          Error => {
          });
    }
  }
  selectedvalue = false
  ModelTypeArr(isChecked, event) {
    if (isChecked) {
      //existing logic
      this.isselected = "true"
      this.Model.push(event)

    } else {
      //for loop - remove the event  - this.Model
      var tmpArr = []
      for (var x = 0; x < this.Model.length; x++) {
        if (this.Model[x] != event) {
          tmpArr.push(this.Model[x])
        }

      }

      this.Model = tmpArr;
    }
  }

  Model = []

  model(event2, key) {
    this.isLoading = true
    var isChecked = event2.target.checked;
    var event = event2.target.value;
    if (event == "null") {
      this.Opslist = this.prrequestlistbackup
    } else {
      this.ModelTypeArr(isChecked, event)

      var existingValueIndex = -1;
      for (var i = 0; i < this.setvalues.length; i++) {
        var tmpObj = this.setvalues[i];
        if (tmpObj['filtertype'] == key) {
          existingValueIndex = i;
        }
      }
      if (this.DataSearch == undefined) {
        this.DataSearch = ""
      }

      var reqdata = { "filtertype": key, "values": this.Model }
      if (existingValueIndex == -1) {
        this.setvalues.push(reqdata)
      } else {
        this.setvalues[existingValueIndex] = reqdata
      }


      var senddata = { "searchstr": this.DataSearch, "status": this.searchvalue, "pagination": this.currentPage, "shortid": this.AuthGuard.session().shortid, "filterList": this.setvalues }

      if (this.Model.length == 0) {
        senddata = { "searchstr": this.DataSearch, "status": this.searchvalue, "pagination": this.currentPage, "shortid": this.AuthGuard.session().shortid, "filterList": this.setvalues }
      }
      var tmpArrSetValues = [];
      for (var i = 0; i < this.setvalues.length; i++) {
        var obj = this.setvalues[i]
        if (obj.values.length != 0) {
          tmpArrSetValues.push(obj);
        }
      }


      this.setvalues = tmpArrSetValues;

      senddata = { "searchstr": this.DataSearch, "status": this.searchvalue, "pagination": this.currentPage, "shortid": this.AuthGuard.session().shortid, "filterList": this.setvalues }
      // var reqdata = {"searchstr":this.serachvalue,"filtertype":key,"values":this.ivoicenvalue}
      return this.makeapi.method(this.opsppslistapi, senddata, "postjson")
        .subscribe(data => {
          this.selectedvalue = true
          this.isLoading = false
          this.Opslist = data
          this.Pending = data
          this.DraftLIstData = data
          this.FinalLIstData = data
          this.PaginationCount()
        },
          Error => {
          });
    }
  }
  PPSmainClusterArr(isChecked, event) {
    if (isChecked) {
      //existing logic
      this.isselected = "true"
      this.MaiCluster.push(event)

    } else {
      //for loop - remove the event  - this.Model
      var tmpArr = []
      for (var x = 0; x < this.MaiCluster.length; x++) {
        if (this.MaiCluster[x] != event) {
          tmpArr.push(this.MaiCluster[x])
        }

      }

      this.MaiCluster = tmpArr;
    }
  }

  MaiCluster = []

  PPMainCluster(event2, key) {
    this.isLoading = true
    var isChecked = event2.target.checked;
    var event = event2.target.value;
    if (event == "null") {
      this.Opslist = this.prrequestlistbackup
    } else {
      this.PPSmainClusterArr(isChecked, event)

      var existingValueIndex = -1;
      for (var i = 0; i < this.setvalues.length; i++) {
        var tmpObj = this.setvalues[i];
        if (tmpObj['filtertype'] == key) {
          existingValueIndex = i;
        }
      }
      if (this.DataSearch == undefined) {
        this.DataSearch = ""
      }

      var reqdata = { "filtertype": key, "values": this.MaiCluster }
      if (existingValueIndex == -1) {
        this.setvalues.push(reqdata)
      } else {
        this.setvalues[existingValueIndex] = reqdata
      }


      var senddata = { "searchstr": this.DataSearch, "status": this.searchvalue, "pagination": this.currentPage, "shortid": this.AuthGuard.session().shortid, "filterList": this.setvalues }

      if (this.MaiCluster.length == 0) {
        senddata = { "searchstr": this.DataSearch, "status": this.searchvalue, "pagination": this.currentPage, "shortid": this.AuthGuard.session().shortid, "filterList": this.setvalues }
      }
      var tmpArrSetValues = [];
      for (var i = 0; i < this.setvalues.length; i++) {
        var obj = this.setvalues[i]
        if (obj.values.length != 0) {
          tmpArrSetValues.push(obj);
        }
      }


      this.setvalues = tmpArrSetValues;

      senddata = { "searchstr": this.DataSearch, "status": this.searchvalue, "pagination": this.currentPage, "shortid": this.AuthGuard.session().shortid, "filterList": this.setvalues }
      // var reqdata = {"searchstr":this.serachvalue,"filtertype":key,"values":this.ivoicenvalue}
      return this.makeapi.method(this.opsppslistapi, senddata, "postjson")
        .subscribe(data => {
          this.selectedvalue = true
          this.isLoading = false
          this.Opslist = data
          this.Pending = data
          this.DraftLIstData = data
          this.FinalLIstData = data
          this.PaginationCount()
        },
          Error => {
          });
    }
  }
  PPSsubClusterArr(isChecked, event) {
    if (isChecked) {
      //existing logic
      this.isselected = "true"
      this.ppsSubCluster.push(event)

    } else {
      //for loop - remove the event  - this.Model
      var tmpArr = []
      for (var x = 0; x < this.ppsSubCluster.length; x++) {
        if (this.ppsSubCluster[x] != event) {
          tmpArr.push(this.ppsSubCluster[x])
        }

      }

      this.ppsSubCluster = tmpArr;
    }
  }

  ppsSubCluster = []

  PPssubCluster(event2, key) {
    this.isLoading = true
    var isChecked = event2.target.checked;
    var event = event2.target.value;
    if (event == "null") {
      this.Opslist = this.prrequestlistbackup
    } else {
      this.PPSsubClusterArr(isChecked, event)

      var existingValueIndex = -1;
      for (var i = 0; i < this.setvalues.length; i++) {
        var tmpObj = this.setvalues[i];
        if (tmpObj['filtertype'] == key) {
          existingValueIndex = i;
        }
      }
      if (this.DataSearch == undefined) {
        this.DataSearch = ""
      }

      var reqdata = { "filtertype": key, "values": this.ppsSubCluster }
      if (existingValueIndex == -1) {
        this.setvalues.push(reqdata)
      } else {
        this.setvalues[existingValueIndex] = reqdata
      }


      var senddata = { "searchstr": this.DataSearch, "status": this.searchvalue, "pagination": this.currentPage, "shortid": this.AuthGuard.session().shortid, "filterList": this.setvalues }

      if (this.ppsSubCluster.length == 0) {
        senddata = { "searchstr": this.DataSearch, "status": this.searchvalue, "pagination": this.currentPage, "shortid": this.AuthGuard.session().shortid, "filterList": this.setvalues }
      }
      var tmpArrSetValues = [];
      for (var i = 0; i < this.setvalues.length; i++) {
        var obj = this.setvalues[i]
        if (obj.values.length != 0) {
          tmpArrSetValues.push(obj);
        }
      }


      this.setvalues = tmpArrSetValues;

      senddata = { "searchstr": this.DataSearch, "status": this.searchvalue, "pagination": this.currentPage, "shortid": this.AuthGuard.session().shortid, "filterList": this.setvalues }
      // var reqdata = {"searchstr":this.serachvalue,"filtertype":key,"values":this.ivoicenvalue}
      return this.makeapi.method(this.opsppslistapi, senddata, "postjson")
        .subscribe(data => {
          this.selectedvalue = true
          this.isLoading = false
          this.Opslist = data
          this.Pending = data
          this.DraftLIstData = data
          this.FinalLIstData = data
          this.PaginationCount()
        },
          Error => {
          });
    }
  }
  OPSsubClusterArr(isChecked, event) {
    if (isChecked) {
      //existing logic
      this.isselected = "true"
      this.opsSubCluster.push(event)

    } else {
      //for loop - remove the event  - this.Model
      var tmpArr = []
      for (var x = 0; x < this.opsSubCluster.length; x++) {
        if (this.opsSubCluster[x] != event) {
          tmpArr.push(this.opsSubCluster[x])
        }

      }

      this.ppsSubCluster = tmpArr;
    }
  }

  opsSubCluster = []

  OPssubCluster(event2, key) {
    this.isLoading = true
    var isChecked = event2.target.checked;
    var event = event2.target.value;
    if (event == "null") {
      this.Opslist = this.prrequestlistbackup
    } else {
      this.OPSsubClusterArr(isChecked, event)

      var existingValueIndex = -1;
      for (var i = 0; i < this.setvalues.length; i++) {
        var tmpObj = this.setvalues[i];
        if (tmpObj['filtertype'] == key) {
          existingValueIndex = i;
        }
      }
      if (this.DataSearch == undefined) {
        this.DataSearch = ""
      }

      var reqdata = { "filtertype": key, "values": this.opsSubCluster }
      if (existingValueIndex == -1) {
        this.setvalues.push(reqdata)
      } else {
        this.setvalues[existingValueIndex] = reqdata
      }


      var senddata = { "searchstr": this.DataSearch, "status": this.searchvalue, "pagination": this.currentPage, "shortid": this.AuthGuard.session().shortid, "filterList": this.setvalues }

      if (this.opsSubCluster.length == 0) {
        senddata = { "searchstr": this.DataSearch, "status": this.searchvalue, "pagination": this.currentPage, "shortid": this.AuthGuard.session().shortid, "filterList": this.setvalues }
      }
      var tmpArrSetValues = [];
      for (var i = 0; i < this.setvalues.length; i++) {
        var obj = this.setvalues[i]
        if (obj.values.length != 0) {
          tmpArrSetValues.push(obj);
        }
      }


      this.setvalues = tmpArrSetValues;

      senddata = { "searchstr": this.DataSearch, "status": this.searchvalue, "pagination": this.currentPage, "shortid": this.AuthGuard.session().shortid, "filterList": this.setvalues }
      // var reqdata = {"searchstr":this.serachvalue,"filtertype":key,"values":this.ivoicenvalue}
      return this.makeapi.method(this.opsppslistapi, senddata, "postjson")
        .subscribe(data => {
          this.selectedvalue = true
          this.isLoading = false
          this.Opslist = data
          this.Pending = data
          this.DraftLIstData = data
          this.FinalLIstData = data
          this.PaginationCount()
        },
          Error => {
          });
    }
  }
  OPSmainClusterArr(isChecked, event) {
    if (isChecked) {
      //existing logic
      this.isselected = "true"
      this.opsmainCluster.push(event)

    } else {
      //for loop - remove the event  - this.Model
      var tmpArr = []
      for (var x = 0; x < this.opsmainCluster.length; x++) {
        if (this.opsmainCluster[x] != event) {
          tmpArr.push(this.opsmainCluster[x])
        }

      }

      this.ppsSubCluster = tmpArr;
    }
  }

  opsmainCluster = []

  OPsmainCluster(event2, key) {
    this.isLoading = true
    var isChecked = event2.target.checked;
    var event = event2.target.value;
    if (event == "null") {
      this.Opslist = this.prrequestlistbackup
    } else {
      this.OPSmainClusterArr(isChecked, event)

      var existingValueIndex = -1;
      for (var i = 0; i < this.setvalues.length; i++) {
        var tmpObj = this.setvalues[i];
        if (tmpObj['filtertype'] == key) {
          existingValueIndex = i;
        }
      }
      if (this.DataSearch == undefined) {
        this.DataSearch = ""
      }

      var reqdata = { "filtertype": key, "values": this.opsmainCluster }
      if (existingValueIndex == -1) {
        this.setvalues.push(reqdata)
      } else {
        this.setvalues[existingValueIndex] = reqdata
      }


      var senddata = { "searchstr": this.DataSearch, "status": this.searchvalue, "pagination": this.currentPage, "shortid": this.AuthGuard.session().shortid, "filterList": this.setvalues }

      if (this.opsmainCluster.length == 0) {
        senddata = { "searchstr": this.DataSearch, "status": this.searchvalue, "pagination": this.currentPage, "shortid": this.AuthGuard.session().shortid, "filterList": this.setvalues }
      }
      var tmpArrSetValues = [];
      for (var i = 0; i < this.setvalues.length; i++) {
        var obj = this.setvalues[i]
        if (obj.values.length != 0) {
          tmpArrSetValues.push(obj);
        }
      }


      this.setvalues = tmpArrSetValues;

      senddata = { "searchstr": this.DataSearch, "status": this.searchvalue, "pagination": this.currentPage, "shortid": this.AuthGuard.session().shortid, "filterList": this.setvalues }
      // var reqdata = {"searchstr":this.serachvalue,"filtertype":key,"values":this.ivoicenvalue}
      return this.makeapi.method(this.opsppslistapi, senddata, "postjson")
        .subscribe(data => {
          this.selectedvalue = true
          this.isLoading = false
          this.Opslist = data
          this.Pending = data
          this.DraftLIstData = data
          this.FinalLIstData = data
          this.PaginationCount()
        },
          Error => {
          });
    }
  }
  FinalResponseArr(isChecked, event) {
    if (isChecked) {
      //existing logic
      this.isselected = "true"
      this.finalResponse.push(event)

    } else {
      //for loop - remove the event  - this.Model
      var tmpArr = []
      for (var x = 0; x < this.finalResponse.length; x++) {
        if (this.finalResponse[x] != event) {
          tmpArr.push(this.finalResponse[x])
        }

      }

      this.finalResponse = tmpArr;
    }
  }

  finalResponse = []

  Finalresponse(event2, key) {
    this.isLoading = true
    var isChecked = event2.target.checked;
    var event = event2.target.value;
    if (event == "null") {
      this.Opslist = this.prrequestlistbackup
    } else {
      this.FinalResponseArr(isChecked, event)

      var existingValueIndex = -1;
      for (var i = 0; i < this.setvalues.length; i++) {
        var tmpObj = this.setvalues[i];
        if (tmpObj['filtertype'] == key) {
          existingValueIndex = i;
        }
      }
      if (this.DataSearch == undefined) {
        this.DataSearch = ""
      }

      var reqdata = { "filtertype": key, "values": this.finalResponse }
      if (existingValueIndex == -1) {
        this.setvalues.push(reqdata)
      } else {
        this.setvalues[existingValueIndex] = reqdata
      }


      var senddata = { "searchstr": this.DataSearch, "status": this.searchvalue, "pagination": this.currentPage, "shortid": this.AuthGuard.session().shortid, "filterList": this.setvalues }

      if (this.finalResponse.length == 0) {
        senddata = { "searchstr": this.DataSearch, "status": this.searchvalue, "pagination": this.currentPage, "shortid": this.AuthGuard.session().shortid, "filterList": this.setvalues }
      }
      var tmpArrSetValues = [];
      for (var i = 0; i < this.setvalues.length; i++) {
        var obj = this.setvalues[i]
        if (obj.values.length != 0) {
          tmpArrSetValues.push(obj);
        }
      }


      this.setvalues = tmpArrSetValues;

      senddata = { "searchstr": this.DataSearch, "status": this.searchvalue, "pagination": this.currentPage, "shortid": this.AuthGuard.session().shortid, "filterList": this.setvalues }
      // var reqdata = {"searchstr":this.serachvalue,"filtertype":key,"values":this.ivoicenvalue}
      return this.makeapi.method(this.opsppslistapi, senddata, "postjson")
        .subscribe(data => {
          this.selectedvalue = true
          this.isLoading = false
          this.Opslist = data
          this.DraftLIstData = data
          this.FinalLIstData = data
          this.Pending = data
          this.PaginationCount()
        },
          Error => {
          });
    }
  }
  SupplierCodeArr(isChecked, event) {
    if (isChecked) {
      //existing logic
      this.isselected = "true"
      this.supplierCodeval.push(event)

    } else {
      //for loop - remove the event  - this.Model
      var tmpArr = []
      for (var x = 0; x < this.supplierCodeval.length; x++) {
        if (this.supplierCodeval[x] != event) {
          tmpArr.push(this.supplierCodeval[x])
        }

      }

      this.finalResponse = tmpArr;
    }
  }

  supplierCodeval = []

  SupplierCodes(event2, key) {
    this.isLoading = true
    var isChecked = event2.target.checked;
    var event = event2.target.value;
    if (event == "null") {
      this.Opslist = this.prrequestlistbackup
    } else {
      this.SupplierCodeArr(isChecked, event)

      var existingValueIndex = -1;
      for (var i = 0; i < this.setvalues.length; i++) {
        var tmpObj = this.setvalues[i];
        if (tmpObj['filtertype'] == key) {
          existingValueIndex = i;
        }
      }
      if (this.DataSearch == undefined) {
        this.DataSearch = ""
      }

      var reqdata = { "filtertype": key, "values": this.supplierCodeval }
      if (existingValueIndex == -1) {
        this.setvalues.push(reqdata)
      } else {
        this.setvalues[existingValueIndex] = reqdata
      }


      var senddata = { "searchstr": this.DataSearch, "status": this.searchvalue, "pagination": this.currentPage, "shortid": this.AuthGuard.session().shortid, "filterList": this.setvalues }

      if (this.supplierCodeval.length == 0) {
        senddata = { "searchstr": this.DataSearch, "status": this.searchvalue, "pagination": this.currentPage, "shortid": this.AuthGuard.session().shortid, "filterList": this.setvalues }
      }
      var tmpArrSetValues = [];
      for (var i = 0; i < this.setvalues.length; i++) {
        var obj = this.setvalues[i]
        if (obj.values.length != 0) {
          tmpArrSetValues.push(obj);
        }
      }


      this.setvalues = tmpArrSetValues;

      senddata = { "searchstr": this.DataSearch, "status": this.searchvalue, "pagination": this.currentPage, "shortid": this.AuthGuard.session().shortid, "filterList": this.setvalues }
      // var reqdata = {"searchstr":this.serachvalue,"filtertype":key,"values":this.ivoicenvalue}
      return this.makeapi.method(this.opsppslistapi, senddata, "postjson")
        .subscribe(data => {
          this.selectedvalue = true
          this.isLoading = false
          this.Opslist = data
          this.Pending = data
          this.DraftLIstData = data
          this.FinalLIstData = data
          this.PaginationCount()
        },
          Error => {
          });
    }
  }
  SupplierNameArr(isChecked, event) {
    if (isChecked) {
      //existing logic
      this.isselected = "true"
      this.supplierNameval.push(event)

    } else {
      //for loop - remove the event  - this.Model
      var tmpArr = []
      for (var x = 0; x < this.supplierNameval.length; x++) {
        if (this.supplierNameval[x] != event) {
          tmpArr.push(this.supplierNameval[x])
        }

      }

      this.supplierNameval = tmpArr;
    }
  }

  supplierNameval = []

  SupplierNames(event2, key) {
    this.isLoading = true
    var isChecked = event2.target.checked;
    var event = event2.target.value;
    if (event == "null") {
      this.Opslist = this.prrequestlistbackup
    } else {
      this.SupplierNameArr(isChecked, event)

      var existingValueIndex = -1;
      for (var i = 0; i < this.setvalues.length; i++) {
        var tmpObj = this.setvalues[i];
        if (tmpObj['filtertype'] == key) {
          existingValueIndex = i;
        }
      }
      if (this.DataSearch == undefined) {
        this.DataSearch = ""
      }

      var reqdata = { "filtertype": key, "values": this.supplierNameval }
      if (existingValueIndex == -1) {
        this.setvalues.push(reqdata)
      } else {
        this.setvalues[existingValueIndex] = reqdata
      }


      var senddata = { "searchstr": this.DataSearch, "status": this.searchvalue, "pagination": this.currentPage, "shortid": this.AuthGuard.session().shortid, "filterList": this.setvalues }

      if (this.supplierNameval.length == 0) {
        senddata = { "searchstr": this.DataSearch, "status": this.searchvalue, "pagination": this.currentPage, "shortid": this.AuthGuard.session().shortid, "filterList": this.setvalues }
      }
      var tmpArrSetValues = [];
      for (var i = 0; i < this.setvalues.length; i++) {
        var obj = this.setvalues[i]
        if (obj.values.length != 0) {
          tmpArrSetValues.push(obj);
        }
      }


      this.setvalues = tmpArrSetValues;

      senddata = { "searchstr": this.DataSearch, "status": this.searchvalue, "pagination": this.currentPage, "shortid": this.AuthGuard.session().shortid, "filterList": this.setvalues }
      // var reqdata = {"searchstr":this.serachvalue,"filtertype":key,"values":this.ivoicenvalue}
      return this.makeapi.method(this.opsppslistapi, senddata, "postjson")
        .subscribe(data => {
          this.selectedvalue = true
          this.isLoading = false
          this.Opslist = data
          this.Pending = data
          this.DraftLIstData = data
          this.FinalLIstData = data
          this.PaginationCount()
        },
          Error => {
          });
    }
  }
  Opslist = [];
  draftcount = 0
  filtercount = 0
  InitiateList() {
    this.isLoading = true
    this.searchvalue = "ops_pending"
    var reqdata = { "searchstr": this.DataSearch, "status": "ops_pending", "shortid": this.AuthGuard.session().shortid, "pagination": this.currentPage, }
    return this.makeapi.method(this.opsppslistapi, reqdata, "postjson")
      .subscribe(data => {
        this.isLoading = false
        this.Opslist = data
      },
        Error => {
        });
  }
  Pending = []
  searchTavWise: any
  currentPage = 1;
  PendingList() {
    this.isLoading = true
    this.searchvalue = "complete"
    this.searchTavWise = "pending"
    var reqdata = { "searchstr": this.DataSearch, "status": "complete", "shortid": this.AuthGuard.session().shortid, "pagination": this.currentPage, }
    return this.makeapi.method(this.opsppslistapi, reqdata, "postjson")
      .subscribe(data => {
        this.isLoading = false
        this.Pending = data

      },
        Error => {
        });
  }
  searchvalue = "ops_pending"
  DataSearch = ""
  getsearchlist(value) {
    this.isLoading = true
    this.DataSearch = value
    var reqdata = { "status": this.searchvalue, "searchstr": value, "shortid": this.AuthGuard.session().shortid, "pagination": this.currentPage, }
    return this.makeapi.method(this.opsppslistapi, reqdata, "postjson")
      .subscribe(data => {
        this.isLoading = false
        if (this.searchvalue == "complete" && this.searchTavWise == "pending") {
          this.Pending = data
        } else if (this.searchvalue == "ops_pending") {
          this.Opslist = data
        } else if (this.searchvalue == "complete" && this.searchTavWise == "fr") {
          this.FinalLIstData = data
        } else if (this.searchvalue == "draft") {
          this.DraftLIstData = data

        }
      },
        Error => {
        });
  }
  FinalLIstData = []
  FinalList() {
    this.isLoading = true
    this.searchvalue = "complete"
    this.searchTavWise = "fr"
    var reqdata = { "status": "complete", "shortid": this.AuthGuard.session().shortid, "pagination": this.currentPage, }
    return this.makeapi.method(this.opsppslistapi, reqdata, "postjson")
      .subscribe(data => {
        this.isLoading = false
        this.FinalLIstData = data

      },
        Error => {
        });
  }
  back() {
    this.InitiateList()
    this.PaginationCount()
    this.Drafttrue = false
    this.activetrue = true
    $(document).ready(function () {
      $('#list-item1').addClass("ppsclass");
    });
  }
  DraftLIstData = []
  Drafttrue = false
  DraftListtrue() {
    this.Drafttrue = true
    this.activetrue = false
    this.DraftList()
  }
  DraftList() {
    this.isLoading = true
    this.searchvalue = "draft"
    var reqdata = { "status": "draft", "shortid": this.AuthGuard.session().shortid, "pagination": this.currentPage, }
    return this.makeapi.method(this.opsppslistapi, reqdata, "postjson")
      .subscribe(data => {
        this.isLoading = false
        this.DraftLIstData = data
        this.draftcount = data.length
      },
        Error => {
        });
  }
  // Errorlistdata = []
  // Errorlist() {
  //   var reqdata = "shortid=" + this.AuthGuard.session().shortid
  //   return this.makeapi.method(this.errorlistAPI, reqdata, "post")
  //     .subscribe(data => {
  //       this.Errorlistdata = data
  //     },
  //       Error => {
  //       });
  // }
  editbtn(id) {
    this.getdata.ppseditvalue(id)
  }
  editDraft(id) {
    this.getdata.ppsDraft(id)
  }
  deleteid: any
  delete(id) {
    this.deleteid = id
    $("#delete").modal("show")
  }
  confirmDelete() {
    this.isLoading = true
    var reqdata = "id=" + this.deleteid
    return this.makeapi.method(this.deleteDraftApi, reqdata, "post")
      .subscribe(data => {
        this.isLoading = false
        this.DraftList()
        this.InitiateList()
        $("#delete").modal("hide")
      },
        Error => {

        })
  }

  ppsfinaledit(id) {
    this.getdata.ppsfinaleditvalue(id)
  }
  ppsview: any
  modalid = null
  finalfrom: any
  initialfrom: any
  liststatus: any
  isDraft = null
  viewpps(index) {
    this.initial = false
    this.splitarrayvaluefin = []
    this.splitarrayvalue = []
    this.splitarrayfin = []
    this.ppsview = index
    this.liststatus = index.status
    this.modalid = this.ppsview.id
    // this.finalfrom = this.ppsview.final_resposibility
    this.initialfrom = this.ppsview.init_responsibility
    if(this.initialfrom != null){
      var splitselectfin = index.init_responsibility
      this.splitarrayfin.push(splitselectfin)
      for (var i = 0; i < this.splitarrayfin.length; i++) {
        for (var j = 0; j < this.splitarrayfin[i].split(",").length; j++) {
          this.splitarrayvaluefin.push(this.splitarrayfin[i].split(",")[j]);
        }
      }
  
      var SelectedArrfin = [];
      for (var i = 0; i < this.splitarrayvaluefin.length; i++) {
        SelectedArrfin.push({
          item_id: this.map[this.splitarrayvaluefin[i]],
          item_text: this.splitarrayvaluefin[i]
        });
      }
      this.selectedItems = SelectedArrfin
      index.init_responsibility1 = SelectedArrfin
      this.InitialResponsibilityForm.patchValue(index)
    }
    this.isDraft = index.isDraft
    $("#ppsmodal").modal("show")
  }
  fileuploadmodal() {
    $("#fileupload").modal("show")
  }
  yearid: any
  // isLoading=false;
  status: any
  downloadFile(filename) {
    var setValue = false
    for (let i = 0; i < this.Pending.length; i++) {
      if (this.Pending[i].status == "complete") {
        setValue = true
        break;
      }
    }
    if (setValue) {
      this.isLoading = true
      return this.makeapi.method(this.DownloadFileApi + "pps_pending", filename, 'downloadfile')
        .subscribe(res => {
          this.isLoading = false
          res.filename = filename
          console.log(res)
          if (window.navigator.msSaveOrOpenBlob) {
            var fileData = [res.data];
            var blobObject = new Blob(fileData);
            // $(anchorSelector).click(function(){
            window.navigator.msSaveOrOpenBlob(blobObject, filename);
            window.navigator.msSaveOrOpenBlob(blobObject, filename);
            // });
          } else {
            var url = window.URL.createObjectURL(res.data);
            var a = document.createElement('a');
            document.body.appendChild(a);
            a.setAttribute('style', 'display: none');
            a.href = url;
            a.download = res.filename;
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove(); // remove the element
          }

        },
          Error => {
          });
    } else {
      // $.notify('Pending List is Empty', "danger");
    }
  }
  filter() {
    // $("#slide").click(function(){
    // $("#panel").slideToggle("slow");
    $("#panel").slideDown();
    // });
  }
  closefilter() {
    $("#panel").slideUp();
  }
  activetrue = false
  finaltrue = false
  Initiate() {
    this.setvalues = []
    this.currentPage = 1
    var setValue = this.ppssearch.value
    setValue.ppssearch = ""
    this.ppssearch.patchValue(setValue)
    this.fileuploadtrue = false
    this.Pending = []
    this.FinalLIstData = []
    this.clearFilterValues()
    this.InitiateList()
    this.PaginationCount()
    this.activetrue = true
    this.finaltrue = false
    this.errortrue = false
    this.Drafttrue = false
    $('#list-item1').css({
      "border-bottom": "3px solid rgb(36, 37, 54)"
    })
    $('#list-item2').css({
      "border-bottom": "none"
    })
    $('#list-item3').css({
      "border-bottom": "none"
    })
  }
  fileuploadtrue = false
  pending() {
    this.setvalues = []
    this.currentPage = 1
    var setValue = this.ppssearch.value
    setValue.ppssearch = ""
    this.ppssearch.patchValue(setValue)
    this.fileuploadtrue = true
    this.Opslist = []
    this.FinalLIstData = []
    this.clearFilterValues()
    this.PendingList()
    this.PaginationCount()
    this.activetrue = false
    this.finaltrue = true
    this.errortrue = false
    this.Drafttrue = false
    $('#list-item2').css({
      "border-bottom": "3px solid rgb(36, 37, 54)"
    })
    $('#list-item1').css({
      "border-bottom": "none"
    })
    $('#list-item3').css({
      "border-bottom": "none"
    })
  }
  errortrue = false
  FR_Pending() {
    this.setvalues = []
    this.currentPage = 1
    var setValue = this.ppssearch.value
    setValue.ppssearch = ""
    this.ppssearch.patchValue(setValue)
    this.fileuploadtrue = false
    this.Opslist = []
    this.Pending = []
    this.clearFilterValues()
    this.FinalList()
    this.PaginationCount()
    this.errortrue = true
    this.activetrue = false
    this.finaltrue = false
    this.Drafttrue = false
    $('#list-item3').css({
      "border-bottom": "3px solid rgb(36, 37, 54)"
    })
    $('#list-item1').css({
      "border-bottom": "none"
    })
    $('#list-item2').css({
      "border-bottom": "none"
    })
  }
  initalres() {
    // $("#initialfrom").val(this.initialfrom)
    $("#initial").modal("show")
    this.multipleallarray = []
    this.multiplearray = []

  }
  confirminitalres() {
    this.isLoading = true
    if (this.InitialResponsibilityForm.invalid) {
      this.markFormGroupTouched(this.InitialResponsibilityForm);
      this.getdata.showNotification('bottom', 'right', 'All Fields are requied !!', "danger");
      // this.getdata.notify('All Fields are requied !!', "error");
    } else {
      var getform = this.InitialResponsibilityForm.value
      var SelectArray = []
      for (let i = 0; i < getform.init_responsibility1.length; i++) {
        var emtobj = getform.init_responsibility1[i].item_text
        SelectArray.push(emtobj)
        var arrselect = SelectArray.join(',');
        getform.init_responsibility = arrselect;
      }
      delete getform.init_responsibility1
      getform.id = this.modalid
      getform.justification = this.InitialResponsibilityForm.value.justification
      var reqdata = "id=" + getform.id + "&init_responsibility=" + getform.init_responsibility + "&justification=" + getform.justification
      return this.makeapi.method(this.initalresAPI, reqdata, "post")
        .subscribe(data => {
          if (data.status == "Success") {
            this.isLoading = false
            this.getdata.showNotification('bottom', 'right', 'Initial Responsibility Updated !!', "success");
            // this.getdata.notify('Initial Responsibility Updated !!', "success");
            this.DraftList()
            this.InitiateList()
            $("#initial").modal("hide")
            $("#ppsmodal").modal("hide")
            this.FinalResponsibilityForm.reset()
            this.InitialResponsibilityForm.reset()
          }

        },
          Error => {

          })
    }
  }
  closemodal() {
    this.FinalResponsibilityForm.reset()
    this.InitialResponsibilityForm.reset()
  }
  finalres() {
    // $("#finalfrom").val(this.finalfrom)
    $("#final").modal("show")
  }
  confirmfinalres() {
    this.isLoading = true
    if (this.FinalResponsibilityForm.invalid) {
      this.markFormGroupTouched(this.FinalResponsibilityForm);
      this.getdata.showNotification('bottom', 'right', 'All fields are requied !!', "danger");
      // this.getdata.notify('All Fields are requied !!', "error");
    } else {
      var getform = this.FinalResponsibilityForm.value
      getform.id = this.modalid
      getform.frjustification = this.FinalResponsibilityForm.value.frjustification
      getform.final_resposibility = this.FinalResponsibilityForm.value.final_resposibility
      getform.justification = this.InitialResponsibilityForm.value.justification
      var reqdata = "id=" + getform.id + "&final_resposibility=" + getform.final_resposibility + "&frjustification=" + getform.frjustification
      return this.makeapi.method(this.FianlresAPI, reqdata, "post")
        .subscribe(data => {
          this.DraftList()
          this.InitiateList()
          if (data.status == "Success") {
            this.isLoading = false
            this.getdata.showNotification('bottom', 'right', 'Final Responsibility Updated !!', "success");
            // this.getdata.notify('Final Responsibility Updated !!', "success");
            $("#final").modal("hide")
            $("#ppsmodal").modal("hide")
            this.FinalResponsibilityForm.reset()
            this.InitialResponsibilityForm.reset()
          }
        },
          Error => {

          })
    }
  }
  initial = false
  reasonvvalue: any
  initalvalue: any
  initialreson: any

  splitarrayvaluefin = []
  splitarrayvalue = []
  splitarrayfin = []
  inialtireason(value) {
    this.splitarrayvaluefin = []
    this.splitarrayvalue = []
    this.splitarrayfin = []
    var data = value
    this.initalvalue = value.init_responsibility
    this.initialreson = value.justification

    $("#ppsmodal").modal("show")
    this.reasonvvalue = "Initial Responsibility"
    this.initial = true
    if(this.initalvalue != null){
      var splitselectfin = value.init_responsibility
      this.splitarrayfin.push(splitselectfin)
      for (var i = 0; i < this.splitarrayfin.length; i++) {
        for (var j = 0; j < this.splitarrayfin[i].split(",").length; j++) {
          this.splitarrayvaluefin.push(this.splitarrayfin[i].split(",")[j]);
        }
      }
  
      var SelectedArrfin = [];
      for (var i = 0; i < this.splitarrayvaluefin.length; i++) {
        SelectedArrfin.push({
          item_id: this.map[this.splitarrayvaluefin[i]],
          item_text: this.splitarrayvaluefin[i]
        });
      }
      this.selectedItems = SelectedArrfin
      value.init_responsibility1 = SelectedArrfin
      this.InitialResponsibilityForm.patchValue(value)
    }
  }
  final = false
  finalfromvalue: any
  finalreasonvalue: any
  finalreason(value) {
    this.finalfromvalue = value.final_resposibility
    this.finalreasonvalue = value.frjustification
    $("#reason").modal("show")
    this.reasonvvalue = "Final Responsibility"
    this.final = true
    this.initial = false
  }
  uploadType() {
    localStorage.setItem("uploadType", '3')
    this.router.navigateByUrl('/dashboard/Pending-Error-List')
  }
  totalPartCount: any;
  PaginationCount() {
    this.isLoading = true
    var submitData = { "usertype": this.status, "shortid": this.AuthGuard.session().shortid, "searchstr": this.DataSearch, "pagination": 0, "status": this.searchvalue, "filterList": this.setvalues }
    this.makeapi.method(this.PaginateAPI, submitData, "postjson")
      .subscribe(data => {
        this.isLoading = false
        var totalcount = data['pageCount'];
        this.totalPartCount = totalcount;

        if (this.totalPartCount == 0) {
          this.totalPages = 1
        } else {
          this.totalPages = Math.ceil(this.totalPartCount / 10);

        }


        console.log(this.totalPartCount)
      },
        Error => {
        });
  }
  loading = false
  totalPages = 10;
  paginatePartList(page) {
    console.log(page)
    if (page == 'prev' && this.currentPage > 1) {
      if (page == 'prev') {
        this.isLoading = true
      }
      else {
        this.isLoading = false
      }
      this.currentPage = this.currentPage - 1
      console.log(this.currentPage)
    }
    else {
      if (page == 'next') {
        this.isLoading = true
      }
      else {
        this.isLoading = false
      }
      this.currentPage = this.currentPage + 1
      console.log(this.currentPage)
    }

    this.getprotoform()

  }

  searchPage() {
    this.isLoading = true
    var inputPageValue = parseInt($("#currentPageInput").val())
    if (this.totalPages < inputPageValue) {

      alert("Enter valid page number!");
      $("#currentPageInput").val(this.currentPage)
    } else {
      this.currentPage = inputPageValue;

    }
    this.getprotoform()
  }
  editbcasheet;
  id;
  requestorid;
  finasupdate;
  supervisorstatus;
  getprotoform() {
    this.isLoading = true
    let reqdata = { "usertype": this.status, "shortid": this.AuthGuard.session().shortid, "pagination": this.currentPage, "status": this.searchvalue, "filterList": this.setvalues }
    this.makeapi.method(this.opsppslistapi, reqdata, "postjson")
      .subscribe(data => {
        this.isLoading = false
        // this.protolist =data.sort((a, b) => Number(b.id) - Number(a.id))

        if (this.searchvalue == "complete" && this.searchTavWise == "pending") {
          this.Pending = data
        } else if (this.searchvalue == "ops_pending") {
          this.Opslist = data
        } else if (this.searchvalue == "complete" && this.searchTavWise == "fr") {
          this.FinalLIstData = data
        } else if (this.searchvalue == "draft") {
          this.DraftLIstData = data

        }

        // for (var i = 0; i < data.length; i++) {
        //     this.supervisorstatus = data[i]['status'];
        // }
        this.isLoading = false
        console.log(data)
      },
        Error => {
          this.isLoading = false
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

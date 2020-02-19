import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { HttpModule } from '@angular/http';
import { DatatransferService } from '../../datatransfer.service'
import { WebserviceService } from '../../webservice.service'
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Router } from '@angular/router';
import { AuthGuard } from '../../canactivate.service';
declare var $;
@Component({
  selector: 'app-final',
  templateUrl: './final.component.html',
  styleUrls: ['./final.component.css']
})
export class FinalComponent implements OnInit {

  private opsppslistapi = this.getdata.appconstant + 'request/ppsOpsList';
  private uploadFileApi = this.getdata.appconstant + 'request/updatebulkList';
  private DownloadFileApi = this.getdata.appconstant + 'request/downloadExcel?status=';
  private errorlistAPI = this.getdata.appconstant + 'lossestrack/list';
  private listSubClusterApi = this.getdata.appconstant + 'finalresponse/list';
  private initalresAPI = this.getdata.appconstant + 'request/updateInitialResponse';
  private FianlresAPI = this.getdata.appconstant + 'request/updatefinalResponse';
  private getfilterddapi = this.getdata.appconstant + 'request/getFilterColumns';
  private PaginateAPI = this.getdata.appconstant + 'request/getPaginationCount';

  FinalsearchForm: FormGroup
  InitialResponsibilityForm: FormGroup;
  FinalResponsibilityForm: FormGroup;
  ShowFilter = false;
  limitSelection = false;
  p1 = 1;
  p2 = 1;
  p3 = 1;
  constructor(private http: Http, private Formbuilder: FormBuilder, private router: Router, private getdata: DatatransferService,
    private makeapi: WebserviceService, private AuthGuard: AuthGuard) {
    this.FinalsearchForm = this.Formbuilder.group({
      "finalsearch": [null],
    })
    this.InitialResponsibilityForm = this.Formbuilder.group({
      "id": [null],
      "init_responsibility": [null, Validators.compose([Validators.required])],
      "justification": [null],
    });
    this.FinalResponsibilityForm = this.Formbuilder.group({
      "id": [null],
      "final_resposibility": [null, Validators.compose([Validators.required])],
      "frjustification": [null, Validators.compose([Validators.required])],
    });
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
  Finalresdata = []
  FinalresList() {
    let reqdata = {};
    return this.makeapi.method(this.listSubClusterApi, '', "postjson")
      .subscribe(data => {
        this.Finalresdata = data
      },
        Error => {
        });
  }
  ngOnInit() {
    this.active()
    this.FinalresList()
    this.getfilterlist()
    this.activetrue = true
    this.pendingList()
    this.PaginationCount()
    $('#list-item3').css({
      "border-bottom": "3px solid rgb(36, 37, 54)"
    })
    this.activetrue = true

  }
  pendingListdata = []
  pendingList() {
    this.isLoading = true
    var reqdata = {"status": "complete", "pagination": this.currentPage, "shortid" : this.AuthGuard.session().shortid,}
    return this.makeapi.method(this.opsppslistapi, reqdata, "postjson")
      .subscribe(data => {
        this.isLoading = false
        this.pendingListdata = data

      },
        Error => {
        });
  }
  searchvalue = ""
  getsearchlist(value) {
    this.isLoading = true
    this.searchvalue = value
    var reqdata = {"status" : "complete" , "searchstr" : this.searchvalue , "shortid" : this.AuthGuard.session().shortid,"pagination": this.currentPage,}
    return this.makeapi.method(this.opsppslistapi, reqdata, "postjson")
      .subscribe(data => {
        this.isLoading = false
        this.pendingListdata = data
      },
        Error => {
        });
  }

  finalview: any
  modalid = null
  finalfrom: any
  initialfrom: any
  rcatimestamp: any
  icatimestamp: any
  pcatimestamp: any
  viewfinal(index) {
    this.finalview = index
    this.modalid = this.finalview.id
    this.finalfrom = this.finalview.final_resposibility
    this.initialfrom = this.finalview.init_responsibility
    this.rcatimestamp = this.finalview.rcatimestamp
    this.icatimestamp = this.finalview.icatimestamp
    this.pcatimestamp = this.finalview.pcatimestamp
    $("#finamodal").modal("show")
  }
  editbtn(id) {
    this.getdata.finaledit(id)
  }

  filename = '';
  finallfile: any;
  uploadfile(event) {

    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {

      var file: File = fileList[0];
      var finalfilename = (file.name).split(".");
      // this.filename = finalfilename[0];
      this.finallfile = file;
      this.filename = this.finallfile.name

    }
  }
  // @ViewChild('uploadFile') uploadFile: any;

  // cancleUpload() {
  //   this.uploadFile.nativeElement.value = "";
  //   this.filename = ""
  // }

  ConfirmUploadFile() {
    this.isLoading = true
    if (this.filename == null || this.filename == '') {
            this.getdata.showNotification('bottom', 'right', 'Upload file is required !!', "danger");
            // this.getdata.notify('Upload file is required !!', "error");
    } else {
      this.isLoading = true;
      let finalformdata: FormData = new FormData();
      finalformdata.append("file", this.finallfile);
      finalformdata.append("filename", this.filename);
      finalformdata.append("status", "complete");
      finalformdata.append("shortid", this.AuthGuard.session().shortid);
      this.makeapi.method(this.uploadFileApi, finalformdata, 'file')
        .subscribe(
          data => {
            this.isLoading = false
            $("#fileupload").modal("hide")
            this.pendingList()
            this.filename = "";
            this.getdata.showNotification('bottom', 'right', 'File uploaded successfully !!', "success");
            // this.getdata.notify('File uploaded successfully !!', "success");
            this.isLoading = false;
            // this.router.navigateByUrl("dashboard/prdashboard/prrequest")

          },
          Error => {
          });
    }

  }

  fileuploadmodal() {
    $("#fileupload").modal("show")
  }
  yearid: any
  isLoading=false;
  status: any
  downloadFile(filename) {
    this.isLoading=true;
    return this.makeapi.method(this.DownloadFileApi + "complete", filename, 'downloadfile')
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
  drafttrue = false
  active() {
    this.pendingListdata = []
    this.activetrue = true
    this.drafttrue = false
    this.pendingtrue = false
    this.pendingList()
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
  draft() {
    this.activetrue = false
    this.drafttrue = true
    this.pendingtrue = false
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
  pendingtrue = false
  pending() {
    this.pendingListdata = []
    this.pendingList()
    this.pendingtrue = true
    this.activetrue = false
    this.drafttrue = false
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
    } else {
      var getform = this.InitialResponsibilityForm.value
      if (this.select == "multiple") {
        var arrselect = this.multipleallarray.join(',');
        getform.init_responsibility = arrselect;
      } else if (this.select == "signle") {
        var arrselect = this.multiplearray.join(',');
        getform.init_responsibility = arrselect;
      }
      getform.id = this.modalid
      getform.justification = this.InitialResponsibilityForm.value.justification
      var reqdata = "id=" + getform.id + "&init_responsibility=" + getform.init_responsibility + "&justification=" + getform.justification
      return this.makeapi.method(this.initalresAPI, reqdata, "post")
        .subscribe(data => {
          if (data.status == "Success") {
            this.isLoading = false
            this.pendingList()
            $("#initial").modal("hide")
            $("#finamodal").modal("hide")
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
    } else {
      var getform = this.FinalResponsibilityForm.value
      getform.id = this.modalid
      getform.frjustification = this.FinalResponsibilityForm.value.frjustification
      getform.final_resposibility = this.FinalResponsibilityForm.value.final_resposibility
      getform.justification = this.InitialResponsibilityForm.value.justification
      var reqdata = "id=" + getform.id + "&final_resposibility=" + getform.final_resposibility + "&frjustification=" + getform.frjustification
      return this.makeapi.method(this.FianlresAPI, reqdata, "post")
        .subscribe(data => {
          this.pendingList()
          if (data.status == "Success") {
            this.isLoading = false
            $("#final").modal("hide")
            $("#finamodal").modal("hide")
            this.pendingList()
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
  inialtireason(value) {
    var data = value
    this.initalvalue = value.init_responsibility
    this.initialreson = value.justification

    $("#reason").modal("show")
    this.reasonvvalue = "Initial Responsibility"
    this.initial = true
    this.final = false
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
  uploadType(){
    localStorage.setItem("uploadType",'4')
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
      this.pendingListdata = this.prrequestlistbackup
    } else {
      this.vendorpopulateTypeArr(isChecked, event)

      var existingValueIndex = -1;
      for (var i = 0; i < this.setvalues.length; i++) {
        var tmpObj = this.setvalues[i];
        if (tmpObj['filtertype'] == key) {
          existingValueIndex = i;
        }
      }
      if (this.searchvalue == undefined) {
        this.searchvalue = ""
      }

      var reqdata = { "filtertype": key, "values": this.vendorvalues }
      if (existingValueIndex == -1) {
        this.setvalues.push(reqdata)
      } else {
        this.setvalues[existingValueIndex] = reqdata
      }


      var senddata = { "searchstr": this.searchvalue, "status": "complete", "pagination": this.currentPage, "shortid": this.AuthGuard.session().shortid, "filterList": this.setvalues }

      if (this.vendorvalues.length == 0) {
        senddata = { "searchstr": this.searchvalue, "status": "complete", "pagination": this.currentPage, "shortid": this.AuthGuard.session().shortid, "filterList": this.setvalues }
      }
      var tmpArrSetValues = [];
      for (var i = 0; i < this.setvalues.length; i++) {
        var obj = this.setvalues[i]
        if (obj.values.length != 0) {
          tmpArrSetValues.push(obj);
        }
      }


      this.setvalues = tmpArrSetValues;

      senddata = { "searchstr": this.searchvalue, "status":  "complete", "pagination": this.currentPage, "shortid": this.AuthGuard.session().shortid, "filterList": this.setvalues }
      // var reqdata = {"searchstr":this.serachvalue,"filtertype":key,"values":this.ivoicenvalue}
      return this.makeapi.method(this.opsppslistapi, senddata, "postjson")
        .subscribe(data => {
          this.selectedvalue = true
          this.isLoading = false
            this.pendingListdata = data
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
      this.pendingListdata = this.prrequestlistbackup
    } else {
      this.ModelTypeArr(isChecked, event)

      var existingValueIndex = -1;
      for (var i = 0; i < this.setvalues.length; i++) {
        var tmpObj = this.setvalues[i];
        if (tmpObj['filtertype'] == key) {
          existingValueIndex = i;
        }
      }
      if (this.searchvalue == undefined) {
        this.searchvalue = ""
      }

      var reqdata = { "filtertype": key, "values": this.Model }
      if (existingValueIndex == -1) {
        this.setvalues.push(reqdata)
      } else {
        this.setvalues[existingValueIndex] = reqdata
      }


      var senddata = { "searchstr": this.searchvalue, "status": "complete", "pagination": this.currentPage, "shortid": this.AuthGuard.session().shortid, "filterList": this.setvalues }

      if (this.Model.length == 0) {
        senddata = { "searchstr": this.searchvalue, "status": "complete", "pagination": this.currentPage, "shortid": this.AuthGuard.session().shortid, "filterList": this.setvalues }
      }
      var tmpArrSetValues = [];
      for (var i = 0; i < this.setvalues.length; i++) {
        var obj = this.setvalues[i]
        if (obj.values.length != 0) {
          tmpArrSetValues.push(obj);
        }
      }


      this.setvalues = tmpArrSetValues;

      senddata = { "searchstr": this.searchvalue, "status":  "complete", "pagination": this.currentPage, "shortid": this.AuthGuard.session().shortid, "filterList": this.setvalues }
      // var reqdata = {"searchstr":this.serachvalue,"filtertype":key,"values":this.ivoicenvalue}
      return this.makeapi.method(this.opsppslistapi, senddata, "postjson")
        .subscribe(data => {
          this.selectedvalue = true
          this.isLoading = false
            this.pendingListdata = data
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
      this.pendingListdata = this.prrequestlistbackup
    } else {
      this.PPSmainClusterArr(isChecked, event)

      var existingValueIndex = -1;
      for (var i = 0; i < this.setvalues.length; i++) {
        var tmpObj = this.setvalues[i];
        if (tmpObj['filtertype'] == key) {
          existingValueIndex = i;
        }
      }
      if (this.searchvalue == undefined) {
        this.searchvalue = ""
      }

      var reqdata = { "filtertype": key, "values": this.MaiCluster }
      if (existingValueIndex == -1) {
        this.setvalues.push(reqdata)
      } else {
        this.setvalues[existingValueIndex] = reqdata
      }


      var senddata = { "searchstr": this.searchvalue, "status": "complete", "pagination": this.currentPage, "shortid": this.AuthGuard.session().shortid, "filterList": this.setvalues }

      if (this.MaiCluster.length == 0) {
        senddata = { "searchstr": this.searchvalue, "status":  "complete", "pagination": this.currentPage, "shortid": this.AuthGuard.session().shortid, "filterList": this.setvalues }
      }
      var tmpArrSetValues = [];
      for (var i = 0; i < this.setvalues.length; i++) {
        var obj = this.setvalues[i]
        if (obj.values.length != 0) {
          tmpArrSetValues.push(obj);
        }
      }


      this.setvalues = tmpArrSetValues;

      senddata = { "searchstr": this.searchvalue, "status": "complete", "pagination": this.currentPage, "shortid": this.AuthGuard.session().shortid, "filterList": this.setvalues }
      // var reqdata = {"searchstr":this.serachvalue,"filtertype":key,"values":this.ivoicenvalue}
      return this.makeapi.method(this.opsppslistapi, senddata, "postjson")
        .subscribe(data => {
          this.selectedvalue = true
          this.isLoading = false
            this.pendingListdata = data
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
      this.pendingListdata = this.prrequestlistbackup
    } else {
      this.PPSsubClusterArr(isChecked, event)

      var existingValueIndex = -1;
      for (var i = 0; i < this.setvalues.length; i++) {
        var tmpObj = this.setvalues[i];
        if (tmpObj['filtertype'] == key) {
          existingValueIndex = i;
        }
      }
      if (this.searchvalue == undefined) {
        this.searchvalue = ""
      }

      var reqdata = { "filtertype": key, "values": this.ppsSubCluster }
      if (existingValueIndex == -1) {
        this.setvalues.push(reqdata)
      } else {
        this.setvalues[existingValueIndex] = reqdata
      }


      var senddata = { "searchstr": this.searchvalue, "status": "complete", "pagination": this.currentPage, "shortid": this.AuthGuard.session().shortid, "filterList": this.setvalues }

      if (this.ppsSubCluster.length == 0) {
        senddata = { "searchstr": this.searchvalue, "status": "complete", "pagination": this.currentPage, "shortid": this.AuthGuard.session().shortid, "filterList": this.setvalues }
      }
      var tmpArrSetValues = [];
      for (var i = 0; i < this.setvalues.length; i++) {
        var obj = this.setvalues[i]
        if (obj.values.length != 0) {
          tmpArrSetValues.push(obj);
        }
      }


      this.setvalues = tmpArrSetValues;

      senddata = { "searchstr": this.searchvalue, "status":  "complete", "pagination": this.currentPage, "shortid": this.AuthGuard.session().shortid, "filterList": this.setvalues }
      // var reqdata = {"searchstr":this.serachvalue,"filtertype":key,"values":this.ivoicenvalue}
      return this.makeapi.method(this.opsppslistapi, senddata, "postjson")
        .subscribe(data => {
          this.selectedvalue = true
          this.isLoading = false
            this.pendingListdata = data
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
      this.pendingListdata = this.prrequestlistbackup
    } else {
      this.OPSsubClusterArr(isChecked, event)

      var existingValueIndex = -1;
      for (var i = 0; i < this.setvalues.length; i++) {
        var tmpObj = this.setvalues[i];
        if (tmpObj['filtertype'] == key) {
          existingValueIndex = i;
        }
      }
      if (this.searchvalue == undefined) {
        this.searchvalue = ""
      }

      var reqdata = { "filtertype": key, "values": this.opsSubCluster }
      if (existingValueIndex == -1) {
        this.setvalues.push(reqdata)
      } else {
        this.setvalues[existingValueIndex] = reqdata
      }


      var senddata = { "searchstr": this.searchvalue, "status": "complete", "pagination": this.currentPage, "shortid": this.AuthGuard.session().shortid, "filterList": this.setvalues }

      if (this.opsSubCluster.length == 0) {
        senddata = { "searchstr": this.searchvalue, "status":  "complete", "pagination": this.currentPage, "shortid": this.AuthGuard.session().shortid, "filterList": this.setvalues }
      }
      var tmpArrSetValues = [];
      for (var i = 0; i < this.setvalues.length; i++) {
        var obj = this.setvalues[i]
        if (obj.values.length != 0) {
          tmpArrSetValues.push(obj);
        }
      }


      this.setvalues = tmpArrSetValues;

      senddata = { "searchstr": this.searchvalue, "status":  "complete", "pagination": this.currentPage, "shortid": this.AuthGuard.session().shortid, "filterList": this.setvalues }
      // var reqdata = {"searchstr":this.serachvalue,"filtertype":key,"values":this.ivoicenvalue}
      return this.makeapi.method(this.opsppslistapi, senddata, "postjson")
        .subscribe(data => {
          this.selectedvalue = true
          this.isLoading = false
            this.pendingListdata = data
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
      this.pendingListdata = this.prrequestlistbackup
    } else {
      this.OPSmainClusterArr(isChecked, event)

      var existingValueIndex = -1;
      for (var i = 0; i < this.setvalues.length; i++) {
        var tmpObj = this.setvalues[i];
        if (tmpObj['filtertype'] == key) {
          existingValueIndex = i;
        }
      }
      if (this.searchvalue == undefined) {
        this.searchvalue = ""
      }

      var reqdata = { "filtertype": key, "values": this.opsmainCluster }
      if (existingValueIndex == -1) {
        this.setvalues.push(reqdata)
      } else {
        this.setvalues[existingValueIndex] = reqdata
      }


      var senddata = { "searchstr": this.searchvalue, "status":  "complete", "pagination": this.currentPage, "shortid": this.AuthGuard.session().shortid, "filterList": this.setvalues }

      if (this.opsmainCluster.length == 0) {
        senddata = { "searchstr": this.searchvalue, "status":  "complete", "pagination": this.currentPage, "shortid": this.AuthGuard.session().shortid, "filterList": this.setvalues }
      }
      var tmpArrSetValues = [];
      for (var i = 0; i < this.setvalues.length; i++) {
        var obj = this.setvalues[i]
        if (obj.values.length != 0) {
          tmpArrSetValues.push(obj);
        }
      }


      this.setvalues = tmpArrSetValues;

      senddata = { "searchstr": this.searchvalue, "status":  "complete", "pagination": this.currentPage, "shortid": this.AuthGuard.session().shortid, "filterList": this.setvalues }
      // var reqdata = {"searchstr":this.serachvalue,"filtertype":key,"values":this.ivoicenvalue}
      return this.makeapi.method(this.opsppslistapi, senddata, "postjson")
        .subscribe(data => {
          this.selectedvalue = true
          this.isLoading = false
            this.pendingListdata = data
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
      this.pendingListdata = this.prrequestlistbackup
    } else {
      this.FinalResponseArr(isChecked, event)

      var existingValueIndex = -1;
      for (var i = 0; i < this.setvalues.length; i++) {
        var tmpObj = this.setvalues[i];
        if (tmpObj['filtertype'] == key) {
          existingValueIndex = i;
        }
      }
      if (this.searchvalue == undefined) {
        this.searchvalue = ""
      }

      var reqdata = { "filtertype": key, "values": this.finalResponse }
      if (existingValueIndex == -1) {
        this.setvalues.push(reqdata)
      } else {
        this.setvalues[existingValueIndex] = reqdata
      }


      var senddata = { "searchstr": this.searchvalue, "status":  "complete", "pagination": this.currentPage, "shortid": this.AuthGuard.session().shortid, "filterList": this.setvalues }

      if (this.finalResponse.length == 0) {
        senddata = { "searchstr": this.searchvalue, "status":  "complete", "pagination": this.currentPage, "shortid": this.AuthGuard.session().shortid, "filterList": this.setvalues }
      }
      var tmpArrSetValues = [];
      for (var i = 0; i < this.setvalues.length; i++) {
        var obj = this.setvalues[i]
        if (obj.values.length != 0) {
          tmpArrSetValues.push(obj);
        }
      }


      this.setvalues = tmpArrSetValues;

      senddata = { "searchstr": this.searchvalue, "status":  "complete", "pagination": this.currentPage, "shortid": this.AuthGuard.session().shortid, "filterList": this.setvalues }
      // var reqdata = {"searchstr":this.serachvalue,"filtertype":key,"values":this.ivoicenvalue}
      return this.makeapi.method(this.opsppslistapi, senddata, "postjson")
        .subscribe(data => {
          this.selectedvalue = true
          this.isLoading = false
          this.pendingListdata = data
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
      this.pendingListdata = this.prrequestlistbackup
    } else {
      this.SupplierCodeArr(isChecked, event)

      var existingValueIndex = -1;
      for (var i = 0; i < this.setvalues.length; i++) {
        var tmpObj = this.setvalues[i];
        if (tmpObj['filtertype'] == key) {
          existingValueIndex = i;
        }
      }
      if (this.searchvalue == undefined) {
        this.searchvalue = ""
      }

      var reqdata = { "filtertype": key, "values": this.supplierCodeval }
      if (existingValueIndex == -1) {
        this.setvalues.push(reqdata)
      } else {
        this.setvalues[existingValueIndex] = reqdata
      }


      var senddata = { "searchstr": this.searchvalue, "status":  "complete", "pagination": this.currentPage, "shortid": this.AuthGuard.session().shortid, "filterList": this.setvalues }

      if (this.supplierCodeval.length == 0) {
        senddata = { "searchstr": this.searchvalue, "status":  "complete", "pagination": this.currentPage, "shortid": this.AuthGuard.session().shortid, "filterList": this.setvalues }
      }
      var tmpArrSetValues = [];
      for (var i = 0; i < this.setvalues.length; i++) {
        var obj = this.setvalues[i]
        if (obj.values.length != 0) {
          tmpArrSetValues.push(obj);
        }
      }


      this.setvalues = tmpArrSetValues;

      senddata = { "searchstr": this.searchvalue, "status":  "complete", "pagination": this.currentPage, "shortid": this.AuthGuard.session().shortid, "filterList": this.setvalues }
      // var reqdata = {"searchstr":this.serachvalue,"filtertype":key,"values":this.ivoicenvalue}
      return this.makeapi.method(this.opsppslistapi, senddata, "postjson")
        .subscribe(data => {
          this.selectedvalue = true
          this.isLoading = false
            this.pendingListdata = data
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
      this.pendingListdata = this.prrequestlistbackup
    } else {
      this.SupplierNameArr(isChecked, event)

      var existingValueIndex = -1;
      for (var i = 0; i < this.setvalues.length; i++) {
        var tmpObj = this.setvalues[i];
        if (tmpObj['filtertype'] == key) {
          existingValueIndex = i;
        }
      }
      if (this.searchvalue == undefined) {
        this.searchvalue = ""
      }

      var reqdata = { "filtertype": key, "values": this.supplierNameval }
      if (existingValueIndex == -1) {
        this.setvalues.push(reqdata)
      } else {
        this.setvalues[existingValueIndex] = reqdata
      }


      var senddata = { "searchstr": this.searchvalue, "status":  "complete", "pagination": this.currentPage, "shortid": this.AuthGuard.session().shortid, "filterList": this.setvalues }

      if (this.supplierNameval.length == 0) {
        senddata = { "searchstr": this.searchvalue, "status":  "complete", "pagination": this.currentPage, "shortid": this.AuthGuard.session().shortid, "filterList": this.setvalues }
      }
      var tmpArrSetValues = [];
      for (var i = 0; i < this.setvalues.length; i++) {
        var obj = this.setvalues[i]
        if (obj.values.length != 0) {
          tmpArrSetValues.push(obj);
        }
      }


      this.setvalues = tmpArrSetValues;

      senddata = { "searchstr": this.searchvalue, "status":  "complete", "pagination": this.currentPage, "shortid": this.AuthGuard.session().shortid, "filterList": this.setvalues }
      // var reqdata = {"searchstr":this.serachvalue,"filtertype":key,"values":this.ivoicenvalue}
      return this.makeapi.method(this.opsppslistapi, senddata, "postjson")
        .subscribe(data => {
          this.selectedvalue = true
          this.isLoading = false
            this.pendingListdata = data
            this.PaginationCount()
        },
          Error => {
          });
    }
  }
  currentPage=1
  totalPartCount: any;
  PaginationCount() {
    this.isLoading = true
    var submitData = { "usertype": this.status, "shortid": this.AuthGuard.session().shortid, "searchstr": this.searchvalue,"pagination":0,"status":"complete", "filterList": this.setvalues }
    this.makeapi.method(this.PaginateAPI, submitData, "postjson")
      .subscribe(data => {
        this.isLoading = false
        this.loading = false
        var totalcount = data['pageCount'];
        this.totalPartCount = totalcount;

        if(this.totalPartCount == 0){
          this.totalPages = 1
        }else{
          this.totalPages = Math.ceil(this.totalPartCount / 10);

        }


        console.log(this.totalPartCount)

      },
        Error => {
        });
  }
  loading=false
  totalPages = 10;
  paginatePartList(page) {
    console.log(page)
    if (page == 'prev' && this.currentPage > 1) {
      if (page == 'prev') {
        this.isLoading=true
      }
      else {
        this.isLoading=false
      }
      this.currentPage = this.currentPage - 1
      console.log(this.currentPage)
    }
    else {
      if (page == 'next') {
        this.isLoading=true
      }
      else {
        this.isLoading=false
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
    let reqdata = { "usertype": this.status, "shortid": this.AuthGuard.session().shortid,"status":"complete", "pagination": this.currentPage, "filterList": this.setvalues }
    this.makeapi.method(this.opsppslistapi, reqdata, "postjson")
      .subscribe(data => {
        this.isLoading = false
        // this.protolist =data.sort((a, b) => Number(b.id) - Number(a.id))

        this.pendingListdata = data;

        // for (var i = 0; i < data.length; i++) {
        //     this.supervisorstatus = data[i]['status'];
        // }
        this.loading = false
        console.log(data)
      },
        Error => {
          this.loading = false;
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


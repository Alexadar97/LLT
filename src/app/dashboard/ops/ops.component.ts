import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
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
  selector: 'app-ops',
  templateUrl: './ops.component.html',
  styleUrls: ['./ops.component.css']
})
export class OpsComponent implements OnInit {
  private opsppslistapi = this.getdata.appconstant + 'request/ppsOpsList';
  private uploadFileApi = this.getdata.appconstant + 'request/updatebulkList';
  private DownloadFileApi = this.getdata.appconstant + 'request/downloadExcel?status=';
  private errorlistAPI = this.getdata.appconstant + 'lossestrack/list';
  private listSubClusterApi = this.getdata.appconstant + 'finalresponse/list';
  private initalresAPI = this.getdata.appconstant + 'request/updateInitialResponse';
  private FianlresAPI = this.getdata.appconstant + 'request/updatefinalResponse';
  private getfilterddapi = this.getdata.appconstant + 'request/getFilterColumns';
  private PaginateAPI = this.getdata.appconstant + 'request/getPaginationCount';

  opssearchForm: FormGroup
  InitialResponsibilityForm: FormGroup;
  FinalResponsibilityForm: FormGroup;
  limitSelection = false;
  p1 = 1;
  p2 = 1;
  p3 = 1;
  constructor(private http: Http, private Formbuilder: FormBuilder, private router: Router, private getdata: DatatransferService,
    private makeapi: WebserviceService, private AuthGuard: AuthGuard) {
    this.opssearchForm = this.Formbuilder.group({
      "opssearch": [null],
    })
    // this.InitialResponsibilityForm = this.Formbuilder.group({
    //   "id": [null],
    //   "init_responsibility1": [null, Validators.compose([Validators.required])],
    //   "init_responsibility":'',
    //   "justification": [null],
    // });
    this.FinalResponsibilityForm = this.Formbuilder.group({
      "id": [null],
      "final_resposibility1":[null, Validators.compose([Validators.required])],
      "final_resposibility": "",
      "frjustification": [null, Validators.compose([Validators.required])],
    });
  }
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
  map = []
  Finalresdata = []
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



  depttype: any
  ngOnInit() {
    this.fileuploadtrue = true
    this.FinalresList()
    this.pendingList()
    this.getfilterlist()
    this.PaginationCount()
    this.opspendingtrue = true
    $('#list-item2').css({
      "border-bottom": "3px solid rgb(36, 37, 54)"
    })
  }

  opsListdata = []
  pendingList() {
    this.isLoading = true
    this.searchvalue = "ops_pending"
    var reqdata = {"status" : "ops_pending" , "shortid" : this.AuthGuard.session().shortid,"pagination":this.currentPage}
    return this.makeapi.method(this.opsppslistapi, reqdata, "postjson")
      .subscribe(data => {
        this.isLoading = false
        this.opsListdata = data
      },
        Error => {
        });
  }
  ppsListdata = []
  PPSPendingList() {
    this.isLoading = true
    this.searchvalue = "complete"
    var reqdata = {"status" : "complete" , "shortid" : this.AuthGuard.session().shortid,"pagination":this.currentPage}
    return this.makeapi.method(this.opsppslistapi, reqdata, "postjson")
      .subscribe(data => {
        this.isLoading = false
        this.ppsListdata = data
      },
        Error => {
        });
  }
  searchvalue = ""
  DataSearch = ""
  getsearchlist(value) {
    this.isLoading = true
    this.DataSearch = value
    var reqdata = {"status" : this.searchvalue , "searchstr" : value , "shortid" : this.AuthGuard.session().shortid,"pagination":this.currentPage}
    return this.makeapi.method(this.opsppslistapi, reqdata, "postjson")
      .subscribe(data => {
        this.isLoading = false
        if(this.searchvalue == "complete"){
          this.ppsListdata = data
        }else if(this.searchvalue == "ops_pending"){
          this.opsListdata = data
        }
      },
        Error => {
        });
  }

  selected_id: any;
  editbtn(id) {
    // this.selected_id = this.ppslist.filter(datax => datax.id == id);
    this.getdata.opsedit(id)
  }
  opsview: any
  modalid = null
  finalfrom: any
  initialfrom: any
  liststatus: any
  splitarrayvaluefin = []
  splitarrayvalue = []
  splitarrayfin = []
  viewops(index) {
    this.final = false
    this. splitarrayvaluefin = []
    this.splitarrayvalue = []
    this.splitarrayfin = []
    this.opsview = index
    this.liststatus = index.status
    this.modalid = this.opsview.id
    this.finalfrom = this.opsview.final_resposibility
    // this.initialfrom = this.opsview.init_responsibility
   if(this.finalfrom != null){
    var splitselectfin = this.opsview.final_resposibility
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
    this.opsview.final_resposibility1 = SelectedArrfin
    this.FinalResponsibilityForm.patchValue(this.opsview)
  }
    $("#opsmodal").modal("show")
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
      finalformdata.append("status", "ops_pending");
      finalformdata.append("shortid", this.AuthGuard.session().shortid);
      this.makeapi.method(this.uploadFileApi, finalformdata, 'file')
        .subscribe(
          data => {
            // this.cancleUpload();
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
    this.opsListdata
    var setValue = false
    for (let i = 0; i < this.opsListdata.length; i++) {
      if (this.opsListdata[i].status == "ops_pending") {
        setValue = true

        break;
      }
    }
    if (setValue) {

      this.isLoading=true;
      return this.makeapi.method(this.DownloadFileApi + "ops_pending", filename, 'downloadfile')
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
      this.getdata.showNotification('bottom', 'right', 'Pending List is Empty !!', "danger");
      // this.getdata.notify('Pending List is Empty !!', "error");
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
  opspendingtrue = false
  active() {
    this.currentPage = 1
    this.ppsListdata = []
    this.opsListdata = []
    this.pendingList()
    this.PaginationCount()
    this.activetrue = true
    this.opspendingtrue = false
    this.errortrue = false
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
    this.currentPage = 1
    var setValue = this.opssearchForm.value
    setValue.opssearch = ""
    this.opssearchForm.patchValue(setValue)
    this.fileuploadtrue = true
    this.opsListdata = []
    this.ppsListdata = []
    this.pendingList()
    this.PaginationCount()
    this.activetrue = false
    this.opspendingtrue = true
    this.errortrue = false
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
  ppspending() {
    this.currentPage = 1
    var setValue = this.opssearchForm.value
    setValue.opssearch = ""
    this.opssearchForm.patchValue(setValue)
    this.fileuploadtrue = false
    this.opsListdata = []
    this.opsListdata = []
    this.PPSPendingList()
    this.PaginationCount()
    this.errortrue = true
    this.activetrue = false
    this.opspendingtrue = false
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
            this.getdata.showNotification('bottom', 'right', 'All fields are required  !!', "danger");
            // this.getdata.notify('Pending List is Empty !!', "error");
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
            // this.getdata.notify('Final Responsibility Updated !!', "success");
            this.pendingList()
            this.PPSPendingList()
            $("#initial").modal("hide")
            $("#opsmodal").modal("hide")
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
      // this.getdata.notify('All Fields are required !!', "error");
      this.getdata.showNotification('bottom', 'right', 'All fields are required !!', "danger");
    } else {
      var getform = this.FinalResponsibilityForm.value
      getform.id = this.modalid
      getform.frjustification = this.FinalResponsibilityForm.value.frjustification
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
      var reqdata = "id=" + getform.id + "&final_resposibility=" + getform.final_resposibility + "&frjustification=" + getform.frjustification + "&frstatus" + getform.frstatus
      return this.makeapi.method(this.FianlresAPI, reqdata, "post")
        .subscribe(data => {
          this.pendingList()
          this.PPSPendingList()
          if (data.status == "Success") {
            this.isLoading = false
            // this.getdata.notify('Final Responsibility Updated !!', "success");
            this.getdata.showNotification('bottom', 'right', 'Final Responsibility Updated !!', "success");
            $("#final").modal("hide")
            $("#opsmodal").modal("hide")
            this.FinalResponsibilityForm.reset()
            this.InitialResponsibilityForm.reset()
          }
        },
          Error => {

          })
    }
  }
  reasonvvalue: any
  final = false
  finalfromvalue: any
  finalreasonvalue: any
  finalreason(value) {
    this. splitarrayvaluefin = []
    this.splitarrayvalue = []
    this.splitarrayfin = []
    this.final = true
    this.finalfromvalue = value.final_resposibility
    this.finalfrom = value.final_resposibility
    this.finalreasonvalue = value.frjustification
      // this.initialfrom = this.opsview.init_responsibility
   if(value != null){
    var splitselectfin = value.final_resposibility
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
    value.final_resposibility1 = SelectedArrfin
    this.FinalResponsibilityForm.patchValue(value)
    $("#final").modal("show")
    this.reasonvvalue = "Final Responsibility"
  }
}
  uploadType(){
    localStorage.setItem("uploadType",'2')
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
       this.ppsListdata  = this.prrequestlistbackup
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
           this.ppsListdata = data
          this.opsListdata = data
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
       this.ppsListdata  = this.prrequestlistbackup
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
           this.ppsListdata = data
          this.opsListdata = data
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
       this.ppsListdata  = this.prrequestlistbackup
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
           this.ppsListdata = data
          this.opsListdata = data
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
       this.ppsListdata  = this.prrequestlistbackup
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
           this.ppsListdata = data
          this.opsListdata = data
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
       this.ppsListdata  = this.prrequestlistbackup
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
           this.ppsListdata = data
          this.opsListdata = data
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
       this.ppsListdata  = this.prrequestlistbackup
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
           this.ppsListdata = data
          this.opsListdata = data
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
       this.ppsListdata  = this.prrequestlistbackup
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
          this.ppsListdata = data
          this.opsListdata = data
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
       this.ppsListdata  = this.prrequestlistbackup
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
           this.ppsListdata = data
          this.opsListdata = data
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
       this.ppsListdata  = this.prrequestlistbackup
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
          this.ppsListdata = data
          this.opsListdata = data
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
    var submitData = { "usertype": this.status, "shortid": this.AuthGuard.session().shortid, "searchstr": this.DataSearch, "status":this.searchvalue, "filterList": this.setvalues }
    this.makeapi.method(this.PaginateAPI, submitData, "postjson")
      .subscribe(data => {
        this.isLoading = false
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
    let reqdata = { "usertype": this.status, "shortid": this.AuthGuard.session().shortid,"status":this.searchvalue, "pagination": this.currentPage, "filterList": this.setvalues }
    this.makeapi.method(this.opsppslistapi, reqdata, "postjson")
      .subscribe(data => {
        this.isLoading = false
        // this.protolist =data.sort((a, b) => Number(b.id) - Number(a.id))

        if(this.searchvalue == "complete"){
          this.ppsListdata = data
        }else if(this.searchvalue == "ops_pending"){
          this.opsListdata = data
        }

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

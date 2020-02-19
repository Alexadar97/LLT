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
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  InitialResponsibilityForm: FormGroup;
  FinalResponsibilityForm: FormGroup;
  ppssearch: FormGroup;
  private opsppslistapi = this.getdata.appconstant + 'request/ppsOpsList';
  private searchapi = this.getdata.appconstant + 'request/ppsppslist';
  private uploadFileApi = this.getdata.appconstant + 'request/updatebulkList';
  private deleteStatusApi = this.getdata.appconstant + 'request/deleteLine';
  private errorlistAPI = this.getdata.appconstant + 'lossestrack/list';
  private DownloadFileApi = this.getdata.appconstant + 'request/downloadExcel?status=';
  private listSubClusterApi = this.getdata.appconstant + 'finalresponse/list';
  private initalresAPI = this.getdata.appconstant + 'request/updateInitialResponse';
  private FianlresAPI = this.getdata.appconstant + 'request/updatefinalResponse';
  private getfilterddapi = this.getdata.appconstant + 'request/getFilterColumns';
  private PaginateAPI = this.getdata.appconstant + 'request/getPaginationCount';

  isLoading = false
  ShowFilter = false;
  limitSelection = false;
  map1 = {}
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
      "init_responsibility1": [null, Validators.compose([Validators.required])],
      "init_responsibility": "",
      "justification": [null],
    });
    this.FinalResponsibilityForm = this.Formbuilder.group({
      "id": [null],
      "final_resposibility": '',
      "final_resposibility1": [null, Validators.compose([Validators.required])],
      "frjustification": [null, Validators.compose([Validators.required])],
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
  map = {}
  Finalresdata = []
  FinalresList() {
    let reqdata = {};
    return this.makeapi.method(this.listSubClusterApi, '', "postjson")
      .subscribe(data => {
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
  }

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
    // this.multipleallarrayfin = []
    // this.multiplearrayfin.push(item.finalresponsename)
    // this.selectfin = "signle"
  }
  onSelectAllfin(items: any) {
    // this.selectfin = "multiple"
    // this.multiplearrayfin = []
    // for (var i = 0; i < items.length; i++) {
    //   var arraylist = items[i].finalresponsename
    //   this.multipleallarrayfin.push(arraylist)
    // }
  }
  Dumpdown
  usetype: any
  ngOnInit() {
    this.FinalresList()
    this.PaginationCount()
    localStorage.setItem("uploadType", '3')
    // this.draftList()
    this.usetype = this.AuthGuard.session().usertype
    this.activetrue = true
    $('#list-item1').css({
      "border-bottom": "3px solid rgb(36, 37, 54)"
    })
    this.OpstList()
    this.getfilterlist()
    this.Dumpdown = "Dump_Download"
  }
  finalview
  opsListdata
  ppslist = [];
  Draftppslist = []
  draftcount = 0
  filtercount = 0
  searchTavWise: any
  getppslist() {
    this.setValue = false
    this.searchvalue = "complete"
    this.searchTavWise = "pending"
    this.ppslist = [];
    this.Draftppslist = []
    this.isLoading = true;
    var reqdata = { "status": "complete", "shortid": this.AuthGuard.session().shortid, "pagination": this.currentPage, }
    return this.makeapi.method(this.opsppslistapi, reqdata, "postjson")
      .subscribe(data => {
        this.isLoading = false;
        this.ppslist = data
        for (let i = 0; i < this.ppslist.length; i++) {
          if (this.ppslist[i].status == "complete") {
            this.setValue = true
            break;
          }
        }
      },
        Error => {
        });
  }
  // draftList() {
  //   this.searchvalue = "draft"
  //   this.ppslist = [];
  //   this.Draftppslist = []
  //   this.isLoading = true;
  //   var reqdata = {"status": "draft" , "shortid" : this.AuthGuard.session().shortid,"pagination": this.currentPage,}
  //   return this.makeapi.method(this.opsppslistapi, reqdata, "postjson")
  //     .subscribe(data => {
  //       this.isLoading = false;
  //       this.Draftppslist = data
  //       this.draftcount = data.length

  //     },
  //       Error => {
  //       });
  // }
  searchvalue = ""
  DataSearch = ""
  getsearchlist(value) {
    this.isLoading = true;
    this.DataSearch = value
    var reqdata = { "status": this.searchvalue, "searchstr": value, "shortid": this.AuthGuard.session().shortid, "pagination": this.currentPage, }
    return this.makeapi.method(this.opsppslistapi, reqdata, "postjson")
      .subscribe(data => {
        this.isLoading = false;
        if (this.searchvalue == "complete" && this.searchTavWise == "pending") {
          this.ppslist = data
        } else if (this.searchvalue == "ops_pending") {
          this.ppslistdata = data
        } else if (this.searchvalue == "complete" && this.searchTavWise == "fr") {
          this.FinalLIstData = data
        } else if (this.searchvalue == "draft") {
          this.Draftppslist = data
        }

      },
        Error => {
        });
  }
  FinalLIstData = []
  FinalList() {
    this.setValue = false
    this.searchvalue = "complete"
    this.searchTavWise = "fr"
    this.isLoading = true;
    var reqdata = { "status": "complete", "shortid": this.AuthGuard.session().shortid, "pagination": this.currentPage, }
    return this.makeapi.method(this.opsppslistapi, reqdata, "postjson")
      .subscribe(data => {
        this.isLoading = false;
        this.FinalLIstData = data
        for (let i = 0; i < this.FinalLIstData.length; i++) {
          if (this.FinalLIstData[i].status == "complete") {
            this.setValue = true
            break;
          }
        }
      },
        Error => {
        });
  }
  back() {
    this.activetrue = true
    this.drafttrue = false
    this.getppslist()
  }
  ppslistdata = []
  Drafttrue = false
  DraftListtrue() {
    this.Drafttrue = true
    this.drafttrue = true
    this.activetrue = false
    // this.draftList()
  }
  setValue = false
  OpstList() {
    this.isLoading = true;
    this.setValue = false
    this.searchvalue = "ops_pending"
    var reqdata = { "status": "ops_pending", "shortid": this.AuthGuard.session().shortid, "pagination": this.currentPage, }
    return this.makeapi.method(this.opsppslistapi, reqdata, "postjson")
      .subscribe(data => {
        this.isLoading = false;
        this.ppslistdata = data
        for (let i = 0; i < this.ppslistdata.length; i++) {
          if (this.ppslistdata[i].status == "ops_pending") {
            this.setValue = true
            break;
          }
        }
      },
        Error => {
        });
  }
  // Errorlistdata=[]
  // Errorlist() {
  //   var reqdata = "shortid=" + this.AuthGuard.session().shortid
  //   return this.makeapi.method(this.errorlistAPI,reqdata,"post")
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
    this.isLoading = true;
    var reqdata = "id=" + this.deleteid
    return this.makeapi.method(this.deleteStatusApi, reqdata, "post")
      .subscribe(data => {
        if (data.status == 'Success') {
          this.isLoading = false;
          this.getdata.showNotification('bottom', 'right', 'Deleted Successfully !!', "success");
          // this.getdata.notify('Deleted Successfully !!', "success");
          // this.draftList()
          this.getppslist()
          this.FinalList()
          this.OpstList()
          $("#delete").modal("hide")
        }
      },
        Error => {

        })
  }
  modalClose() {
    this.filename = ""
    $("#fileupload").modal("hide")
  }

  ppsfinaledit(id, value) {
    localStorage.setItem("adminEdit", "tracker")
    this.getdata.ppsfinaleditvalue(id)
    if (value == 1) {
      localStorage.setItem("AdminEdit", "PPS Edit")
    } else if (value == 2) {
      localStorage.setItem("AdminEdit", "OPS Edit")
    } else if (value == 3) {
      localStorage.setItem("AdminEdit", "Final Responsibility Edit")
    }
  }
  ppsview: any
  modalid = null
  finalfrom: any
  initialfrom: any
  splitarrayvaluefin1 = []
  splitarrayvaluefin2 = []
  splitarrayvalue = []
  splitarrayfin1 = []
  splitarrayfin2 = []
  modaltrue=false
  viewpps(index) {
    this.modaltrue = false
    this.splitarrayvaluefin1 = []
    this.splitarrayvaluefin2 = []
    this.splitarrayvalue = []
    this.splitarrayfin1 = []
    this.splitarrayfin2 = []

    this.ppsview = index
    this.modalid = this.ppsview.id
    this.finalfrom = this.ppsview.final_resposibility
    this.initialfrom = this.ppsview.init_responsibility
    this.isDraft = index.isDraft
    // Final responsibility Multiple Selected
    if (this.finalfrom != null) {
      var splitselectfin1 = index.final_resposibility
      this.splitarrayfin1.push(splitselectfin1)
      for (var i = 0; i < this.splitarrayfin1.length; i++) {
        for (var j = 0; j < this.splitarrayfin1[i].split(",").length; j++) {
          this.splitarrayvaluefin1.push(this.splitarrayfin1[i].split(",")[j]);
        }
      }

      var SelectedArrfin1 = [];
      for (var i = 0; i < this.splitarrayvaluefin1.length; i++) {
        SelectedArrfin1.push({
          id: this.map[this.splitarrayvaluefin1[i]],
          finalresponsename: this.splitarrayvaluefin1[i]
        });
      }
      this.selectedItems = SelectedArrfin1
      index.final_resposibility1 = SelectedArrfin1
      this.FinalResponsibilityForm.patchValue(index)
      this.reasonvvalue = "Final Responsibility"
    }
    if (this.initialfrom != null) {
      var splitselectfin2 = index.init_responsibility
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
      this.selectedItems = SelectedArrfin2
      index.init_responsibility1 = SelectedArrfin2
      this.InitialResponsibilityForm.patchValue(index)
    }
    $("#ppsmodal").modal("show")
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
  FilePendingStatus = 'ops_pending'
  ConfirmUploadFile() {
    if (this.filename == null || this.filename == '') {
      this.getdata.showNotification('bottom', 'right', 'Upload file is required !!', "danger");
      // this.getdata.notify('Upload file is required !!', "error");
    } else {
      this.isLoading = true;
      let finalformdata: FormData = new FormData();
      finalformdata.append("file", this.finallfile);
      finalformdata.append("filename", this.filename);
      finalformdata.append("status", this.FilePendingStatus);
      finalformdata.append("shortid", this.AuthGuard.session().shortid);
      this.makeapi.method(this.uploadFileApi, finalformdata, 'file')
        .subscribe(
          data => {
            if (data.status == 'success') {
              // this.draftList()
              this.getppslist()
              $("#fileupload").modal("hide")
              this.filename = "";
              this.getdata.showNotification('bottom', 'right', 'File uploaded successfully !!', "success");
              // this.getdata.notify('File uploaded successfully !!', "success");
              this.isLoading = false;
            }
          },
          Error => {
          });

    }

  }

  fileuploadmodal() {
    $("#fileupload").modal("show")
  }
  yearid: any
  // isLoading=false;
  status: any
  downloadFile(filename) {
    this.ppslist
    this.isLoading = true;
    if (this.setValue) {
      // this.isLoading=true;
      return this.makeapi.method(this.DownloadFileApi + this.FilePendingStatus, filename, 'downloadfile')
        .subscribe(res => {
          this.isLoading = false;
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
  DumpdownloadFile(filename) {
    this.ppslist
    this.isLoading = true;
    if (this.setValue) {
      // this.isLoading=true;
      return this.makeapi.method(this.DownloadFileApi + "all", filename, 'downloadfile')
        .subscribe(res => {
          this.isLoading = false;
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
      this.isLoading = false;
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
  finaltrue = false
  DownloadName = 'OPS_Pending'
  paginatnateStatus = 'ops_pending'
  opspending() {
    this.setvalues = []
    this.searchvalue = "ops_pending"
    this.currentPage = 1
    var setValue = this.ppssearch.value
    setValue.ppssearch = ""
    this.ppssearch.patchValue(setValue)
    localStorage.setItem("uploadType", '2')
    console.log(localStorage.getItem("uploadType"))
    this.FilePendingStatus = 'ops_pending'
    this.paginatnateStatus = 'ops_pending'
    this.DownloadName = 'OPS_Pending'
    this.ppslist = []
    this.FinalLIstData = []
    this.OpstList()
    this.PaginationCount()

    this.activetrue = true
    this.finaltrue = false
    this.opspendingtrue = false
    this.Drafttrue = false
    this.drafttrue = false
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
  drafttrue = false
  PPSpending() {
    this.setvalues = []
    this.currentPage = 1
    var setValue = this.ppssearch.value
    setValue.ppssearch = ""
    this.ppssearch.patchValue(setValue)
    localStorage.setItem("uploadType", '3')
    this.FilePendingStatus = 'pps_pending'
    this.paginatnateStatus = 'complete'
    this.DownloadName = 'PPS_Pending'
    this.ppslist = []
    this.FinalLIstData = []
    this.getppslist()
    this.PaginationCount()
    this.activetrue = false
    this.finaltrue = false
    this.opspendingtrue = true
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
  opspendingtrue = false
  finalpending() {
    this.setvalues = []
    this.currentPage = 1
    var setValue = this.ppssearch.value
    setValue.ppssearch = ""
    this.ppssearch.patchValue(setValue)
    localStorage.setItem("uploadType", '4')
    this.FilePendingStatus = 'complete'
    this.paginatnateStatus = 'complete'
    this.DownloadName = 'Final_Responsibility_Pending'
    this.ppslist = []
    this.ppslistdata = []
    this.FinalList()
    this.PaginationCount()
    this.opspendingtrue = false
    this.activetrue = false
    this.finaltrue = true
    this.Drafttrue = false
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
    // this.multipleallarray = []
    // this.multiplearray = []

  }
  confirminitalres() {
    if (this.InitialResponsibilityForm.invalid) {
      this.markFormGroupTouched(this.InitialResponsibilityForm);
      this.getdata.showNotification('bottom', 'right', 'All fields are required !!', "danger");
      // this.getdata.notify('All Fields are required !!', "error");
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
            this.getdata.showNotification('bottom', 'right', 'Initial Responsibility Updated !!', "success");
            // this.getdata.notify('Initial Responsibility Updated !!', "success");
            // this.draftList()
            if (this.searchvalue == "ops_pending") {
              this.OpstList()
            } else if (this.searchvalue == "complete") {
              this.FinalList()
            }

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
  // closemodal() {
  //   this.FinalResponsibilityForm.reset()
  //   this.InitialResponsibilityForm.reset()
  // }
  finalres() {
    // $("#finalfrom").val(this.finalfrom)
    $("#final").modal("show")
    this.FinalresList()
  }
  confirmfinalres() {
    this.isLoading = true;
    if (this.FinalResponsibilityForm.invalid) {
      this.markFormGroupTouched(this.FinalResponsibilityForm);
      this.getdata.showNotification('bottom', 'right', 'All fields are required !!', "danger");
      // this.getdata.notify('All Fields are required !!', "error");
    } else {
      var getform = this.FinalResponsibilityForm.value
      getform.id = this.modalid
      getform.frjustification = this.FinalResponsibilityForm.value.frjustification
      var SelectArray = []
      for (let i = 0; i < getform.final_resposibility1.length; i++) {
        var emtobjfin = getform.final_resposibility1[i].finalresponsename
        SelectArray.push(emtobjfin)
        var arrselectfin = SelectArray.join(',');
        getform.final_resposibility = arrselectfin;
      }
      if (getform.final_resposibility1.length == 1) {
        getform.frstatus = 1
      } else {
        getform.frstatus = 0
      }
      delete getform.final_resposibility1

      getform.justification = this.InitialResponsibilityForm.value.justification
      var reqdata = "id=" + getform.id + "&final_resposibility=" + getform.final_resposibility + "&frjustification=" + getform.frjustification + "&frstatus=" + getform.frstatus
      return this.makeapi.method(this.FianlresAPI, reqdata, "post")
        .subscribe(data => {
          // this.draftList()
          this.OpstList()
          if (data.status == "Success") {
            this.isLoading = false;
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
  inialtireason(index) {
    // this.splitarrayvaluefin1 = []
    this.splitarrayvaluefin2 = []
    // this.splitarrayvalue = []
    // this.splitarrayfin1 = []
    this.splitarrayfin2 = []
    this.modaltrue = true
    var data = index
    this.initialfrom = index.init_responsibility
    this.initialreson = index.justification
    if (this.initialfrom != null) {
      var splitselectfin2 = index.init_responsibility
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
      this.selectedItems = SelectedArrfin2
      index.init_responsibility1 = SelectedArrfin2
      this.InitialResponsibilityForm.patchValue(index)
    }
    $("#initial").modal("show")
    this.reasonvvalue = "Initial Responsibility"
    this.initial = true
    this.final = false
  }
  final = false
  finalfromvalue: any
  finalreasonvalue: any
  isDraft = null
  finalreason(index) {
    this.splitarrayvaluefin1 = []
    // this.splitarrayvaluefin2 = []
    // this.splitarrayvalue = []
    this.splitarrayfin1 = []
    // this.splitarrayfin2 = []
    this.modaltrue = true
    this.finalfrom = index.final_resposibility
    this.finalreasonvalue = index.frjustification
    $("#final").modal("show")
    this.reasonvvalue = "Final Responsibility"
    this.final = true
    this.initial = false
    if (this.finalfrom != null) {
      var splitselectfin1 = index.final_resposibility
      this.splitarrayfin1.push(splitselectfin1)
      for (var i = 0; i < this.splitarrayfin1.length; i++) {
        for (var j = 0; j < this.splitarrayfin1[i].split(",").length; j++) {
          this.splitarrayvaluefin1.push(this.splitarrayfin1[i].split(",")[j]);
        }
      }

      var SelectedArrfin1 = [];
      for (var i = 0; i < this.splitarrayvaluefin1.length; i++) {
        SelectedArrfin1.push({
          id: this.map[this.splitarrayvaluefin1[i]],
          finalresponsename: this.splitarrayvaluefin1[i]
        });
      }
      this.selectedItems = SelectedArrfin1
      index.final_resposibility1 = SelectedArrfin1
      this.FinalResponsibilityForm.patchValue(index)
      this.reasonvvalue = "Final Responsibility"
    }
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
    this.isLoading = true;
    return this.makeapi.method(this.getfilterddapi, "", "get")
      .subscribe(data => {
        this.isLoading = false;
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
  selectedvalue = false
  vendorvalues = []
  setvalues = []
  prrequestlistbackup = []
  isselected: any
  vendor(event2, key) {
    this.isLoading = true;
    var isChecked = event2.target.checked;

    var event = event2.target.value;
    if (event == "null") {
      this.ppslist = this.prrequestlistbackup
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
          this.PaginationCount()
          this.isLoading = false;
          this.ppslist = data
          this.ppslistdata = data
          this.FinalLIstData = data
          this.Draftppslist = data
        },
          Error => {
          });
    }
  }
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
    this.isLoading = true;
    var isChecked = event2.target.checked;
    var event = event2.target.value;
    if (event == "null") {
      this.ppslist = this.prrequestlistbackup
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
          this.PaginationCount()
          this.isLoading = false;
          this.ppslist = data
          this.ppslistdata = data
          this.FinalLIstData = data
          this.Draftppslist = data
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
    this.isLoading = true;
    var isChecked = event2.target.checked;
    var event = event2.target.value;
    if (event == "null") {
      this.ppslist = this.prrequestlistbackup
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
          this.isLoading = false;
          this.PaginationCount()
          this.ppslist = data
          this.ppslistdata = data
          this.FinalLIstData = data
          this.Draftppslist = data
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
    this.isLoading = true;
    var isChecked = event2.target.checked;
    var event = event2.target.value;
    if (event == "null") {
      this.ppslist = this.prrequestlistbackup
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
          this.isLoading = false;
          this.PaginationCount()
          this.ppslist = data
          this.ppslistdata = data
          this.FinalLIstData = data
          this.Draftppslist = data
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
    this.isLoading = true;
    var isChecked = event2.target.checked;
    var event = event2.target.value;
    if (event == "null") {
      this.ppslist = this.prrequestlistbackup
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
          this.isLoading = false;
          this.PaginationCount()
          this.ppslist = data
          this.ppslistdata = data
          this.FinalLIstData = data
          this.Draftppslist = data
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
    this.isLoading = true;
    var isChecked = event2.target.checked;
    var event = event2.target.value;
    if (event == "null") {
      this.ppslist = this.prrequestlistbackup
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
          this.isLoading = false;
          this.PaginationCount()
          this.ppslist = data
          this.ppslistdata = data
          this.FinalLIstData = data
          this.Draftppslist = data
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
    this.isLoading = true;
    var isChecked = event2.target.checked;
    var event = event2.target.value;
    if (event == "null") {
      this.ppslist = this.prrequestlistbackup
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
          this.isLoading = false;
          this.PaginationCount()
          this.ppslist = data
          this.ppslistdata = data
          this.FinalLIstData = data
          this.Draftppslist = data
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
    this.isLoading = true;
    var isChecked = event2.target.checked;
    var event = event2.target.value;
    if (event == "null") {
      this.ppslist = this.prrequestlistbackup
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
          this.isLoading = false;
          this.PaginationCount()
          this.ppslist = data
          this.ppslistdata = data
          this.FinalLIstData = data
          this.Draftppslist = data
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
    this.isLoading = true;
    var isChecked = event2.target.checked;
    var event = event2.target.value;
    if (event == "null") {
      this.ppslist = this.prrequestlistbackup
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


      var senddata = { "searchstr": this.DataSearch, "status": this.searchvalue, "shortid": this.AuthGuard.session().shortid, "pagination": this.currentPage, "filterList": this.setvalues }

      if (this.supplierNameval.length == 0) {
        senddata = { "searchstr": this.DataSearch, "status": this.searchvalue, "shortid": this.AuthGuard.session().shortid, "pagination": this.currentPage, "filterList": this.setvalues }
      }
      var tmpArrSetValues = [];
      for (var i = 0; i < this.setvalues.length; i++) {
        var obj = this.setvalues[i]
        if (obj.values.length != 0) {
          tmpArrSetValues.push(obj);
        }
      }


      this.setvalues = tmpArrSetValues;

      senddata = { "searchstr": this.DataSearch, "status": this.searchvalue, "shortid": this.AuthGuard.session().shortid, "pagination": this.currentPage, "filterList": this.setvalues }
      // var reqdata = {"searchstr":this.serachvalue,"filtertype":key,"values":this.ivoicenvalue}
      return this.makeapi.method(this.opsppslistapi, senddata, "postjson")
        .subscribe(data => {
          this.selectedvalue = true
          this.isLoading = false;
          this.PaginationCount()
          this.ppslist = data
          this.ppslistdata = data
          this.FinalLIstData = data
          this.Draftppslist = data
        },
          Error => {
          });
    }
  }
  currentPage = 1
  totalPartCount: any;
  PaginationCount() {
    this.isLoading = true;
    var submitData = { "usertype": this.status, "shortid": this.AuthGuard.session().shortid, "searchstr": this.DataSearch, "status": this.paginatnateStatus, "filterList": this.setvalues, "pagination": 0 }
    this.makeapi.method(this.PaginateAPI, submitData, "postjson")
      .subscribe(data => {
        this.isLoading = false;
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
    this.PaginationCount()
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
    this.isLoading = true;
    let reqdata = { "usertype": this.status, "shortid": this.AuthGuard.session().shortid, "pagination": this.currentPage, "status": this.searchvalue, "filterList": this.setvalues }
    this.makeapi.method(this.opsppslistapi, reqdata, "postjson")
      .subscribe(data => {
        // this.protolist =data.sort((a, b) => Number(b.id) - Number(a.id))
        this.isLoading = false;
        if (this.searchvalue == "complete" && this.searchTavWise == "pending") {
          this.ppslist = data
        } else if (this.searchvalue == "ops_pending") {
          this.ppslistdata = data
        } else if (this.searchvalue == "complete" && this.searchTavWise == "fr") {
          this.FinalLIstData = data
        } else if (this.searchvalue == "draft") {
          this.Draftppslist = data
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

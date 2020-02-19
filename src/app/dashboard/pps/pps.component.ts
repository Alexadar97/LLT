import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpModule } from '@angular/http';
import { DatatransferService } from '../../datatransfer.service'
import { WebserviceService } from '../../webservice.service'
import { AuthGuard } from '../../canactivate.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Router,ActivatedRoute } from '@angular/router';

declare var $, moment;

@Component({
  selector: 'app-pps',
  templateUrl: './pps.component.html',
  styleUrls: ['./pps.component.css']
})
export class PpsComponent implements OnInit {
  BasicForm: FormGroup;
  OPSForm:FormGroup
  isLoading = false;
  ShowFilter = false;
  limitSelection = false;
  p1=1
  map:any
  private ppssave = this.getdata.appconstant + 'request/save';
  private uploadFileApi = this.getdata.appconstant + 'request/createPPSBulkList';
  // private updateopsapi = this.getdata.appconstant + 'updateByOPS';
  private listClusterApi = this.getdata.appconstant + 'cluster/list';
  private getsubclusterApi = this.getdata.appconstant + 'subcluster/filterlist';
  private getpplist = this.getdata.appconstant + 'request/getSingleLine';
  private errorlistAPI = this.getdata.appconstant + 'lossestrack/list';
  
  constructor(private Formbuilder: FormBuilder, private http: Http, private router: Router, private getdata: DatatransferService,
    private makeapi: WebserviceService, private AuthGuard:AuthGuard,private route: ActivatedRoute ) {
    this.BasicForm = this.Formbuilder.group({
      "id":[null],
      "month": [null, Validators.compose([Validators.required])],
      "date": [null, Validators.compose([Validators.required])],
      "model": [null, Validators.compose([Validators.required])],
      "loss_qty": [null, Validators.compose([Validators.required])],
      "loss_time": [null, Validators.compose([Validators.required])],
      "loss_description": [null, Validators.compose([Validators.required])],
      "init_responsibility1": [null, Validators.compose([Validators.required])],
      "init_responsibility": '',
      "pps_main_cluster_id": [null, Validators.compose([Validators.required])],
      "ppsmaincluster" : "",
      "pps_sub_cluster": [null, Validators.compose([Validators.required])],
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
  ppsDraftid:any
  ngOnInit() {
    this.manual()
    this.route.queryParams.filter(params => params.ppsDraftid)
    .subscribe(params => {
      this.ppsDraftid = params.ppsDraftid;
      this.getDraftedit(this.ppsDraftid)
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
  // multiplearray=[]
  // multipleallarray=[]
  // select:any
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
  subclustName:any
  getsubclusterdta=[]
  getsubcluster(id){
    this.isLoading = true
    for(let i=0; i<this.getListdata.length; i++){
      var emtobj = this.getListdata[i]
      if(emtobj.id == id){
        this.subclustName = emtobj.clustername
      }
    }
    let reqdata = "id="+id
    return this.makeapi.method(this.getsubclusterApi,reqdata, "post")
      .subscribe(data => {
        this.isLoading = false
        this.getsubclusterdta = data
      },
        Error => {
        });
  }
  title:any
  head:any
  Submit(value){
    if(value == 0){
      this.title = "submit"
      this.head = "Submit"
      if (this.BasicForm.invalid) {
        this.markFormGroupTouched(this.BasicForm);
        this.getdata.showNotification('bottom', 'right', 'All fields are required !!', "danger");
        return false;
    
      }else{
        $("#submit").modal("show")
      } 
    }if(value == 1){
      this.title = "draft"
      this.head = "Draft"
      $("#submit").modal("show")
    }
  }

  confirmSubmit(value) {
    this.isLoading = true
      var reqdata = this.BasicForm.value;
      reqdata.shortid = this.AuthGuard.session().shortid
      // reqdata.pps_main_cluster = this.clustername
      if(reqdata.id == null){
        delete reqdata.id
      }

      // if(this.select == "multiple"){
      //   var arrselect = this.multipleallarray.join(',');
      //   reqdata.init_responsibility = arrselect;
      // }else if(this.select == "signle"){
      //   var arrselect = this.multiplearray.join(',');
      //   reqdata.init_responsibility = arrselect;
      // }
      // if(this.editid != null && reqdata.init_responsibility != ""){
      //   if(this.select == "multiple"){
      //     var arrselect = this.multipleallarray.join(',');
      //     reqdata.init_responsibility = arrselect;
      //   }else if(this.select == "signle"){
      //     var arrselect = this.multiplearray.join(',');
      //     reqdata.init_responsibility = arrselect;
      //   }else{
      //   var initiatevalue = []
      //   initiatevalue = reqdata.init_responsibility
      //   var arrselect = initiatevalue.join(',');
      //   reqdata.init_responsibility = arrselect;
      //   }
      // }else{
      //   reqdata.deleteStatus = this.deleteStatus
      //   reqdata.status = this.statusValue
      // }
      var SelectArray = []
      if(reqdata.init_responsibility1.length == 1){
        reqdata.opsstatus = 1
      }else{
        reqdata.opsstatus = 0
      }
      for(let i=0; i<reqdata.init_responsibility1.length; i++){
        var emtobj = reqdata.init_responsibility1[i].item_text
         SelectArray.push(emtobj)
         var arrselect = SelectArray.join(',');
           reqdata.init_responsibility = arrselect;
      }
      delete reqdata.init_responsibility1
      var targetDate = this.BasicForm.value.date
      // var newDate = new Date(targetDate);
      // reqdata.date = moment(newDate).format('DD-MM-YYYY');
      reqdata.date = $("#date").val()
      reqdata.ppsmaincluster = this.subclustName
      if(value == 1){
        reqdata.isDraft = 1
        if(reqdata.month == null){
          reqdata.month = ""
        }
        if(reqdata.date == null){
          reqdata.date = ""
        }
        if(reqdata.model == null){
          reqdata.model = ""
        }
        if(reqdata.init_responsibility == null || reqdata.init_responsibility.length == [0]){
          reqdata.init_responsibility = ""
        }
        if(reqdata.loss_description == null){
          reqdata.loss_description = ""
        }
        if(reqdata.loss_qty == null){
          reqdata.loss_qty = ""
        }
        if(reqdata.loss_time == null){
          reqdata.loss_time = ""
        }
        if(reqdata.pps_main_cluster_id == null){
          reqdata.pps_main_cluster_id = ""
        }
        if(reqdata.pps_sub_cluster == null){
          reqdata.pps_sub_cluster = ""
        }
        }else if(value == 0){
          reqdata.isDraft = 0
        }
      return this.makeapi.method(this.ppssave, reqdata, "postjson")
        .subscribe(data => {
          this.isLoading = false
          var depttype = this.AuthGuard.session().depttype
          var usertype = this.AuthGuard.session().usertype
          if(value == 0){
            this.getdata.showNotification('bottom', 'right', 'PPS submitted successfully!!', "success");
          }else if(value == 1){
            this.getdata.showNotification('bottom', 'right', 'PPS save as srafted !!', "success");
            // this.getdata.notify('PPS Save as Drafted !!', "success");
          }
         
          if(usertype == "admin"){
            this.router.navigateByUrl("dashboard/tracker")
          }else{
            this.router.navigateByUrl("dashboard/pps")
          }
          $("#submit").modal("hide");
          this.BasicForm.reset();
        },
          Error => {
          });
   
}
splitarray = []
splitarrayvalue = []
editid=null
deleteStatus:any
statusValue:any
getDraftedit(id){
  this.isLoading = true
  this.editid = id
  this.makeapi.method(this.getpplist + "?id=" + id, "", "get")
      .subscribe(data => {
        this.isLoading = false
      var datas= data[0]
      var splitselect = datas.init_responsibility
      if(splitselect != ""){
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
        this.deleteStatus = data.deleteStatus;
        this.statusValue = datas.status
     this.getsubcluster(datas.pps_main_cluster_id)
         this.BasicForm.patchValue(datas)
         $("#date").val(datas.date)
      },
        Error => {
        });
}
filename = '';
finallfile: any;
uploadfile(event) {
  let fileList: FileList = event.target.files;
  if (fileList.length > 0) {

    var file: File = fileList[0];
    var finalfilename = (file.name).split(".");
    this.filename = finalfilename[0];
    this.finallfile = file;
    // this.filename = this.finallfile.name
  }
}
// @ViewChild('uploadFile',{static: true}) uploadFile: any;

cancleUpload() {
  // this.uploadFile.nativeElement.value;

  // this.uploadFile.nativeElement.focus();
  this.filename = ""
  $("#fileupload").modal("hide")
}

ConfirmUploadFile() {
  this.isLoading = true
  if(this.filename == null || this.filename == ''){
    // this.getdata.notify('Upload file is required !!', "danger");
    this.getdata.showNotification('bottom', 'right', 'Upload file is required !!', "danger");
  }else{
        let finalformdata: FormData = new FormData();
        finalformdata.append("file", this.finallfile);
        finalformdata.append("filename", this.filename);
        finalformdata.append("shortid", this.AuthGuard.session().shortid);
        this.makeapi.method(this.uploadFileApi, finalformdata, 'file')
          .subscribe(
            data => {
              this.isLoading = false
              this.cancleUpload();
              if(data.status == "success"){
                var depttype = this.AuthGuard.session().depttype
                var usertype = this.AuthGuard.session().usertype
                if(usertype == "admin"){
                  this.router.navigateByUrl("dashboard/tracker")
                }else{
                  this.router.navigateByUrl("dashboard/pps")
                }
                // this.getdata.notify('File uploaded successfully !!', "success");
                this.getdata.showNotification('bottom', 'right', 'File uploaded successfully !!', "success");
              }else if(data.status == "validation error"){
                this.Errorlist()
                // this.getdata.notify('Upload Failed !!', "error");
                this.getdata.showNotification('bottom', 'right', 'Upload Failed !!', "danger");
              }else{
                // this.getdata.notify('Upload Failed !!', "error");
                this.getdata.showNotification('bottom', 'right', 'Upload Failed !!', "danger");
              }
              
             
            },
            Error => {
            });
          }
}
fileuploadmodal(){
  $("#fileupload").modal("show")
}
multipleselect(value){}
back(){
  var depttype = this.AuthGuard.session().depttype
  var usertype = this.AuthGuard.session().usertype
  if(usertype == "admin"){
    this.router.navigateByUrl("dashboard/tracker")
  }else{
    this.router.navigateByUrl("dashboard/pps")
  }
}

manualtrue = false
uploadtrue = false
manual() {
  this.manualtrue = true
  this.uploadtrue = false
  $('#list-item1').css({
    "background":"#003b60","color":"#ffff"
  })
  $('#list-item2').css({
    "border-bottom": "none","background":"#9d9ea2","color":"#fff","border-radius":"unset"
  })
}
upload() {
  this.Errorlist() 
  this.manualtrue = false
  this.uploadtrue = true
  $('#list-item2').css({
    "background":"#003b60","color":"#ffff"
  })
  $('#list-item1').css({
    "border-bottom": "none","background":"#9d9ea2","color":"#fff","border-radius":"unset"
  })
}
  Errorlistdata = []
  userType=null
  Errorlist() {
    this.isLoading = true
    var usertype = this.AuthGuard.session().usertype
    if(usertype == "admin"){
      this.userType = 0
    }else{
      this.userType = 1
    }
    var reqdata = "shortid=" + this.AuthGuard.session().shortid + "&typeid=" + 1 + "&usertype="+this.userType
    return this.makeapi.method(this.errorlistAPI, reqdata, "post")
      .subscribe(data => {
        this.isLoading = false
        this.Errorlistdata = data
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
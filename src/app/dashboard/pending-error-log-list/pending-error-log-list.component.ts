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
import { Router, ActivatedRoute } from '@angular/router';

declare var $, moment;

@Component({
  selector: 'app-pending-error-log-list',
  templateUrl: './pending-error-log-list.component.html',
  styleUrls: ['./pending-error-log-list.component.css']
})
export class PendingErrorLogListComponent implements OnInit {
  p1 = 1
  private errorlistAPI = this.getdata.appconstant + 'lossestrack/list';
  private uploadFileApi = this.getdata.appconstant + 'request/updatebulkList';

  constructor(private Formbuilder: FormBuilder, private http: Http, private router: Router, private getdata: DatatransferService,
    private makeapi: WebserviceService, private AuthGuard: AuthGuard, private route: ActivatedRoute) {

  }
  uploadType = null
  ngOnInit() {
    this.uploadType = localStorage.getItem("uploadType")
    this.Errorlist()
  }
  Errorlistdata = []
  userType = null
  Errorlist() {
    this.isLoading = true
    var usertype = this.AuthGuard.session().usertype
    if (usertype == "admin") {
      this.userType = 0
    } else {
      this.userType = 1
    }
    var reqdata = "shortid=" + this.AuthGuard.session().shortid + "&typeid=" + this.uploadType + "&usertype=" + this.userType
    return this.makeapi.method(this.errorlistAPI, reqdata, "post")
      .subscribe(data => {
        this.isLoading = false
        this.Errorlistdata = data
      },
        Error => {
        });
  }
  back() {
    var depttype = this.AuthGuard.session().depttype
    var usertype = this.AuthGuard.session().usertype
    if (usertype == "admin") {
      this.router.navigateByUrl("dashboard/tracker")
    } else if (depttype == "PPS") {
      this.router.navigateByUrl("dashboard/pps")
    }
    else if (depttype == "OPS") {
      this.router.navigateByUrl("dashboard/ops")
    }
    else if (depttype == "SM-P/V") {
      this.router.navigateByUrl("dashboard/final")
    }
  }
  fileuploadmodal() {
    $("#fileupload").modal("show")
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
  // @ViewChild('uploadFile') uploadFile: any;

  // cancleUpload() {
  //   this.uploadFile.nativeElement.value = "";
  //   this.filename = ""
  // }
  isLoading = false
  status: any
  ConfirmUploadFile() {
    if (this.uploadType == '2') {
      this.status = "ops_pending"
    } else if (this.uploadType == '3') {
      this.status = "pps_pending"
    } else if (this.uploadType == '4') {
      this.status = "complete"
    }
    if (this.filename == null || this.filename == '') {
              this.getdata.showNotification('bottom', 'right', 'Upload file is required!!', "danger");
              // this.getdata.notify('Upload file is required!!', "error");
    } else {
      this.isLoading = true;
      let finalformdata: FormData = new FormData();
      finalformdata.append("file", this.finallfile);
      finalformdata.append("filename", this.filename);
      finalformdata.append("status", this.status);
      finalformdata.append("shortid", this.AuthGuard.session().shortid);
      this.makeapi.method(this.uploadFileApi, finalformdata, 'file')
        .subscribe(
          data => {
            this.Errorlist()
            this.isLoading = false; $
            this.Closmodal()
            if (data.status == 'success') {
              // this.getdata.notify('File uploaded successfully!!', "success");
              this.getdata.showNotification('bottom', 'right', 'File uploaded successfully!!', "success");
            } else if (data.status == "validation error") {
              this.getdata.showNotification('bottom', 'right', 'Validation Error !!', "danger");
              // this.getdata.notify('Validation Error !!', "error");
            } else {
              this.getdata.showNotification('bottom', 'right', 'File Upload is Failed !!', "danger");
              // this.getdata.notify('File Upload is Failed !!', "error");
            }
          },
          Error => {
          });
    }

  }
  Closmodal() {
    this.filename = ""
    $("#fileupload").modal("hide")
  }
}

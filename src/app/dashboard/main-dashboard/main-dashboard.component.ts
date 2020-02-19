import { Component, OnInit } from '@angular/core';
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
declare var $;
@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.css']
})
export class MainDashboardComponent implements OnInit {

  constructor(private Formbuilder: FormBuilder, private http: Http, private router: Router, private getdata: DatatransferService,
    private makeapi: WebserviceService, private AuthGuard: AuthGuard, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.cluster1()
    this.router.navigateByUrl("dashboard/main-dashboard/subcluster-dashboard")
  }
  cluster1() {
    $(document).ready(function () {
      $("#cluster1").addClass("Tabcluster");
    });
    $("#cluster2").removeClass("Tabcluster");
    $("#cluster3").removeClass("Tabcluster");
  }
  cluster2() {
    $(document).ready(function () {
      $("#cluster2").addClass("Tabcluster");
    });
    $("#cluster1").removeClass("Tabcluster");
    $("#cluster3").removeClass("Tabcluster");
  }
  cluster3() {
    $(document).ready(function () {
      $("#cluster3").addClass("Tabcluster");
    });
    $("#cluster2").removeClass("Tabcluster");
    $("#cluster1").removeClass("Tabcluster");
  }
}

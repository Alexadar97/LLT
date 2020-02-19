import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, BrowserXhr } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { WebserviceService } from './webservice.service';
import { DatatransferService } from './datatransfer.service';
import { AuthGuard } from './canactivate.service';



import { ModalModule } from 'ngx-modialog';
import { HttpClientModule }    from '@angular/common/http';

import { HighchartsChartModule } from 'highcharts-angular';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerModule } from 'ngx-spinner';
import {NgxPaginationModule} from 'ngx-pagination';
import {TabModule} from 'angular-tabs-component';
import {ChartModule,HIGHCHARTS_MODULES} from 'angular-highcharts';
import * as more from 'highcharts/highcharts-more.src';
import * as exporting from 'highcharts/modules/exporting.src';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './dashboard/login/login.component';
import { AdminPageComponent } from './dashboard/admin-page/admin-page.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { FinalComponent } from './dashboard/final/final.component';
import { FinalAdminComponent } from './dashboard/final-admin/final-admin.component';
import { MainDashboardComponent } from './dashboard/main-dashboard/main-dashboard.component';
import { MasterComponent } from './dashboard/master/master.component';
import { OpsComponent } from './dashboard/ops/ops.component';
import { OpseditComponent } from './dashboard/opsedit/opsedit.component';
import { PendingErrorLogListComponent } from './dashboard/pending-error-log-list/pending-error-log-list.component';
import { PpeditComponent } from './dashboard/ppedit/ppedit.component';
import { PpsComponent } from './dashboard/pps/pps.component';
import { ReportPageComponent } from './dashboard/report-page/report-page.component';
import { ClusterDashboardComponent } from './dashboard/main-dashboard/cluster-dashboard/cluster-dashboard.component';
import { LogisticsDashboardComponent } from './dashboard/main-dashboard/logistics-dashboard/logistics-dashboard.component';
import { SubclusterDashboardComponent } from './dashboard/main-dashboard/subcluster-dashboard/subcluster-dashboard.component';
import { MasterClusterComponent } from './dashboard/master/master-cluster/master-cluster.component';
import { MasterDepartmentComponent } from './dashboard/master/master-department/master-department.component';
import { MasterFinalResponsibilityComponent } from './dashboard/master/master-final-responsibility/master-final-responsibility.component';
import { MasterSubClusterComponent } from './dashboard/master/master-sub-cluster/master-sub-cluster.component';
import { UserManagerComponent } from './dashboard/master/user-manager/user-manager.component';
import { FinalusereditComponent } from './dashboard/finaluseredit/finaluseredit.component';
import { HomeComponent } from './dashboard/home/home.component';
import { SpinnerComponent } from './dashboard/spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    AdminPageComponent,
    FinalComponent,
    FinalAdminComponent,
    MainDashboardComponent,
    MasterComponent,
    OpsComponent,
    OpseditComponent,
    PendingErrorLogListComponent,
    PpeditComponent,
    PpsComponent,
    ReportPageComponent,
    ClusterDashboardComponent,
    LogisticsDashboardComponent,
    SubclusterDashboardComponent,
    MasterClusterComponent,
    MasterDepartmentComponent,
    MasterFinalResponsibilityComponent,
    MasterSubClusterComponent,
    UserManagerComponent,
    FinalusereditComponent,
    HomeComponent,
    SpinnerComponent

  ],
  imports: [
    BsDatepickerModule.forRoot(),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    AppRoutingModule,
    CommonModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule,

    ModalModule.forRoot(),
    HttpClientModule,
    HighchartsChartModule,
    NgxSpinnerModule,
    TabModule,
    ChartModule
  ],
  providers: [
    WebserviceService,
    AuthGuard,
    DatatransferService,
    { provide: HIGHCHARTS_MODULES, useFactory: () => [ more, exporting ] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

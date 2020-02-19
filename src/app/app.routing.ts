import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './dashboard/login/login.component';
import { AdminPageComponent } from './dashboard/admin-page/admin-page.component';
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
import { FinalusereditComponent } from './dashboard/finaluseredit/finaluseredit.component';
import { HomeComponent } from './dashboard/home/home.component';
import { MasterSubClusterComponent } from './dashboard/master/master-sub-cluster/master-sub-cluster.component';
import { UserManagerComponent } from './dashboard/master/user-manager/user-manager.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: "login"},
  {path: 'login', component: LoginComponent},
  {
    path: 'dashboard', component: DashboardComponent,
  children:[
    { path: 'tracker', component: AdminPageComponent},
    { path: '', redirectTo: 'subcluster-dashboard', pathMatch: 'full' },
      { path: 'pps', component: HomeComponent },
      { path: 'pps-add', component: PpsComponent },
      { path: 'ops', component: OpsComponent },
      { path: 'final', component: FinalComponent },
      { path: 'opsedit', component: OpseditComponent },
      { path: 'ppsedit', component: PpeditComponent },
      { path: 'admin-update', component: FinalAdminComponent },
      { path: 'finaluseredit', component: FinalusereditComponent },
      { path: 'tracker', component: AdminPageComponent},
      { path: 'report', component: ReportPageComponent},
      { path: 'Pending-Error-List', component: PendingErrorLogListComponent},
    { path: 'main-dashboard', component: MainDashboardComponent,
    children:[
      { path: '', redirectTo: 'subcluster-dashboard', pathMatch: 'full' },
    { path: 'cluster-dashboard', component: ClusterDashboardComponent},
    { path: 'subcluster-dashboard', component: SubclusterDashboardComponent},
    { path: 'logistics-dashboard', component: LogisticsDashboardComponent},
    ]
},
{ path: 'master', component: MasterComponent,
      children:[
        { path: '', redirectTo: 'cluster', pathMatch: 'full' },
        { path: 'cluster', component: MasterClusterComponent},
        { path: 'sub-cluster', component: MasterSubClusterComponent},
        { path: 'department', component: MasterDepartmentComponent},
        { path: 'user-manager', component: UserManagerComponent},
        // { path: 'department', component: MasterFinalResponsibilityComponent},
      ]
    },
  ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule { }

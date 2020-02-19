import { Component, OnInit, ViewChild } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { HttpModule } from '@angular/http';
import { DatatransferService } from '../../../datatransfer.service'
import { WebserviceService } from '../../../webservice.service'
import { AuthGuard } from '../../../canactivate.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Chart } from 'angular-highcharts';

declare var $, moment;

@Component({
  selector: 'app-subcluster-dashboard',
  templateUrl: './subcluster-dashboard.component.html',
  styleUrls: ['./subcluster-dashboard.component.css']
})
export class SubclusterDashboardComponent implements OnInit {

  private getSubClusterDataAPI = this.getdata.appconstant + 'dashboard/getSubClusterData';
  private nameModelListAPI = this.getdata.appconstant + 'dashboard/nameModelList';
  loading = false
  constructor(private Formbuilder: FormBuilder, private http: Http, private router: Router, private getdata: DatatransferService,
    private makeapi: WebserviceService, private AuthGuard: AuthGuard, private route: ActivatedRoute) { }

  ngOnInit() {
    var year = new Date().getFullYear();
    $("#year").val(year)
    this.clusterList(year)
    this.dashboardName()
  }
  supplierconstraint: any
  partqualityissue: any
  logisticsprocessgap: any
  assemblyprocesslosses: any
  absenteeism: any
  equipmentissues: any
  manufacturingprocessgaps: any
  ckdtrimexecutionprocess: any
  cstrimexecutionprocess: any
  itrelatedlosses: any
  bomdesignissues: any
  newprojectsVairants: any
  busrelatedlosses: any
  reasonunderanalysis: any
  htdcount1:any;mdtcount1:any;totlacount1:any
  htdcount2:any;mdtcount2:any;totlacount2:any
  htdcount3:any;mdtcount3:any;totlacount3:any
  htdcount4:any;mdtcount4:any;totlacount4:any
  htdcount5:any;mdtcount5:any;totlacount5:any
  htdcount6:any;mdtcount6:any;totlacount6:any
  htdcount7:any;mdtcount7:any;totlacount7:any
  htdcount8:any;mdtcount8:any;totlacount8:any
  htdcount9:any;mdtcount9:any;totlacount9:any
  htdcount10:any;mdtcount10:any;totlacount10:any
  htdcount11:any;mdtcount11:any;totlacount11:any
  htdcount12:any;mdtcount12:any;totlacount12:any
  htdcount13:any;mdtcount13:any;totlacount13:any
  htdcount14:any;mdtcount14:any;totlacount14:any
  clusterList(value) {
    this.loading = true
    return this.makeapi.method(this.getSubClusterDataAPI + "?" + "year=" + value, "", "get")
      .subscribe(data => {
        this.loading = false
        this.supplierconstraint = data.supplierconstraint;
        this.htdcount1 = this.supplierconstraint.hdtTotal
        this.mdtcount1 = this.supplierconstraint.mdtTotal
        this.totlacount1 = this.supplierconstraint.ydtTotal


        this.partqualityissue = data.partqualityissue;
        this.htdcount2 = this.partqualityissue.hdtTotal
        this.mdtcount2 = this.partqualityissue.mdtTotal
        this.totlacount2 = this.partqualityissue.ydtTotal


        this.logisticsprocessgap = data.logisticsprocessgap;
        this.htdcount3 = this.logisticsprocessgap.hdtTotal
        this.mdtcount3 = this.logisticsprocessgap.mdtTotal
        this.totlacount3 = this.logisticsprocessgap.ydtTotal

        this.assemblyprocesslosses = data.assemblyprocesslosses;
        this.htdcount4 = this.assemblyprocesslosses.hdtTotal
        this.mdtcount4 = this.assemblyprocesslosses.mdtTotal
        this.totlacount4 = this.assemblyprocesslosses.ydtTotal

        this.absenteeism = data.absenteeism;
        this.htdcount5 = this.absenteeism.hdtTotal
        this.mdtcount5 = this.absenteeism.mdtTotal
        this.totlacount5 = this.absenteeism.ydtTotal

        this.equipmentissues = data.equipmentissues;
        this.htdcount6 = this.equipmentissues.hdtTotal
        this.mdtcount6 = this.equipmentissues.mdtTotal
        this.totlacount6 = this.equipmentissues.ydtTotal

        this.manufacturingprocessgaps = data.manufacturingprocessgaps;
        this.htdcount7 = this.manufacturingprocessgaps.hdtTotal
        this.mdtcount7 = this.manufacturingprocessgaps.mdtTotal
        this.totlacount7 = this.manufacturingprocessgaps.ydtTotal

        this.ckdtrimexecutionprocess = data.ckdtrimexecutionprocess;
        this.htdcount8 = this.ckdtrimexecutionprocess.hdtTotal
        this.mdtcount8 = this.ckdtrimexecutionprocess.mdtTotal
        this.totlacount8 = this.ckdtrimexecutionprocess.ydtTotal

        this.cstrimexecutionprocess = data.cstrimexecutionprocess;
        this.htdcount9 = this.cstrimexecutionprocess.hdtTotal
        this.mdtcount9 = this.cstrimexecutionprocess.mdtTotal
        this.totlacount9 = this.cstrimexecutionprocess.ydtTotal

        this.itrelatedlosses = data.itrelatedlosses;
        this.htdcount10 = this.itrelatedlosses.hdtTotal
        this.mdtcount10 = this.itrelatedlosses.mdtTotal
        this.totlacount10 = this.itrelatedlosses.ydtTotal

        this.bomdesignissues = data.bomdesignissues;
        this.htdcount11 = this.bomdesignissues.hdtTotal
        this.mdtcount11 = this.bomdesignissues.mdtTotal
        this.totlacount11 = this.bomdesignissues.ydtTotal

        this.newprojectsVairants = data.newprojectsVairants;
        this.htdcount12 = this.newprojectsVairants.hdtTotal
        this.mdtcount12 = this.newprojectsVairants.mdtTotal
        this.totlacount12 = this.newprojectsVairants.ydtTotal

        this.busrelatedlosses = data.busrelatedlosses;
        this.htdcount13 = this.busrelatedlosses.hdtTotal
        this.mdtcount13 = this.busrelatedlosses.mdtTotal
        this.totlacount13 = this.busrelatedlosses.ydtTotal

        this.reasonunderanalysis = data.reasonunderanalysis;
        this.htdcount14 = this.reasonunderanalysis.hdtTotal
        this.mdtcount14 = this.reasonunderanalysis.mdtTotal
        this.totlacount14 = this.reasonunderanalysis.ydtTotal


        this.CharSubCluster1()
      },
        Error => {

        })
  }
  Name1
  Name2
  Name3
  Name4
  Name5
  Name6
  Name7
  Name8
  Name9
  Name10
  Name11
  Name12
  Name13
  Name14
  dashboardName(){
    this.loading = true
    return this.makeapi.method(this.nameModelListAPI,"","post")
    .subscribe(data=>{
      this.loading = false
        this.Name1 = data[8].name
        this.Name2 = data[9].name
        this.Name3 = data[10].name
        this.Name4 = data[11].name
        this.Name5 = data[12].name
        this.Name6 = data[13].name
        this.Name7 = data[14].name
        this.Name8 = data[15].name
        this.Name9 = data[16].name
        this.Name10 = data[17].name
        this.Name11 = data[18].name
        this.Name12 = data[19].name
        this.Name13 = data[20].name
        this.Name14 = data[21].name
    },
    Error=>{

    })
  }
  scm1: any
  scm2: any
  scm3: any
  max;
  CharSubCluster1() {
    // var inputArr = [Number(this.supplierconstraint.Jan), Number(this.supplierconstraint.Feb), Number(this.supplierconstraint.Mar), Number(this.supplierconstraint.Apr), Number(this.supplierconstraint.May), Number(this.supplierconstraint.Jun), Number(this.supplierconstraint.Jul), Number(this.supplierconstraint.Aug), Number(this.supplierconstraint.Sep), Number(this.supplierconstraint.Oct), Number(this.supplierconstraint.Nov), Number(this.supplierconstraint.Dec)];
    // this.max = inputArr.reduce((a, b) => Math.max(a, b));
    this.scm1 = new Chart({
      chart: {
        type: 'column',
         height: 250,

        backgroundColor:"rgb(245, 242, 242)"
      },
      title: {
        text: 'IPL'
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apl', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      yAxis: {
        tickInterval: 100,
        min: 0,
        max: this.max,
        title: {
          text: ""
        },
        stackLabels: {
          enabled: true,
          style: {
            fontWeight: 'bold',
          }
        }
      },
      legend: {
        align: 'right',
        x: -30,
        verticalAlign: 'top',
        y: 25,
        floating: true,
      },

      tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: true
          }
        },
        pie: {
          innerSize: '170%'
        }
      },
      series: [
        {
          type: 'column',
          name: 'HDT:',
          data: [Number(this.supplierconstraint.Jan), Number(this.supplierconstraint.Feb), Number(this.supplierconstraint.Mar), Number(this.supplierconstraint.Apr), Number(this.supplierconstraint.May), Number(this.supplierconstraint.Jun), Number(this.supplierconstraint.Jul), Number(this.supplierconstraint.Aug), Number(this.supplierconstraint.Sep), Number(this.supplierconstraint.Oct), Number(this.supplierconstraint.Nov), Number(this.supplierconstraint.Dec)],
          color: "#999a9e"
        },
        {
          type: 'column',
          name: 'MDT:',
          data: [Number(this.supplierconstraint.mdtJan), Number(this.supplierconstraint.mdtFeb), Number(this.supplierconstraint.mdtMar), Number(this.supplierconstraint.mdtApr),
          Number(this.supplierconstraint.mdtMay), Number(this.supplierconstraint.mdtJun), Number(this.supplierconstraint.mdtJul), Number(this.supplierconstraint.mdtAug),
          Number(this.supplierconstraint.mdtSep), Number(this.supplierconstraint.mdtOct), Number(this.supplierconstraint.mdtNov), Number(this.supplierconstraint.mdtDec)],
          color: "#005176"
        }
      ]
    });
    this.CharSubCluster2()
  }
  CharSubCluster2() {
    // var inputArr = [Number(this.partqualityissue.Jan), Number(this.partqualityissue.Feb), Number(this.partqualityissue.Mar), Number(this.partqualityissue.Apr), Number(this.partqualityissue.May), Number(this.partqualityissue.Jun), Number(this.partqualityissue.Jul), Number(this.partqualityissue.Aug), Number(this.partqualityissue.Sep), Number(this.partqualityissue.Oct), Number(this.partqualityissue.Nov), Number(this.partqualityissue.Dec)];
    // this.max = inputArr.reduce((a, b) => Math.max(a, b));
    this.scm2 = new Chart({
      chart: {
        type: 'column',
         height: 250,

        backgroundColor:"rgb(245, 242, 242)"
      },
      title: {
        text: 'IPL'
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apl', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      yAxis: {
        tickInterval: 100,
        min: 0,
        max: this.max,
        title: {
          text: ""
        },
        stackLabels: {
          enabled: true,
          style: {
            fontWeight: 'bold',
          }
        }
      },
      legend: {
        align: 'right',
        x: -30,
        verticalAlign: 'top',
        y: 25,
        floating: true,
      },

      tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: true
          }
        },
        pie: {
          innerSize: '170%'
        }
      },
      series: [
        {
          type: 'column',
          name: 'HDT:',
          data: [Number(this.partqualityissue.Jan), Number(this.partqualityissue.Feb), Number(this.partqualityissue.Mar), Number(this.partqualityissue.Apr), Number(this.partqualityissue.May), Number(this.partqualityissue.Jun), Number(this.partqualityissue.Jul), Number(this.partqualityissue.Aug), Number(this.partqualityissue.Sep), Number(this.partqualityissue.Oct), Number(this.partqualityissue.Nov), Number(this.partqualityissue.Dec)],
          color: "#999a9e"
        },
        {
          type: 'column',
          name: 'MDT:',
          data: [Number(this.partqualityissue.mdtJan), Number(this.partqualityissue.mdtFeb), Number(this.partqualityissue.mdtMar),
            Number(this.partqualityissue.mdtApr),Number(this.partqualityissue.mdtMay), Number(this.partqualityissue.mdtJun),
            Number(this.partqualityissue.mdtJul), Number(this.partqualityissue.mdtAug),Number(this.partqualityissue.mdtSep),
             Number(this.partqualityissue.mdtOct), Number(this.partqualityissue.mdtNov), Number(this.partqualityissue.mdtDec)],
          color: "#005176"
        }
      ]
    });
    this.CharSubCluster3()
  }
  CharSubCluster3() {
    // var inputArr = [Number(this.logisticsprocessgap.Jan), Number(this.logisticsprocessgap.Feb), Number(this.logisticsprocessgap.Mar), Number(this.logisticsprocessgap.Apr), Number(this.logisticsprocessgap.May), Number(this.logisticsprocessgap.Jun), Number(this.logisticsprocessgap.Jul), Number(this.logisticsprocessgap.Aug), Number(this.logisticsprocessgap.Sep), Number(this.logisticsprocessgap.Oct), Number(this.logisticsprocessgap.Nov), Number(this.logisticsprocessgap.Dec)];
    // this.max = inputArr.reduce((a, b) => Math.max(a, b));
    this.scm3 = new Chart({
      chart: {
        type: 'column',
         height: 250,

        backgroundColor:"rgb(245, 242, 242)"
      },
      title: {
        text: 'IPL'
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apl', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      yAxis: {
        tickInterval: 100,
        min: 0,
        max: this.max,
        title: {
          text: ""
        },
        stackLabels: {
          enabled: true,
          style: {
            fontWeight: 'bold',
          }
        }
      },
      legend: {
        align: 'right',
        x: -30,
        verticalAlign: 'top',
        y: 25,
        floating: true,
      },

      tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: true
          }
        },
        pie: {
          innerSize: '170%'
        }
      },
      series: [
        {
          type: 'column',
          name: 'HDT:',
          data: [Number(this.logisticsprocessgap.Jan), Number(this.logisticsprocessgap.Feb), Number(this.logisticsprocessgap.Mar), Number(this.logisticsprocessgap.Apr), Number(this.logisticsprocessgap.May), Number(this.logisticsprocessgap.Jun), Number(this.logisticsprocessgap.Jul), Number(this.logisticsprocessgap.Aug), Number(this.logisticsprocessgap.Sep), Number(this.logisticsprocessgap.Oct), Number(this.logisticsprocessgap.Nov), Number(this.logisticsprocessgap.Dec)],
          color: "#999a9e"
        },
        {
          type: 'column',
          name: 'MDT:',
          data: [Number(this.logisticsprocessgap.mdtJan), Number(this.logisticsprocessgap.mdtFeb), Number(this.logisticsprocessgap.mdtMar),
            Number(this.logisticsprocessgap.mdtApr),Number(this.logisticsprocessgap.mdtMay), Number(this.logisticsprocessgap.mdtJun),
            Number(this.logisticsprocessgap.mdtJul), Number(this.logisticsprocessgap.mdtAug),Number(this.logisticsprocessgap.mdtSep),
             Number(this.logisticsprocessgap.mdtOct), Number(this.logisticsprocessgap.mdtNov), Number(this.logisticsprocessgap.mdtDec)],
          color: "#005176"
        }
      ]
    });
    this.CharOperations1()
  }


  // Operations
  operation1: any
  operation2: any
  operation3: any
  operation4: any
  CharOperations1() {
    // var inputArr = [Number(this.assemblyprocesslosses.Jan), Number(this.assemblyprocesslosses.Feb), Number(this.assemblyprocesslosses.Mar), Number(this.assemblyprocesslosses.Apr), Number(this.assemblyprocesslosses.May), Number(this.assemblyprocesslosses.Jun), Number(this.assemblyprocesslosses.Jul), Number(this.assemblyprocesslosses.Aug), Number(this.assemblyprocesslosses.Sep), Number(this.assemblyprocesslosses.Oct), Number(this.assemblyprocesslosses.Nov), Number(this.assemblyprocesslosses.Dec)];
    // this.max = inputArr.reduce((a, b) => Math.max(a, b));
    this.operation1 = new Chart({
      chart: {
        type: 'column',
         height: 250,

        backgroundColor:"rgb(245, 242, 242)"
      },
      title: {
        text: 'IPL'
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apl', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      yAxis: {
        tickInterval: 100,
        min: 0,
        max: this.max,
        title: {
          text: ""
        },
        stackLabels: {
          enabled: true,
          style: {
            fontWeight: 'bold',
          }
        }
      },
      legend: {
        align: 'right',
        x: -30,
        verticalAlign: 'top',
        y: 25,
        floating: true,
      },

      tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: true
          }
        },
        pie: {
          innerSize: '170%'
        }
      },
      series: [
        {
          type: 'column',
          name: 'HDT:',
          data: [Number(this.assemblyprocesslosses.Jan), Number(this.assemblyprocesslosses.Feb), Number(this.assemblyprocesslosses.Mar), Number(this.assemblyprocesslosses.Apr), Number(this.assemblyprocesslosses.May), Number(this.assemblyprocesslosses.Jun), Number(this.assemblyprocesslosses.Jul), Number(this.assemblyprocesslosses.Aug), Number(this.assemblyprocesslosses.Sep), Number(this.assemblyprocesslosses.Oct), Number(this.assemblyprocesslosses.Nov), Number(this.assemblyprocesslosses.Dec)],
          color: "#999a9e"
        },
        {
          type: 'column',
          name: 'MDT:',
          data: [Number(this.assemblyprocesslosses.mdtJan), Number(this.assemblyprocesslosses.mdtFeb), Number(this.assemblyprocesslosses.mdtMar),
            Number(this.assemblyprocesslosses.mdtApr),Number(this.assemblyprocesslosses.mdtMay), Number(this.assemblyprocesslosses.mdtJun),
            Number(this.assemblyprocesslosses.mdtJul), Number(this.assemblyprocesslosses.mdtAug),Number(this.assemblyprocesslosses.mdtSep),
             Number(this.assemblyprocesslosses.mdtOct), Number(this.assemblyprocesslosses.mdtNov), Number(this.assemblyprocesslosses.mdtDec)],
          color: "#005176"
        }
      ]
    });
    this.CharOperations2()
  }
  CharOperations2() {
    // var inputArr = [Number(this.absenteeism.Jan), Number(this.absenteeism.Feb), Number(this.absenteeism.Mar), Number(this.absenteeism.Apr), Number(this.absenteeism.May), Number(this.absenteeism.Jun), Number(this.absenteeism.Jul), Number(this.absenteeism.Aug), Number(this.absenteeism.Sep), Number(this.absenteeism.Oct), Number(this.absenteeism.Nov), Number(this.absenteeism.Dec)];
    // this.max = inputArr.reduce((a, b) => Math.max(a, b));
    this.operation2 = new Chart({
      chart: {
        type: 'column',
         height: 250,

        backgroundColor:"rgb(245, 242, 242)"
      },
      title: {
        text: 'IPL'
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apl', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      yAxis: {
        tickInterval: 100,
        min: 0,
        max: this.max,
        title: {
          text: ""
        },
        stackLabels: {
          enabled: true,
          style: {
            fontWeight: 'bold',
          }
        }
      },
      legend: {
        align: 'right',
        x: -30,
        verticalAlign: 'top',
        y: 25,
        floating: true,
      },

      tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: true
          }
        },
        pie: {
          innerSize: '170%'
        }
      },
      series: [
        {
          type: 'column',
          name: 'HDT:',
          data:  [Number(this.absenteeism.Jan), Number(this.absenteeism.Feb), Number(this.absenteeism.Mar), Number(this.absenteeism.Apr), Number(this.absenteeism.May), Number(this.absenteeism.Jun), Number(this.absenteeism.Jul), Number(this.absenteeism.Aug), Number(this.absenteeism.Sep), Number(this.absenteeism.Oct), Number(this.absenteeism.Nov), Number(this.absenteeism.Dec)],
          color: "#999a9e"
        },
        {
          type: 'column',
          name: 'MDT:',
          data: [Number(this.absenteeism.mdtJan), Number(this.absenteeism.mdtFeb), Number(this.absenteeism.mdtMar),
            Number(this.absenteeism.mdtApr),Number(this.absenteeism.mdtMay), Number(this.absenteeism.mdtJun),
            Number(this.absenteeism.mdtJul), Number(this.absenteeism.mdtAug),Number(this.absenteeism.mdtSep),
             Number(this.absenteeism.mdtOct), Number(this.absenteeism.mdtNov), Number(this.absenteeism.mdtDec)],
          color: "#005176"
        }
      ]
    });
    this.CharOperations3()
  }
  CharOperations3() {
    // var inputArr = [Number(this.equipmentissues.Jan), Number(this.equipmentissues.Feb), Number(this.equipmentissues.Mar), Number(this.equipmentissues.Apr), Number(this.equipmentissues.May), Number(this.equipmentissues.Jun), Number(this.equipmentissues.Jul), Number(this.equipmentissues.Aug), Number(this.equipmentissues.Sep), Number(this.equipmentissues.Oct), Number(this.equipmentissues.Nov), Number(this.equipmentissues.Dec)];
    // this.max = inputArr.reduce((a, b) => Math.max(a, b));
    this.operation3 = new Chart({
      chart: {
        type: 'column',
         height: 250,

        backgroundColor:"rgb(245, 242, 242)"
      },
      title: {
        text: 'IPL'
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apl', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      yAxis: {
        tickInterval: 100,
        min: 0,
        max: this.max,
        title: {
          text: ""
        },
        stackLabels: {
          enabled: true,
          style: {
            fontWeight: 'bold',
          }
        }
      },
      legend: {
        align: 'right',
        x: -30,
        verticalAlign: 'top',
        y: 25,
        floating: true,
      },

      tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: true
          }
        },
        pie: {
          innerSize: '170%'
        }
      },
      series: [
        {
          type: 'column',
          name: 'HDT:',
          data: [Number(this.equipmentissues.Jan), Number(this.equipmentissues.Feb), Number(this.equipmentissues.Mar), Number(this.equipmentissues.Apr), Number(this.equipmentissues.May), Number(this.equipmentissues.Jun), Number(this.equipmentissues.Jul), Number(this.equipmentissues.Aug), Number(this.equipmentissues.Sep), Number(this.equipmentissues.Oct), Number(this.equipmentissues.Nov), Number(this.equipmentissues.Dec)],
          color: "#999a9e"
        },
        {
          type: 'column',
          name: 'MDT:',
          data: [Number(this.equipmentissues.mdtJan), Number(this.equipmentissues.mdtFeb), Number(this.equipmentissues.mdtMar),
            Number(this.equipmentissues.mdtApr),Number(this.equipmentissues.mdtMay), Number(this.equipmentissues.mdtJun),
            Number(this.equipmentissues.mdtJul), Number(this.equipmentissues.mdtAug),Number(this.equipmentissues.mdtSep),
             Number(this.equipmentissues.mdtOct), Number(this.equipmentissues.mdtNov), Number(this.equipmentissues.mdtDec)],
          color: "#005176"
        }
      ]
    });
    this.CharOperations4()
  }
  CharOperations4() {
    // var inputArr = [Number(this.manufacturingprocessgaps.Jan), Number(this.manufacturingprocessgaps.Feb), Number(this.manufacturingprocessgaps.Mar), Number(this.manufacturingprocessgaps.Apr), Number(this.manufacturingprocessgaps.May), Number(this.manufacturingprocessgaps.Jun), Number(this.manufacturingprocessgaps.Jul), Number(this.manufacturingprocessgaps.Aug), Number(this.manufacturingprocessgaps.Sep), Number(this.manufacturingprocessgaps.Oct), Number(this.manufacturingprocessgaps.Nov), Number(this.manufacturingprocessgaps.Dec)];
    // this.max = inputArr.reduce((a, b) => Math.max(a, b));
    this.operation4 = new Chart({
      chart: {
        type: 'column',
         height: 250,

        backgroundColor:"rgb(245, 242, 242)"
      },
      title: {
        text: 'IPL'
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apl', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      yAxis: {
        tickInterval: 100,
        min: 0,
        max: this.max,
        title: {
          text: ""
        },
        stackLabels: {
          enabled: true,
          style: {
            fontWeight: 'bold',
          }
        }
      },
      legend: {
        align: 'right',
        x: -30,
        verticalAlign: 'top',
        y: 25,
        floating: true,
      },

      tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: true
          }
        },
        pie: {
          innerSize: '170%'
        }
      },
      series: [
        {
          type: 'column',
          name: 'HDT:',
          data: [Number(this.manufacturingprocessgaps.Jan), Number(this.manufacturingprocessgaps.Feb), Number(this.manufacturingprocessgaps.Mar), Number(this.manufacturingprocessgaps.Apr), Number(this.manufacturingprocessgaps.May), Number(this.manufacturingprocessgaps.Jun), Number(this.manufacturingprocessgaps.Jul), Number(this.manufacturingprocessgaps.Aug), Number(this.manufacturingprocessgaps.Sep), Number(this.manufacturingprocessgaps.Oct), Number(this.manufacturingprocessgaps.Nov), Number(this.manufacturingprocessgaps.Dec)],
          color: "#999a9e"
        },
        {
          type: 'column',
          name: 'MDT:',
          data: [Number(this.manufacturingprocessgaps.mdtJan), Number(this.manufacturingprocessgaps.mdtFeb), Number(this.manufacturingprocessgaps.mdtMar),
            Number(this.manufacturingprocessgaps.mdtApr),Number(this.manufacturingprocessgaps.mdtMay), Number(this.manufacturingprocessgaps.mdtJun),
            Number(this.manufacturingprocessgaps.mdtJul), Number(this.manufacturingprocessgaps.mdtAug),Number(this.manufacturingprocessgaps.mdtSep),
             Number(this.manufacturingprocessgaps.mdtOct), Number(this.manufacturingprocessgaps.mdtNov), Number(this.manufacturingprocessgaps.mdtDec)],
          color: "#005176"
        }
      ]
    });
    this.CharCabtrim1()
  }
  Cabtrim1: any
  Cabtrim2: any
  CharCabtrim1() {
    // var inputArr = [Number(this.ckdtrimexecutionprocess.Jan), Number(this.ckdtrimexecutionprocess.Feb), Number(this.ckdtrimexecutionprocess.Mar), Number(this.ckdtrimexecutionprocess.Apr), Number(this.ckdtrimexecutionprocess.May), Number(this.ckdtrimexecutionprocess.Jun), Number(this.ckdtrimexecutionprocess.Jul), Number(this.ckdtrimexecutionprocess.Aug), Number(this.ckdtrimexecutionprocess.Sep), Number(this.ckdtrimexecutionprocess.Oct), Number(this.ckdtrimexecutionprocess.Nov), Number(this.ckdtrimexecutionprocess.Dec)];
    // this.max = inputArr.reduce((a, b) => Math.max(a, b));
    this.Cabtrim1 = new Chart({
      chart: {
        type: 'column',
         height: 250,

        backgroundColor:"rgb(245, 242, 242)"
      },
      title: {
        text: 'IPL'
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apl', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      yAxis: {
        tickInterval: 100,
        min: 0,
        max: this.max,
        title: {
          text: ""
        },
        stackLabels: {
          enabled: true,
          style: {
            fontWeight: 'bold',
          }
        }
      },
      legend: {
        align: 'right',
        x: -30,
        verticalAlign: 'top',
        y: 25,
        floating: true,
      },

      tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: true
          }
        },
        pie: {
          innerSize: '170%'
        }
      },
      series: [
        {
          type: 'column',
          name: 'HDT:',
          data: [Number(this.ckdtrimexecutionprocess.Jan), Number(this.ckdtrimexecutionprocess.Feb), Number(this.ckdtrimexecutionprocess.Mar), Number(this.ckdtrimexecutionprocess.Apr), Number(this.ckdtrimexecutionprocess.May), Number(this.ckdtrimexecutionprocess.Jun), Number(this.ckdtrimexecutionprocess.Jul), Number(this.ckdtrimexecutionprocess.Aug), Number(this.ckdtrimexecutionprocess.Sep), Number(this.ckdtrimexecutionprocess.Oct), Number(this.ckdtrimexecutionprocess.Nov), Number(this.ckdtrimexecutionprocess.Dec)],
          color: "#999a9e"
        },
        {
          type: 'column',
          name: 'MDT:',
          data: [Number(this.ckdtrimexecutionprocess.mdtJan), Number(this.ckdtrimexecutionprocess.mdtFeb), Number(this.ckdtrimexecutionprocess.mdtMar),
            Number(this.ckdtrimexecutionprocess.mdtApr),Number(this.ckdtrimexecutionprocess.mdtMay), Number(this.ckdtrimexecutionprocess.mdtJun),
            Number(this.ckdtrimexecutionprocess.mdtJul), Number(this.ckdtrimexecutionprocess.mdtAug),Number(this.ckdtrimexecutionprocess.mdtSep),
             Number(this.ckdtrimexecutionprocess.mdtOct), Number(this.ckdtrimexecutionprocess.mdtNov), Number(this.ckdtrimexecutionprocess.mdtDec)],
          color: "#005176"
        }
      ]
    });

    this.CharCabtrim2()
  }
  CharCabtrim2() {
    // var inputArr = [Number(this.cstrimexecutionprocess.Jan), Number(this.cstrimexecutionprocess.Feb), Number(this.cstrimexecutionprocess.Mar), Number(this.cstrimexecutionprocess.Apr), Number(this.cstrimexecutionprocess.May), Number(this.cstrimexecutionprocess.Jun), Number(this.cstrimexecutionprocess.Jul), Number(this.cstrimexecutionprocess.Aug), Number(this.cstrimexecutionprocess.Sep), Number(this.cstrimexecutionprocess.Oct), Number(this.cstrimexecutionprocess.Nov), Number(this.cstrimexecutionprocess.Dec)];
    // this.max = inputArr.reduce((a, b) => Math.max(a, b));
    this.Cabtrim2 = new Chart({
      chart: {
        type: 'column',
         height: 250,

        backgroundColor:"rgb(245, 242, 242)"
      },
      title: {
        text: 'IPL'
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apl', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      yAxis: {
        tickInterval: 100,
        min: 0,
        max: this.max,
        title: {
          text: ""
        },
        stackLabels: {
          enabled: true,
          style: {
            fontWeight: 'bold',
          }
        }
      },
      legend: {
        align: 'right',
        x: -30,
        verticalAlign: 'top',
        y: 25,
        floating: true,
      },

      tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: true
          }
        },
        pie: {
          innerSize: '170%'
        }
      },
      series: [
        {
          type: 'column',
          name: 'HDT:',
          data: [Number(this.cstrimexecutionprocess.Jan), Number(this.cstrimexecutionprocess.Feb), Number(this.cstrimexecutionprocess.Mar), Number(this.cstrimexecutionprocess.Apr), Number(this.cstrimexecutionprocess.May), Number(this.cstrimexecutionprocess.Jun), Number(this.cstrimexecutionprocess.Jul), Number(this.cstrimexecutionprocess.Aug), Number(this.cstrimexecutionprocess.Sep), Number(this.cstrimexecutionprocess.Oct), Number(this.cstrimexecutionprocess.Nov), Number(this.cstrimexecutionprocess.Dec)],
          color: "#999a9e"
        },
        {
          type: 'column',
          name: 'MDT:',
          data: [Number(this.cstrimexecutionprocess.mdtJan), Number(this.cstrimexecutionprocess.mdtFeb), Number(this.cstrimexecutionprocess.mdtMar),
            Number(this.cstrimexecutionprocess.mdtApr),Number(this.cstrimexecutionprocess.mdtMay), Number(this.cstrimexecutionprocess.mdtJun),
            Number(this.cstrimexecutionprocess.mdtJul), Number(this.cstrimexecutionprocess.mdtAug),Number(this.cstrimexecutionprocess.mdtSep),
             Number(this.cstrimexecutionprocess.mdtOct), Number(this.cstrimexecutionprocess.mdtNov), Number(this.cstrimexecutionprocess.mdtDec)],
          color: "#005176"
        }
      ]
    });
    this.CharOthers1()
  }

  // Others
  Others1: any
  Others2: any
  Others3: any
  Others4: any
  Others5: any
  CharOthers1() {
    // var inputArr = [Number(this.itrelatedlosses.Jan), Number(this.itrelatedlosses.Feb), Number(this.itrelatedlosses.Mar), Number(this.itrelatedlosses.Apr), Number(this.itrelatedlosses.May), Number(this.itrelatedlosses.Jun), Number(this.itrelatedlosses.Jul), Number(this.itrelatedlosses.Aug), Number(this.itrelatedlosses.Sep), Number(this.itrelatedlosses.Oct), Number(this.itrelatedlosses.Nov), Number(this.itrelatedlosses.Dec)];
    // this.max = inputArr.reduce((a, b) => Math.max(a, b));
    this.Others1 = new Chart({
      chart: {
        type: 'column',
         height: 250,

        backgroundColor:"rgb(245, 242, 242)"
      },
      title: {
        text: 'IPL'
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apl', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      yAxis: {
        tickInterval: 100,
        min: 0,
        max: this.max,
        title: {
          text: ""
        },
        stackLabels: {
          enabled: true,
          style: {
            fontWeight: 'bold',
          }
        }
      },
      legend: {
        align: 'right',
        x: -30,
        verticalAlign: 'top',
        y: 25,
        floating: true,
      },

      tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: true
          }
        },
        pie: {
          innerSize: '170%'
        }
      },
      series: [
        {
          type: 'column',
          name: 'HDT:',
          data: [Number(this.itrelatedlosses.Jan), Number(this.itrelatedlosses.Feb), Number(this.itrelatedlosses.Mar), Number(this.itrelatedlosses.Apr), Number(this.itrelatedlosses.May), Number(this.itrelatedlosses.Jun), Number(this.itrelatedlosses.Jul), Number(this.itrelatedlosses.Aug), Number(this.itrelatedlosses.Sep), Number(this.itrelatedlosses.Oct), Number(this.itrelatedlosses.Nov), Number(this.itrelatedlosses.Dec)],
          color: "#999a9e"
        },
        {
          type: 'column',
          name: 'MDT:',
          data: [Number(this.itrelatedlosses.mdtJan), Number(this.itrelatedlosses.mdtFeb), Number(this.itrelatedlosses.mdtMar),
            Number(this.itrelatedlosses.mdtApr),Number(this.itrelatedlosses.mdtMay), Number(this.itrelatedlosses.mdtJun),
            Number(this.itrelatedlosses.mdtJul), Number(this.itrelatedlosses.mdtAug),Number(this.itrelatedlosses.mdtSep),
             Number(this.itrelatedlosses.mdtOct), Number(this.itrelatedlosses.mdtNov), Number(this.itrelatedlosses.mdtDec)],
          color: "#005176"
        }
      ]
    });
    this.CharOthers2()
  }
  CharOthers2() {
    // var inputArr = [Number(this.bomdesignissues.Jan), Number(this.bomdesignissues.Feb), Number(this.bomdesignissues.Mar), Number(this.bomdesignissues.Apr), Number(this.bomdesignissues.May), Number(this.bomdesignissues.Jun), Number(this.bomdesignissues.Jul), Number(this.bomdesignissues.Aug), Number(this.bomdesignissues.Sep), Number(this.bomdesignissues.Oct), Number(this.bomdesignissues.Nov), Number(this.bomdesignissues.Dec)];
    // this.max = inputArr.reduce((a, b) => Math.max(a, b));
    this.Others2 = new Chart({
      chart: {
        type: 'column',
         height: 250,

        backgroundColor:"rgb(245, 242, 242)"
      },
      title: {
        text: 'IPL'
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apl', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      yAxis: {
        tickInterval: 100,
        min: 0,
        max: this.max,
        title: {
          text: ""
        },
        stackLabels: {
          enabled: true,
          style: {
            fontWeight: 'bold',
          }
        }
      },
      legend: {
        align: 'right',
        x: -30,
        verticalAlign: 'top',
        y: 25,
        floating: true,
      },

      tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: true
          }
        },
        pie: {
          innerSize: '170%'
        }
      },
      series: [
        {
          type: 'column',
          name: 'HDT:',
          data:[Number(this.bomdesignissues.Jan), Number(this.bomdesignissues.Feb), Number(this.bomdesignissues.Mar), Number(this.bomdesignissues.Apr), Number(this.bomdesignissues.May), Number(this.bomdesignissues.Jun), Number(this.bomdesignissues.Jul), Number(this.bomdesignissues.Aug), Number(this.bomdesignissues.Sep), Number(this.bomdesignissues.Oct), Number(this.bomdesignissues.Nov), Number(this.bomdesignissues.Dec)],
          color: "#999a9e"
        },
        {
          type: 'column',
          name: 'MDT:',
          data: [Number(this.bomdesignissues.mdtJan), Number(this.bomdesignissues.mdtFeb), Number(this.bomdesignissues.mdtMar),
            Number(this.bomdesignissues.mdtApr),Number(this.bomdesignissues.mdtMay), Number(this.bomdesignissues.mdtJun),
            Number(this.bomdesignissues.mdtJul), Number(this.bomdesignissues.mdtAug),Number(this.bomdesignissues.mdtSep),
             Number(this.bomdesignissues.mdtOct), Number(this.bomdesignissues.mdtNov), Number(this.bomdesignissues.mdtDec)],
          color: "#005176"
        }
      ]
    });
    this.CharOthers3()
  }
  CharOthers3() {
    // var inputArr = [Number(this.newprojectsVairants.Jan), Number(this.newprojectsVairants.Feb), Number(this.newprojectsVairants.Mar), Number(this.newprojectsVairants.Apr), Number(this.newprojectsVairants.May), Number(this.newprojectsVairants.Jun), Number(this.newprojectsVairants.Jul), Number(this.newprojectsVairants.Aug), Number(this.newprojectsVairants.Sep), Number(this.newprojectsVairants.Oct), Number(this.newprojectsVairants.Nov), Number(this.newprojectsVairants.Dec)];
    // this.max = inputArr.reduce((a, b) => Math.max(a, b));
    this.Others3 = new Chart({
      chart: {
        type: 'column',
         height: 250,

        backgroundColor:"rgb(245, 242, 242)"
      },
      title: {
        text: 'IPL'
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apl', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      yAxis: {
        tickInterval: 100,
        min: 0,
        max: this.max,
        title: {
          text: ""
        },
        stackLabels: {
          enabled: true,
          style: {
            fontWeight: 'bold',
          }
        }
      },
      legend: {
        align: 'right',
        x: -30,
        verticalAlign: 'top',
        y: 25,
        floating: true,
      },

      tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: true
          }
        },
        pie: {
          innerSize: '170%'
        }
      },
      series: [
        {
          type: 'column',
          name: 'HDT:',
          data: [Number(this.newprojectsVairants.Jan), Number(this.newprojectsVairants.Feb), Number(this.newprojectsVairants.Mar), Number(this.newprojectsVairants.Apr), Number(this.newprojectsVairants.May), Number(this.newprojectsVairants.Jun), Number(this.newprojectsVairants.Jul), Number(this.newprojectsVairants.Aug), Number(this.newprojectsVairants.Sep), Number(this.newprojectsVairants.Oct), Number(this.newprojectsVairants.Nov), Number(this.newprojectsVairants.Dec)],
          color: "#999a9e"
        },
        {
          type: 'column',
          name: 'MDT:',
          data: [Number(this.newprojectsVairants.mdtJan), Number(this.newprojectsVairants.mdtFeb), Number(this.newprojectsVairants.mdtMar),
            Number(this.newprojectsVairants.mdtApr),Number(this.newprojectsVairants.mdtMay), Number(this.newprojectsVairants.mdtJun),
            Number(this.newprojectsVairants.mdtJul), Number(this.newprojectsVairants.mdtAug),Number(this.newprojectsVairants.mdtSep),
             Number(this.newprojectsVairants.mdtOct), Number(this.newprojectsVairants.mdtNov), Number(this.newprojectsVairants.mdtDec)],
          color: "#005176"
        }
      ]
    });
    this.CharOthers4()
  }
  CharOthers4() {
    // var inputArr = [Number(this.busrelatedlosses.Jan), Number(this.busrelatedlosses.Feb), Number(this.busrelatedlosses.Mar), Number(this.busrelatedlosses.Apr), Number(this.busrelatedlosses.May), Number(this.busrelatedlosses.Jun), Number(this.busrelatedlosses.Jul), Number(this.busrelatedlosses.Aug), Number(this.busrelatedlosses.Sep), Number(this.busrelatedlosses.Oct), Number(this.busrelatedlosses.Nov), Number(this.busrelatedlosses.Dec)];
    // this.max = inputArr.reduce((a, b) => Math.max(a, b));
    this.Others4 = new Chart({
      chart: {
        type: 'column',
         height: 250,

        backgroundColor:"rgb(245, 242, 242)"
      },
      title: {
        text: 'IPL'
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apl', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      yAxis: {
        tickInterval: 100,
        min: 0,
        max: this.max,
        title: {
          text: ""
        },
        stackLabels: {
          enabled: true,
          style: {
            fontWeight: 'bold',
          }
        }
      },
      legend: {
        align: 'right',
        x: -30,
        verticalAlign: 'top',
        y: 25,
        floating: true,
      },

      tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: true
          }
        },
        pie: {
          innerSize: '170%'
        }
      },
      series: [
        {
          type: 'column',
          name: 'HDT:',
          data: [Number(this.busrelatedlosses.Jan), Number(this.busrelatedlosses.Feb), Number(this.busrelatedlosses.Mar), Number(this.busrelatedlosses.Apr), Number(this.busrelatedlosses.May), Number(this.busrelatedlosses.Jun), Number(this.busrelatedlosses.Jul), Number(this.busrelatedlosses.Aug), Number(this.busrelatedlosses.Sep), Number(this.busrelatedlosses.Oct), Number(this.busrelatedlosses.Nov), Number(this.busrelatedlosses.Dec)],
          color: "#999a9e"
        },
        {
          type: 'column',
          name: 'MDT:',
          data: [Number(this.busrelatedlosses.mdtJan), Number(this.busrelatedlosses.mdtFeb), Number(this.busrelatedlosses.mdtMar),
            Number(this.busrelatedlosses.mdtApr),Number(this.busrelatedlosses.mdtMay), Number(this.busrelatedlosses.mdtJun),
            Number(this.busrelatedlosses.mdtJul), Number(this.busrelatedlosses.mdtAug),Number(this.busrelatedlosses.mdtSep),
             Number(this.busrelatedlosses.mdtOct), Number(this.busrelatedlosses.mdtNov), Number(this.busrelatedlosses.mdtDec)],
          color: "#005176"
        }
      ]
    });
    this.CharOthers5()
  }
  CharOthers5() {
    // var inputArr = [Number(this.reasonunderanalysis.Jan), Number(this.reasonunderanalysis.Feb), Number(this.reasonunderanalysis.Mar), Number(this.reasonunderanalysis.Apr), Number(this.reasonunderanalysis.May), Number(this.reasonunderanalysis.Jun), Number(this.reasonunderanalysis.Jul), Number(this.reasonunderanalysis.Aug), Number(this.reasonunderanalysis.Sep), Number(this.reasonunderanalysis.Oct), Number(this.reasonunderanalysis.Nov), Number(this.reasonunderanalysis.Dec)];
    // this.max = inputArr.reduce((a, b) => Math.max(a, b));
    this.Others5 = new Chart({
      chart: {
        type: 'column',
         height: 250,

        backgroundColor:"rgb(245, 242, 242)"
      },
      title: {
        text: 'IPL'
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apl', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      yAxis: {
        tickInterval: 100,
        min: 0,
        max: this.max,
        title: {
          text: ""
        },
        stackLabels: {
          enabled: true,
          style: {
            fontWeight: 'bold',
          }
        }
      },
      legend: {
        align: 'right',
        x: -30,
        verticalAlign: 'top',
        y: 25,
        floating: true,
      },

      tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: true
          }
        },
        pie: {
          innerSize: '170%'
        }
      },
      series: [
        {
          type: 'column',
          name: 'HDT:',
          data:[Number(this.reasonunderanalysis.Jan), Number(this.reasonunderanalysis.Feb), Number(this.reasonunderanalysis.Mar), Number(this.reasonunderanalysis.Apr), Number(this.reasonunderanalysis.May), Number(this.reasonunderanalysis.Jun), Number(this.reasonunderanalysis.Jul), Number(this.reasonunderanalysis.Aug), Number(this.reasonunderanalysis.Sep), Number(this.reasonunderanalysis.Oct), Number(this.reasonunderanalysis.Nov), Number(this.reasonunderanalysis.Dec)],
          color: "#999a9e"
        },
        {
          type: 'column',
          name: 'MDT:',
          data: [Number(this.reasonunderanalysis.mdtJan), Number(this.reasonunderanalysis.mdtFeb), Number(this.reasonunderanalysis.mdtMar),
            Number(this.reasonunderanalysis.mdtApr),Number(this.reasonunderanalysis.mdtMay), Number(this.reasonunderanalysis.mdtJun),
            Number(this.reasonunderanalysis.mdtJul), Number(this.reasonunderanalysis.mdtAug),Number(this.reasonunderanalysis.mdtSep),
             Number(this.reasonunderanalysis.mdtOct), Number(this.reasonunderanalysis.mdtNov), Number(this.reasonunderanalysis.mdtDec)],
          color: "#005176"
        }
      ]
    });
  }
}

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
  selector: 'app-logistics-dashboard',
  templateUrl: './logistics-dashboard.component.html',
  styleUrls: ['./logistics-dashboard.component.css']
})
export class LogisticsDashboardComponent implements OnInit {

  private getLogisticsDataAPI = this.getdata.appconstant + 'dashboard/getLogisticsData';
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
  planchange: any
  materialinwarding: any
  linefeeding: any
  materialhandling: any
  stockaccuracy: any
  externalwarehouse: any
  others: any
  killingprocess: any

  htdcount1:any;mdtcount1:any;totlacount1:any
  htdcount2:any;mdtcount2:any;totlacount2:any
  htdcount3:any;mdtcount3:any;totlacount3:any
  htdcount4:any;mdtcount4:any;totlacount4:any
  htdcount5:any;mdtcount5:any;totlacount5:any
  htdcount6:any;mdtcount6:any;totlacount6:any
  htdcount7:any;mdtcount7:any;totlacount7:any
  htdcount8:any;mdtcount8:any;totlacount8:any
  clusterList(value) {
    this.loading = true
    return this.makeapi.method(this.getLogisticsDataAPI + "?" + "year=" + value, "", "get")
      .subscribe(data => {
        this.loading = false
        this.planchange = data.planchange;
        this.htdcount1 = this.planchange.hdtTotal
        this.mdtcount1 = this.planchange.mdtTotal
        this.totlacount1 = this.planchange.ydtTotal

        this.materialinwarding = data.materialinwarding;
        this.htdcount2 = this.materialinwarding.hdtTotal
        this.mdtcount2 = this.materialinwarding.mdtTotal
        this.totlacount2 = this.materialinwarding.ydtTotal

        this.linefeeding = data.linefeeding;
        this.htdcount3 = this.linefeeding.hdtTotal
        this.mdtcount3 = this.linefeeding.mdtTotal
        this.totlacount3 = this.linefeeding.ydtTotal

        this.materialhandling = data.materialhandling;
        this.htdcount4 = this.materialhandling.hdtTotal
        this.mdtcount4 = this.materialhandling.mdtTotal
        this.totlacount4 = this.materialhandling.ydtTotal

        this.stockaccuracy = data.stockaccuracy;
        this.htdcount5 = this.stockaccuracy.hdtTotal
        this.mdtcount5 = this.stockaccuracy.mdtTotal
        this.totlacount5 = this.stockaccuracy.ydtTotal

        this.externalwarehouse = data.externalwarehouse;
        this.htdcount6 = this.externalwarehouse.hdtTotal
        this.mdtcount6 = this.externalwarehouse.mdtTotal
        this.totlacount6 = this.externalwarehouse.ydtTotal

        this.others = data.others;
        this.htdcount7 = this.others.hdtTotal
        this.mdtcount7 = this.others.mdtTotal
        this.totlacount7 = this.others.ydtTotal

        this.killingprocess = data.killingprocess;
        this.htdcount8 = this.killingprocess.hdtTotal
        this.mdtcount8 = this.killingprocess.mdtTotal
        this.totlacount8 = this.killingprocess.ydtTotal

        this.ChartLogistics1()
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
  dashboardName(){
    this.loading = true
    return this.makeapi.method(this.nameModelListAPI,"","post")
    .subscribe(data=>{
      this.loading = false
        this.Name1 = data[0].name
        this.Name2 = data[1].name
        this.Name3 = data[2].name
        this.Name4 = data[3].name
        this.Name5 = data[4].name
        this.Name6 = data[5].name
        this.Name7 = data[6].name
        this.Name8 = data[7].name
    },
    Error=>{

    })
  }
  Logistics1:any
  Logistics2:any
  Logistics3:any
  Logistics4:any
  Logistics5:any
  Logistics6:any
  Logistics7:any
  Logistics8:any
  max;
  ChartLogistics1() {
    // var inputArr = [Number(this.planchange.Jan), Number(this.planchange.Feb), Number(this.planchange.Mar), Number(this.planchange.Apr), Number(this.planchange.May), Number(this.planchange.Jun), Number(this.planchange.Jul), Number(this.planchange.Aug), Number(this.planchange.Sep), Number(this.planchange.Oct), Number(this.planchange.Nov), Number(this.planchange.Dec)];
    // this.max = inputArr.reduce((a, b) => Math.max(a, b));
    this.Logistics1 = new Chart({
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
          data: [Number(this.planchange.Jan), Number(this.planchange.Feb), Number(this.planchange.Mar), Number(this.planchange.Apr), Number(this.planchange.May), Number(this.planchange.Jun), Number(this.planchange.Jul), Number(this.planchange.Aug), Number(this.planchange.Sep), Number(this.planchange.Oct), Number(this.planchange.Nov), Number(this.planchange.Dec)],
          color: "#999a9e"
        },
        {
          type: 'column',
          name: 'MDT:',
          data: [Number(this.planchange.mdtJan), Number(this.planchange.mdtFeb), Number(this.planchange.mdtMar), Number(this.planchange.mdtApr),
          Number(this.planchange.mdtMay), Number(this.planchange.mdtJun), Number(this.planchange.mdtJul), Number(this.planchange.mdtAug),
          Number(this.planchange.mdtSep), Number(this.planchange.mdtOct), Number(this.planchange.mdtNov), Number(this.planchange.mdtDec)],
          color: "#005176"
        }
      ]
    });
    this.ChartLogistics2()
  }
  ChartLogistics2() {
    // var inputArr = [Number(this.materialinwarding.Jan), Number(this.materialinwarding.Feb), Number(this.materialinwarding.Mar), Number(this.materialinwarding.Apr), Number(this.materialinwarding.May), Number(this.materialinwarding.Jun), Number(this.materialinwarding.Jul), Number(this.materialinwarding.Aug), Number(this.materialinwarding.Sep), Number(this.materialinwarding.Oct), Number(this.materialinwarding.Nov), Number(this.materialinwarding.Dec)];
    // this.max = inputArr.reduce((a, b) => Math.max(a, b));
    this.Logistics2 = new Chart({
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
          data:[Number(this.materialinwarding.Jan), Number(this.materialinwarding.Feb), Number(this.materialinwarding.Mar), Number(this.materialinwarding.Apr), Number(this.materialinwarding.May), Number(this.materialinwarding.Jun), Number(this.materialinwarding.Jul), Number(this.materialinwarding.Aug), Number(this.materialinwarding.Sep), Number(this.materialinwarding.Oct), Number(this.materialinwarding.Nov), Number(this.materialinwarding.Dec)],
          color: "#999a9e"
        },
        {
          type: 'column',
          name: 'MDT:',
          data: [Number(this.materialinwarding.mdtJan), Number(this.materialinwarding.mdtFeb), Number(this.materialinwarding.mdtMar),
            Number(this.materialinwarding.mdtApr),Number(this.materialinwarding.mdtMay), Number(this.materialinwarding.mdtJun),
            Number(this.materialinwarding.mdtJul), Number(this.materialinwarding.mdtAug),Number(this.materialinwarding.mdtSep),
             Number(this.materialinwarding.mdtOct), Number(this.materialinwarding.mdtNov), Number(this.materialinwarding.mdtDec)],
          color: "#005176"
        }
      ]
    });
    this.ChartLogistic3()
  }
  ChartLogistic3() {
    // var inputArr = [Number(this.linefeeding.Jan), Number(this.linefeeding.Feb), Number(this.linefeeding.Mar), Number(this.linefeeding.Apr), Number(this.linefeeding.May), Number(this.linefeeding.Jun), Number(this.linefeeding.Jul), Number(this.linefeeding.Aug), Number(this.linefeeding.Sep), Number(this.linefeeding.Oct), Number(this.linefeeding.Nov), Number(this.linefeeding.Dec)];
    // this.max = inputArr.reduce((a, b) => Math.max(a, b));
    this.Logistics3 = new Chart({
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
          data: [Number(this.linefeeding.Jan), Number(this.linefeeding.Feb), Number(this.linefeeding.Mar), Number(this.linefeeding.Apr), Number(this.linefeeding.May), Number(this.linefeeding.Jun), Number(this.linefeeding.Jul), Number(this.linefeeding.Aug), Number(this.linefeeding.Sep), Number(this.linefeeding.Oct), Number(this.linefeeding.Nov), Number(this.linefeeding.Dec)],
          color: "#999a9e"
        },
        {
          type: 'column',
          name: 'MDT:',
          data: [Number(this.linefeeding.mdtJan), Number(this.linefeeding.mdtFeb), Number(this.linefeeding.mdtMar),
            Number(this.linefeeding.mdtApr),Number(this.linefeeding.mdtMay), Number(this.linefeeding.mdtJun),
            Number(this.linefeeding.mdtJul), Number(this.linefeeding.mdtAug),Number(this.linefeeding.mdtSep),
             Number(this.linefeeding.mdtOct), Number(this.linefeeding.mdtNov), Number(this.linefeeding.mdtDec)],
          color: "#005176"
        }
      ]
    });
    this.ChartLogistic4()
  }

  operation1: any
  operation2: any
  operation3: any
  operation4: any
  ChartLogistic4() {
    // var inputArr = [Number(this.materialhandling.Jan), Number(this.materialhandling.Feb), Number(this.materialhandling.Mar), Number(this.materialhandling.Apr), Number(this.materialhandling.May), Number(this.materialhandling.Jun), Number(this.materialhandling.Jul), Number(this.materialhandling.Aug), Number(this.materialhandling.Sep), Number(this.materialhandling.Oct), Number(this.materialhandling.Nov), Number(this.materialhandling.Dec)];
    // this.max = inputArr.reduce((a, b) => Math.max(a, b));
    this.Logistics4 = new Chart({
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
          data: [Number(this.materialhandling.Jan), Number(this.materialhandling.Feb), Number(this.materialhandling.Mar), Number(this.materialhandling.Apr), Number(this.materialhandling.May), Number(this.materialhandling.Jun), Number(this.materialhandling.Jul), Number(this.materialhandling.Aug), Number(this.materialhandling.Sep), Number(this.materialhandling.Oct), Number(this.materialhandling.Nov), Number(this.materialhandling.Dec)],
          color: "#999a9e"
        },
        {
          type: 'column',
          name: 'MDT:',
          data: [Number(this.materialhandling.mdtJan), Number(this.materialhandling.mdtFeb), Number(this.materialhandling.mdtMar),
            Number(this.materialhandling.mdtApr),Number(this.materialhandling.mdtMay), Number(this.materialhandling.mdtJun),
            Number(this.materialhandling.mdtJul), Number(this.materialhandling.mdtAug),Number(this.materialhandling.mdtSep),
             Number(this.materialhandling.mdtOct), Number(this.materialhandling.mdtNov), Number(this.materialhandling.mdtDec)],
          color: "#005176"
        }
      ]
    });
    this.ChartLogistic5()
  }
  ChartLogistic5() {
  //   var inputArr = [Number(this.stockaccuracy.Jan), Number(this.stockaccuracy.Feb), Number(this.stockaccuracy.Mar), Number(this.stockaccuracy.Apr), Number(this.stockaccuracy.May), Number(this.stockaccuracy.Jun), Number(this.stockaccuracy.Jul), Number(this.stockaccuracy.Aug), Number(this.stockaccuracy.Sep), Number(this.stockaccuracy.Oct), Number(this.stockaccuracy.Nov), Number(this.stockaccuracy.Dec)];
  //   this.max = inputArr.reduce((a, b) => Math.max(a, b));
    this.Logistics5 = new Chart({
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
          data: [Number(this.stockaccuracy.Jan), Number(this.stockaccuracy.Feb), Number(this.stockaccuracy.Mar), Number(this.stockaccuracy.Apr), Number(this.stockaccuracy.May), Number(this.stockaccuracy.Jun), Number(this.stockaccuracy.Jul), Number(this.stockaccuracy.Aug), Number(this.stockaccuracy.Sep), Number(this.stockaccuracy.Oct), Number(this.stockaccuracy.Nov), Number(this.stockaccuracy.Dec)],
          color: "#999a9e"
        },
        {
          type: 'column',
          name: 'MDT:',
          data: [Number(this.stockaccuracy.mdtJan), Number(this.stockaccuracy.mdtFeb), Number(this.stockaccuracy.mdtMar),
            Number(this.stockaccuracy.mdtApr),Number(this.stockaccuracy.mdtMay), Number(this.stockaccuracy.mdtJun),
            Number(this.stockaccuracy.mdtJul), Number(this.stockaccuracy.mdtAug),Number(this.stockaccuracy.mdtSep),
             Number(this.stockaccuracy.mdtOct), Number(this.stockaccuracy.mdtNov), Number(this.stockaccuracy.mdtDec)],
          color: "#005176"
        }
      ]
    });
    this.ChartLogistic6()
  }
  ChartLogistic6() {
    // var inputArr = [Number(this.externalwarehouse.Jan), Number(this.externalwarehouse.Feb), Number(this.externalwarehouse.Mar), Number(this.externalwarehouse.Apr), Number(this.externalwarehouse.May), Number(this.externalwarehouse.Jun), Number(this.externalwarehouse.Jul), Number(this.externalwarehouse.Aug), Number(this.externalwarehouse.Sep), Number(this.externalwarehouse.Oct), Number(this.externalwarehouse.Nov), Number(this.externalwarehouse.Dec)];
    // this.max = inputArr.reduce((a, b) => Math.max(a, b));
    this.Logistics6 = new Chart({
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
          data: [Number(this.externalwarehouse.Jan), Number(this.externalwarehouse.Feb), Number(this.externalwarehouse.Mar), Number(this.externalwarehouse.Apr), Number(this.externalwarehouse.May), Number(this.externalwarehouse.Jun), Number(this.externalwarehouse.Jul), Number(this.externalwarehouse.Aug), Number(this.externalwarehouse.Sep), Number(this.externalwarehouse.Oct), Number(this.externalwarehouse.Nov), Number(this.externalwarehouse.Dec)],
          color: "#999a9e"
        },
        {
          type: 'column',
          name: 'MDT:',
          data: [Number(this.externalwarehouse.mdtJan), Number(this.externalwarehouse.mdtFeb), Number(this.externalwarehouse.mdtMar),
            Number(this.externalwarehouse.mdtApr),Number(this.externalwarehouse.mdtMay), Number(this.externalwarehouse.mdtJun),
            Number(this.externalwarehouse.mdtJul), Number(this.externalwarehouse.mdtAug),Number(this.externalwarehouse.mdtSep),
             Number(this.externalwarehouse.mdtOct), Number(this.externalwarehouse.mdtNov), Number(this.externalwarehouse.mdtDec)],
          color: "#005176"
        }
      ]
    });
    this.ChartLogistic7()
  }
  ChartLogistic7() {
    // var inputArr = [Number(this.others.Jan), Number(this.others.Feb), Number(this.others.Mar), Number(this.others.Apr), Number(this.others.May), Number(this.others.Jun), Number(this.others.Jul), Number(this.others.Aug), Number(this.others.Sep), Number(this.others.Oct), Number(this.others.Nov), Number(this.others.Dec)];
    // this.max = inputArr.reduce((a, b) => Math.max(a, b));
    this.Logistics7 = new Chart({
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
          data: [Number(this.others.Jan), Number(this.others.Feb), Number(this.others.Mar), Number(this.others.Apr), Number(this.others.May), Number(this.others.Jun), Number(this.others.Jul), Number(this.others.Aug), Number(this.others.Sep), Number(this.others.Oct), Number(this.others.Nov), Number(this.others.Dec)],
          color: "#999a9e"
        },
        {
          type: 'column',
          name: 'MDT:',
          data: [Number(this.others.mdtJan), Number(this.others.mdtFeb), Number(this.others.mdtMar),
            Number(this.others.mdtApr),Number(this.others.mdtMay), Number(this.others.mdtJun),
            Number(this.others.mdtJul), Number(this.others.mdtAug),Number(this.others.mdtSep),
             Number(this.others.mdtOct), Number(this.others.mdtNov), Number(this.others.mdtDec)],
          color: "#005176"
        }
      ]
    });
    this.ChartLogistic8()
  }
  Cabtrim1: any
  Cabtrim2: any
  ChartLogistic8() {
    // var inputArr = [Number(this.killingprocess.Jan), Number(this.killingprocess.Feb), Number(this.killingprocess.Mar), Number(this.killingprocess.Apr), Number(this.killingprocess.May), Number(this.killingprocess.Jun), Number(this.killingprocess.Jul), Number(this.killingprocess.Aug), Number(this.killingprocess.Sep), Number(this.killingprocess.Oct), Number(this.killingprocess.Nov), Number(this.killingprocess.Dec)];
    // this.max = inputArr.reduce((a, b) => Math.max(a, b));
    this.Logistics8 = new Chart({
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
          data: [Number(this.killingprocess.Jan), Number(this.killingprocess.Feb), Number(this.killingprocess.Mar), Number(this.killingprocess.Apr), Number(this.killingprocess.May), Number(this.killingprocess.Jun), Number(this.killingprocess.Jul), Number(this.killingprocess.Aug), Number(this.killingprocess.Sep), Number(this.killingprocess.Oct), Number(this.killingprocess.Nov), Number(this.killingprocess.Dec)],
          color: "#999a9e"
        },
        {
          type: 'column',
          name: 'MDT:',
          data: [Number(this.killingprocess.mdtJan), Number(this.killingprocess.mdtFeb), Number(this.killingprocess.mdtMar),
            Number(this.killingprocess.mdtApr),Number(this.killingprocess.mdtMay), Number(this.killingprocess.mdtJun),
            Number(this.killingprocess.mdtJul), Number(this.killingprocess.mdtAug),Number(this.killingprocess.mdtSep),
             Number(this.killingprocess.mdtOct), Number(this.killingprocess.mdtNov), Number(this.killingprocess.mdtDec)],
          color: "#005176"
        }
      ]
    });
  }
}

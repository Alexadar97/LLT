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
  selector: 'app-cluster-dashboard',
  templateUrl: './cluster-dashboard.component.html',
  styleUrls: ['./cluster-dashboard.component.css']
})
export class ClusterDashboardComponent implements OnInit {
  private getClusterDataAPI = this.getdata.appconstant + 'dashboard/getClusterData';
  private nameModelListAPI = this.getdata.appconstant + 'dashboard/nameModelList';
  loading = false;
  constructor(private Formbuilder: FormBuilder, private http: Http, private router: Router, private getdata: DatatransferService,
    private makeapi: WebserviceService, private AuthGuard: AuthGuard, private route: ActivatedRoute) { }

  ngOnInit() {
    var year = new Date().getFullYear();
    $("#year").val(year)
    this.clusterList(year)
    this.dashboardName()
  }
  jan: Number
  IPLchart: any
  IBLchart: any
  LCIMchart: any
  MHEchart: any
  OBLchart: any
  PPSchart: any
  SCchart: any
  htdcount1:any
  mdtcount1:any
  htdcount2:any
  mdtcount2:any
  htdcount3:any
  mdtcount3:any
  htdcount4:any
  mdtcount4:any
  htdcount5:any
  mdtcount5:any
  htdcount6:any
  mdtcount6:any
  htdcount7:any
  mdtcount7:any
  totlacount1:any
  totlacount2:any
  totlacount3:any
  totlacount4:any
  totlacount5:any
  totlacount6:any
  totlacount7:any
  clusterList(value) {
    this.loading = true
    return this.makeapi.method(this.getClusterDataAPI + "?" + "year=" + value, "", "get")
      .subscribe(data => {
        this.loading = false
        this.IPLchart = data.ipl;
        this.htdcount1 = this.IPLchart.hdtTotal
        this.mdtcount1 = this.IPLchart.mdtTotal
        this.totlacount1 = this.IPLchart.ydtTotal

        this.IBLchart = data.ibl;
        this.htdcount2 = this.IBLchart.hdtTotal
        this.mdtcount2 = this.IBLchart.mdtTotal
        this.totlacount2 = this.IBLchart.ydtTotal

        this.LCIMchart = data.lcim;
        this.htdcount3 = this.LCIMchart.hdtTotal
        this.mdtcount3 = this.LCIMchart.mdtTotal
        this.totlacount3 = this.LCIMchart.ydtTotal


        this.MHEchart = data.mhe;
        this.htdcount4 = this.MHEchart.hdtTotal
        this.mdtcount4 = this.MHEchart.mdtTotal
        this.totlacount4 = this.MHEchart.ydtTotal

        this.OBLchart = data.obl;
        this.htdcount5 = this.OBLchart.hdtTotal
        this.mdtcount5 = this.OBLchart.mdtTotal
        this.totlacount5 = this.OBLchart.ydtTotal

        this.PPSchart = data.pps;
        this.htdcount6 = this.PPSchart.hdtTotal
        this.mdtcount6 = this.PPSchart.mdtTotal
        this.totlacount6 = this.PPSchart.ydtTotal

        this.SCchart = data.sc;
        this.htdcount7 = this.SCchart.hdtTotal
        this.mdtcount7 = this.SCchart.mdtTotal
        this.totlacount7 = this.SCchart.ydtTotal
        this.Chartoperation1()
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

  dashboardName(){
    this.loading = true
    return this.makeapi.method(this.nameModelListAPI,"","post")
    .subscribe(data=>{
      this.loading = false
        this.Name1 = data[22].name
        this.Name2 = data[23].name
        this.Name3 = data[24].name
        this.Name4 = data[25].name
        this.Name5 = data[26].name
        this.Name6 = data[27].name
        this.Name7 = data[28].name
    },
    Error=>{

    })
  }
  operation1: any
  max;
  Chartoperation1() {
    // var inputArr = [Number(this.IPLchart.Jan), Number(this.IPLchart.Feb), Number(this.IPLchart.Mar), Number(this.IPLchart.Apr), Number(this.IPLchart.May), Number(this.IPLchart.Jun), Number(this.IPLchart.Jul), Number(this.IPLchart.Aug), Number(this.IPLchart.Sep), Number(this.IPLchart.Oct), Number(this.IPLchart.Nov), Number(this.IPLchart.Dec)];
    // this.max = inputArr.reduce((a, b) => Math.max(a, b));
    this.operation1 = new Chart({
      chart: {
        type: 'column',
        height: 250,

        backgroundColor:"rgb(245, 242, 242)"
      },
      title: {
        // text: 'IPL'
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
        pointFormat: '{series.name}:{point.y}<br/>Total: {point.stackTotal}'
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
          name:  'HDT:',
          data: [Number(this.IPLchart.Jan), Number(this.IPLchart.Feb), Number(this.IPLchart.Mar),
            Number(this.IPLchart.Apr), Number(this.IPLchart.May), Number(this.IPLchart.Jun),
            Number(this.IPLchart.Jul), Number(this.IPLchart.Aug), Number(this.IPLchart.Sep),
            Number(this.IPLchart.Oct), Number(this.IPLchart.Nov),Number(this.OBLchart.Dec)],
          color: "#999a9e"
        },
        {
          type: 'column',
          name: 'MDT:',
          data: [Number(this.IPLchart.mdtJan), Number(this.IPLchart.mdtFeb), Number(this.IPLchart.mdtMar), Number(this.IPLchart.mdtApr),
          Number(this.IPLchart.mdtMay), Number(this.IPLchart.mdtJun), Number(this.IPLchart.mdtJul), Number(this.IPLchart.mdtAug),
          Number(this.IPLchart.mdtSep), Number(this.IPLchart.mdtOct), Number(this.IPLchart.mdtNov), Number(this.OBLchart.mdtDec)],
          color: "#005176"
        }
      ]
    });
    this.Chartoperation2()
  }
  operation2: any
  max2
  Chartoperation2() {
    var inputArr = [5, 3, 4, 7, 5, 3, 4, 7, 5, 3, 4, 7];

    this.operation2 = new Chart({
      chart: {
        type: 'column',
        height: 250,

        backgroundColor:"rgb(245, 242, 242)"
      },
      title: {
        text: 'IBL'
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apl', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      yAxis: {
        tickInterval: 100,
        min: 0,
        max: this.max2,
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
        pointFormat: '{series.name}<br/>Total: {point.stackTotal}'
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
          data: [Number(this.IBLchart.Jan), Number(this.IBLchart.Feb), Number(this.IBLchart.Mar),
          Number(this.IBLchart.Apr), Number(this.IBLchart.May), Number(this.IBLchart.Jun),
          Number(this.IBLchart.Jul), Number(this.IBLchart.Aug), Number(this.IBLchart.Sep),
          Number(this.IBLchart.Oct), Number(this.IBLchart.Nov), Number(this.OBLchart.Dec)],
          color: "#999a9e"
        },
        {
          type: 'column',
          name: 'MDT:',
          data: [Number(this.IBLchart.mdtJan), Number(this.IBLchart.mdtFeb), Number(this.IBLchart.mdtMar), Number(this.IBLchart.mdtApr),
          Number(this.IBLchart.mdtMay), Number(this.IBLchart.mdtJun), Number(this.IBLchart.mdtJul), Number(this.IBLchart.mdtAug),
          Number(this.IBLchart.mdtSep), Number(this.IBLchart.mdtOct), Number(this.IBLchart.mdtNov), Number(this.OBLchart.mdtDec)],
          color: "#005176"
        }
      ]
    });
    this.Chartoperation3()
  }
  operation3: any
  Chartoperation3() {
    this.operation3 = new Chart({
      chart: {
        type: 'column',
        height: 250,

        backgroundColor:"rgb(245, 242, 242)"
      },
      title: {
        text: 'OBL'
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apl', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      yAxis: {
        tickInterval: 100,
        min: 0,
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
        pointFormat: '{series.name}<br/>Total: {point.stackTotal}'
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
          data: [Number(this.OBLchart.Jan), Number(this.OBLchart.Feb), Number(this.OBLchart.Mar),
          Number(this.OBLchart.Apr), Number(this.OBLchart.May), Number(this.OBLchart.Jun),
          Number(this.OBLchart.Jul), Number(this.OBLchart.Aug), Number(this.OBLchart.Sep),
          Number(this.OBLchart.Oct), Number(this.OBLchart.Nov),Number(this.OBLchart.Dec)],
          color: "#999a9e"
        },
        {
          type: 'column',
          name: 'MDT:',
          data: [Number(this.OBLchart.mdtJan), Number(this.OBLchart.mdtFeb), Number(this.OBLchart.mdtMar), Number(this.OBLchart.mdtApr),
          Number(this.OBLchart.mdtMay), Number(this.OBLchart.mdtJun), Number(this.OBLchart.mdtJul), Number(this.OBLchart.mdtAug),
          Number(this.OBLchart.mdtSep), Number(this.OBLchart.mdtOct), Number(this.OBLchart.mdtDec),Number(this.OBLchart.mdtDec)],
          color: "#005176"
        }
      ]
    });
    this.CharPlanning1()
  }
  Planning1:any
  Planning2:any
  Planning3:any
  Planning4:any
  CharPlanning1() {
    this.Planning1 = new Chart({
      chart: {
        type: 'column',
        height: 250,

        backgroundColor:"rgb(245, 242, 242)"
      },
      title: {
        text: 'MHE'
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apl', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      yAxis: {
        tickInterval: 100,
        min: 0,
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
        pointFormat: '{series.name}<br/>Total: {point.stackTotal}'
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
          data: [Number(this.MHEchart.Jan), Number(this.MHEchart.Feb), Number(this.MHEchart.Mar),
            Number(this.MHEchart.Apr),Number(this.MHEchart.May), Number(this.MHEchart.Jun),
            Number(this.MHEchart.Jul), Number(this.MHEchart.Aug),Number(this.MHEchart.Sep),
            Number(this.MHEchart.Oct), Number(this.MHEchart.Nov),Number(this.MHEchart.Dec)],
          color: "#999a9e"
        },
        {
          type: 'column',
          name: 'MDT:',
          data: [Number(this.MHEchart.mdtJan), Number(this.MHEchart.mdtFeb), Number(this.MHEchart.mdtMar), Number(this.MHEchart.mdtApr),
            Number(this.MHEchart.mdtMay), Number(this.MHEchart.mdtJun), Number(this.MHEchart.mdtJul), Number(this.MHEchart.mdtAug),
            Number(this.MHEchart.mdtSep), Number(this.MHEchart.mdtOct), Number(this.MHEchart.mdtNov),Number(this.MHEchart.mdtDec)],
          color: "#005176"
        }
      ]
    });
    this.CharPlanning2()
  }
  CharPlanning2() {
    this.Planning2 = new Chart({
      chart: {
        type: 'column',
        height: 250,

        backgroundColor:"rgb(245, 242, 242)"
      },
      title: {
        text: 'LCIM'
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apl', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      yAxis: {
        tickInterval: 100,
        min: 0,
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
        pointFormat: '{series.name}<br/>Total: {point.stackTotal}'
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
          data: [Number(this.LCIMchart.Jan), Number(this.LCIMchart.Feb), Number(this.LCIMchart.Mar),
            Number(this.LCIMchart.Apr),Number(this.LCIMchart.May), Number(this.LCIMchart.Jun),
            Number(this.LCIMchart.Jul), Number(this.LCIMchart.Aug),Number(this.LCIMchart.Sep),
            Number(this.LCIMchart.Oct), Number(this.LCIMchart.Nov),Number(this.LCIMchart.Dec)],
          color: "#999a9e"
        },
        {
          type: 'column',
          name: 'MDT:',
          data: [Number(this.LCIMchart.mdtJan), Number(this.LCIMchart.mdtFeb), Number(this.LCIMchart.mdtMar), Number(this.LCIMchart.mdtApr),
            Number(this.LCIMchart.mdtMay), Number(this.LCIMchart.mdtJun), Number(this.LCIMchart.mdtJul), Number(this.LCIMchart.mdtAug),
            Number(this.LCIMchart.mdtSep), Number(this.LCIMchart.mdtOct), Number(this.LCIMchart.mdtNov),Number(this.LCIMchart.mdtDec)],
          color: "#005176"
        }
      ]
    });
    this.CharPlanning3()
  }
  CharPlanning3() {
    this.Planning3 = new Chart({
      chart: {
        type: 'column',
        height: 250,

        backgroundColor:"rgb(245, 242, 242)"
      },
      title: {
        text: 'PPS'
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apl', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      yAxis: {
        tickInterval: 100,
        min: 0,
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
        pointFormat: '{series.name}:{point.y}<br/>Total: {point.stackTotal}'
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
          data: [Number(this.PPSchart.Jan), Number(this.PPSchart.Feb), Number(this.PPSchart.Mar),
            Number(this.PPSchart.Apr),Number(this.PPSchart.May), Number(this.PPSchart.Jun),
            Number(this.PPSchart.Jul), Number(this.PPSchart.Aug),Number(this.PPSchart.Sep),
            Number(this.PPSchart.Oct), Number(this.PPSchart.Nov),Number(this.PPSchart.Dec)],
          color: "#999a9e"
        },
        {
          type: 'column',
          name: 'MDT:',
          data: [Number(this.PPSchart.mdtJan), Number(this.PPSchart.mdtFeb), Number(this.PPSchart.mdtMar), Number(this.PPSchart.mdtApr),
            Number(this.PPSchart.mdtMay), Number(this.PPSchart.mdtJun), Number(this.PPSchart.mdtJul), Number(this.PPSchart.mdtAug),
            Number(this.PPSchart.mdtSep), Number(this.PPSchart.mdtOct), Number(this.PPSchart.mdtNov),Number(this.PPSchart.mdtDec)],
          color: "#005176"
        }
      ]
    });
this.ChartPlanning4()
  }
  ChartPlanning4(){
    this.Planning4 = new Chart({
      chart: {
        type: 'column',
        height: 250,

        backgroundColor:"rgb(245, 242, 242)"
      },
      title: {
        text: 'SCM4.0'
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apl', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      yAxis: {
        tickInterval: 100,
        min: 0,
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
        pointFormat: '{series.name}<br/>Total: {point.stackTotal}'
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
          data: [Number(this.SCchart.Jan), Number(this.SCchart.Feb), Number(this.SCchart.Mar),
            Number(this.SCchart.Apr),Number(this.SCchart.May), Number(this.SCchart.Jun),
            Number(this.SCchart.Jul), Number(this.SCchart.Aug),Number(this.SCchart.Sep),
            Number(this.SCchart.Oct), Number(this.SCchart.Nov),Number(this.SCchart.Dec)],
          color: "#999a9e"
        },
        {
          type: 'column',
          name: 'MDT:',
          data: [Number(this.SCchart.mdtJan), Number(this.SCchart.mdtFeb), Number(this.SCchart.mdtMar), Number(this.SCchart.mdtApr),
            Number(this.SCchart.mdtMay), Number(this.SCchart.mdtJun), Number(this.SCchart.mdtJul), Number(this.SCchart.mdtAug),
            Number(this.SCchart.mdtSep), Number(this.SCchart.mdtOct), Number(this.SCchart.mdtNov),Number(this.SCchart.mdtDec)],
          color: "#005176"
        }
      ]
    });
  }
}

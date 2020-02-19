import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../canactivate.service';
import { Router, ActivatedRoute } from '@angular/router';
declare var $;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private AuthGuard: AuthGuard, private router: Router) { }
  usertype: any
  depttype: any
  username: any
  ngOnInit() {
    this.username = this.AuthGuard.session().firstname + " " + this.AuthGuard.session().lastname
    this.usertype = this.AuthGuard.session().usertype
    this.depttype = this.AuthGuard.session().depttype
    var setllt = localStorage.getItem("llt")
    $(document).ready(function () {
      $(setllt).addClass("llt");
    });
    if(setllt != "#dashboard"){
      $(document).ready(function () {
        $("#dashboard").removeClass("llt");
      });
    }
    var setvalue = localStorage.getItem("cluster")
    $(document).ready(function () {
      $(setvalue).addClass("clusterClass");
    });
  }
  dashboard() {
    $(document).ready(function () {
      $("#llt").removeClass("llt");
    });
    $(document).ready(function () {
      $("#report").removeClass("llt");
    });
    localStorage.setItem("llt", "#dashboard")
    localStorage.removeItem("cluster")
    $(document).ready(function () {
      $("#cluster").removeClass("clusterClass");
    });
    $(document).ready(function () {
      $("#subcluster").removeClass("clusterClass");
    });

    $(document).ready(function () {
      $("#dept").removeClass("clusterClass");
    });
    $(document).ready(function () {
      $("#user").removeClass("clusterClass");
    });
    $('#dashboard').css({
      "background-color": "rgb(93,93,93)"
    })
    $('#report').css({
      "background-color": "#000"
    })
    this.usertype = this.AuthGuard.session().usertype
    $('#llt').css({
      "background-color": "#000", "border-left": "3px solid #000"
    })
    $('#subcluster').css({
      "background-color": "#000", "border-left": "3px solid #000"
    })
    $('#cluster').css({
      "background-color": "#000", "border-left": "3px solid #000"
    })
    $('#dept').css({
      "background-color": "#000", "border-left": "3px solid #000"
    })
    $('#user').css({
      "background-color": "#000", "border-left": "3px solid #000"
    })
  }
  cluster() {
    localStorage.removeItem("llt")
    localStorage.removeItem("cluster")
    localStorage.setItem("cluster", "#cluster")
    $(document).ready(function () {
      $("#llt").removeClass("llt");
    });
    $(document).ready(function () {
      $("#dashboard").removeClass("llt");
    });
    $(document).ready(function () {
      $("#report").removeClass("llt");
    });
    $(document).ready(function () {
      $("#subcluster").removeClass("clusterClass");
    });
    $(document).ready(function () {
      $("#dept").removeClass("clusterClass");
    });
    $(document).ready(function () {
      $("#user").removeClass("clusterClass");
    });
    $('#dashboard').css({
      "background-color": "#000", "border-left": "3px solid #000"
    })
    $('#report').css({
      "background-color": "#000"
    })
    $('#cluster').css({
      "background-color": "rgb(93,93,93)", "border-left": "3px solid #94291e"
    })
    $('#dept').css({
      "background-color": "#000", "border-left": "3px solid #000"
    })
    $('#subcluster').css({
      "background-color": "#000", "border-left": "3px solid #000"
    })
    $('#llt').css({
      "background-color": "#000"
    })
    $('#user').css({
      "background-color": "#000", "border-left": "3px solid #000"
    })
  }
  subcluster() {
    localStorage.removeItem("llt")
    localStorage.removeItem("cluster")
    localStorage.setItem("cluster", "#subcluster")
    $(document).ready(function () {
      $("#llt").removeClass("llt");
    });
    $(document).ready(function () {
      $("#report").removeClass("llt");
    });
    $(document).ready(function () {
      $("#dashboard").removeClass("llt");
    });
    $(document).ready(function () {
      $("#cluster").removeClass("clusterClass");
    });

    $(document).ready(function () {
      $("#dept").removeClass("clusterClass");
    });
    $(document).ready(function () {
      $("#user").removeClass("clusterClass");
    });
    $('#dashboard').css({
      "background-color": "#000", "border-left": "3px solid #000"
    })
    $('#report').css({
      "background-color": "#000"
    })
    $('#subcluster').css({
      "background-color": "rgb(93,93,93)", "border-left": "3px solid #94291e"
    })
    $('#cluster').css({
      "background-color": "#000", "border-left": "3px solid #000"
    })
    $('#dept').css({
      "background-color": "#000", "border-left": "3px solid #000"
    })
    $('#llt').css({
      "background-color": "#000"
    })
    $('#user').css({
      "background-color": "#000", "border-left": "3px solid #000"
    })
  }
  dept() {
    localStorage.removeItem("llt")
    localStorage.removeItem("cluster")
    localStorage.setItem("cluster", "#dept")
    $(document).ready(function () {
      $("#llt").removeClass("llt");
    });
    $(document).ready(function () {
      $("#report").removeClass("llt");
    });
    $(document).ready(function () {
      $("#dashboard").removeClass("llt");
    });
    $(document).ready(function () {
      $("#cluster").removeClass("clusterClass");
    });
    $(document).ready(function () {
      $("#subcluster").removeClass("clusterClass");
    });

    $(document).ready(function () {
      $("#user").removeClass("clusterClass");
    });
    $('#dashboard').css({
      "background-color": "#000", "border-left": "3px solid #000"
    })
    $('#report').css({
      "background-color": "#000"
    })
    $('#dept').css({
      "background-color": "rgb(93,93,93)", "border-left": "3px solid #94291e"
    })
    $('#subcluster').css({
      "background-color": "#000", "border-left": "3px solid #000"
    })
    $('#cluster').css({
      "background-color": "#000", "border-left": "3px solid #000"
    })
    $('#llt').css({
      "background-color": "#000"
    })
    $('#user').css({
      "background-color": "#000", "border-left": "3px solid #000"
    })
  }
  user() {
    localStorage.removeItem("llt")
    localStorage.removeItem("cluster")
    localStorage.setItem("cluster", "#user")
    $(document).ready(function () {
      $("#llt").removeClass("llt");
    });
    $(document).ready(function () {
      $("#dashboard").removeClass("llt");
    });
    $(document).ready(function () {
      $("#report").removeClass("llt");
    });
    $(document).ready(function () {
      $("#cluster").removeClass("clusterClass");
    });
    $(document).ready(function () {
      $("#subcluster").removeClass("clusterClass");
    });
    $(document).ready(function () {
      $("#dept").removeClass("clusterClass");
    });
    $('#dashboard').css({
      "background-color": "#000", "border-left": "3px solid #000"
    })
    $('#report').css({
      "background-color": "#000"
    })
    $('#user').css({
      "background-color": "rgb(93,93,93)", "border-left": "3px solid #94291e"
    })
    $('#dept').css({
      "background-color": "#000", "border-left": "3px solid #000"
    })
    $('#subcluster').css({
      "background-color": "#000", "border-left": "3px solid #000"
    })
    $('#cluster').css({
      "background-color": "#000", "border-left": "3px solid #000"
    })
    $('#llt').css({
      "background-color": "#000"
    })
    $('#report').css({
      "background-color": "#000"
    })
  }
  llt() {
    $(document).ready(function () {
      $("#dashboard").removeClass("llt");
    });
    $(document).ready(function () {
      $("#report").removeClass("llt");
    });
    localStorage.setItem("llt", "#llt")
    localStorage.removeItem("cluster")
    $(document).ready(function () {
      $("#cluster").removeClass("clusterClass");
    });
    $(document).ready(function () {
      $("#subcluster").removeClass("clusterClass");
    });

    $(document).ready(function () {
      $("#dept").removeClass("clusterClass");
    });
    $(document).ready(function () {
      $("#user").removeClass("clusterClass");
    });
    $('#dashboard').css({
      "background-color": "#000", "border-left": "3px solid #000"
    })
    $('#report').css({
      "background-color": "#000"
    })
    this.usertype = this.AuthGuard.session().usertype
    $('#llt').css({
      "background-color": "rgb(93,93,93)"
    })
    $('#subcluster').css({
      "background-color": "#000", "border-left": "3px solid #000"
    })
    $('#cluster').css({
      "background-color": "#000", "border-left": "3px solid #000"
    })
    $('#dept').css({
      "background-color": "#000", "border-left": "3px solid #000"
    })
    $('#user').css({
      "background-color": "#000", "border-left": "3px solid #000"
    })
    if (this.usertype == "admin") {
      this.router.navigateByUrl("/dashboard/tracker")
    } else if (this.depttype == "PPS") {
      this.router.navigateByUrl("/dashboard/pps")
    }
    else if (this.depttype == "OPS") {
      this.router.navigateByUrl("/dashboard/ops")
    }
    else if (this.depttype == "SM-P/V") {
      this.router.navigateByUrl("/dashboard/final")
    }
  }
  report() {
    $(document).ready(function () {
      $("#llt").removeClass("llt");
    });
    localStorage.setItem("llt", "#report")
    localStorage.removeItem("cluster")
    $(document).ready(function () {
      $("#cluster").removeClass("clusterClass");
    });
    $(document).ready(function () {
      $("#subcluster").removeClass("clusterClass");
    });
    $(document).ready(function () {
      $("#subcluster").removeClass("clusterClass");
    });
    $(document).ready(function () {
      $("#dashboard").removeClass("llt");
    });
    $(document).ready(function () {
      $("#dept").removeClass("clusterClass");
    });
    $(document).ready(function () {
      $("#user").removeClass("clusterClass");
    });
    $('#dashboard').css({
      "background-color": "#000", "border-left": "3px solid #000"
    })
    $('#report').css({
      "background-color": "rgb(93,93,93)"
    })
    $('#llt').css({
      "background-color": "#000"
    })
    $('#subcluster').css({
      "background-color": "#000", "border-left": "3px solid #000"
    })
    $('#cluster').css({
      "background-color": "#000", "border-left": "3px solid #000"
    })
    $('#dept').css({
      "background-color": "#000", "border-left": "3px solid #000"
    })
    $('#user').css({
      "background-color": "#000", "border-left": "3px solid #000"
    })
  }
  logut() {
    localStorage.removeItem("llt")
    localStorage.removeItem("cluster")
  }
}

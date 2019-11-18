import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';
import { DatePipe } from '@angular/common';
import { formatDate } from "@angular/common";
import * as moment from 'moment';
import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
@Pipe({ name: 'sortBy' })
export class RestaurantComponent implements OnInit {
  now: number;
  moment: any;
  allrest: any; date: any;
  onerest: any;
  openform: boolean;
  editrest: any;
  errors: any;
  current_datesstamp: any;
  datesstamp_flags: any;
  constructor(private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) { }

  ngOnInit() {
    this.getQuotesFromService();
    this.openform = false;
    this.editrest = { name: "", cusinie: "" };
    this.errors = { name: "", cusinie: "" };
    this.current_datesstamp = new Date();
    this.datesstamp_flags = [];
  }
  getQuotesFromService() {
    let observable = this._httpService.getresturant();
    observable.subscribe(data => {
      console.log(data);
      this.allrest = data['result'];

      console.log("**** ", this.allrest);
      for (var rest in this.allrest) {
        var dates = this.allrest[rest].createdAt;
        console.log("****", dates)

        var date = new Date(dates);
        date.getTime();
        console.log("****", date.getTime())
        if ((this.current_datesstamp.getTime() - date.getTime()) / 1000 > 30) {
          this.datesstamp_flags.push(false);
          console.log("****", this.datesstamp_flags)
        } else {
          this.datesstamp_flags.push(true);
          console.log("****", this.datesstamp_flags)

        }
      }
      this._router.navigate(['/rest']);
    })
  }

  delelteOnerestfromService(id) {
    console.log(id);
    let observable = this._httpService.delelteOnerest(id);
    observable.subscribe(data => {
      console.log("Delete");
      this.onerest = data['result'];
      // this._router.navigate(['/rest']);
      this.getQuotesFromService();
    })
  }
  showEditForm(id) {
    this.openform = !this.openform;
    // this.showdetail = !this.showdetail;
    let observable = this._httpService.getOne(id);
    observable.subscribe(data => {
      console.log("One Task!!", data);
      this.editrest = data['result'];
      console.log("One task to edit ", this.editrest);
    });
  }
  onEdit() {
    // edit_task.showEditForm = false;
    let observable = this._httpService.editrest(this.editrest);
    observable.subscribe(data => {
      console.log('Edit ', data);
      // this.edit_task = data;
      // this.editAuth = { name: "" };
      // this._router.navigate(['/']);

      if (data['msg'] != "Error") {
        this.editrest = { name: "", cusinie: "" };
        this.errors = { name: "", cusinie: "" };
        // this._router.navigate(['/']);
        this.openform = false;
        this.getQuotesFromService();
      }
      else {
        this.errors.name = data['msg'] + " Name is Require";
        console.log(this.errors.name);
        this.errors.cusinie = data['msg'] + " Cusinie is Required";
        console.log(this.errors.cusinie);
      }

    });
  }
}
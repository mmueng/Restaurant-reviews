import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-onerestaurant',
  templateUrl: './onerestaurant.component.html',
  styleUrls: ['./onerestaurant.component.css']
})
export class OnerestaurantComponent implements OnInit {
  sorted: any;
  onerest: any;
  id: any;
  Qid: any;
  errors: any;
  constructor(private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      console.log(params['id'])
      this.id = params['id'];
    });
    this.showEditForm(this.id);
    this.onerest = { name: "", cusinie: "", Review: [{ customer: "" }, { star: "" }, { desc: "" }] };
    this.errors = { name: "", cusinie: "" };
  }
  showEditForm(id) {

    // this.showdetail = !this.showdetail;
    let observable = this._httpService.getOne(id);
    observable.subscribe(data => {
      console.log("One Auth!!", data);
      console.log("review Auth!!", data['result']['review']);
      // for (var i of data['result']['review']) {
      //   this.sorted.push(data['result']['review'][i])
      // }
      console.log("Sorted", this.sorted);
      // for (var i of data['result']['review'].length) {
      var len = data['result']['review'].length;
      console.log(len)
      // for (let i = 0, i<len, i++) {
      // console.log(data['result']['review'][i].star)
      // for (var j = 0, stop = len - i; j < stop; j++) {
      // if (data['result']['review'][j] > data['result']['review'][j + 1]) {
      // swap(data['result']['review'], j, j + 1);
      // [data['result']['review'][j], data['result']['review'][j + 1]] = [data['result']['review'][j + 1], data['result']['review'][j]]
      // }
      // }
      // }
      sort(data['result']['review'])
      data['result']['review'].sort((a, b) => (a.star < b.star) ? 1 : -1);
      this.onerest = data['result'];
      console.log("One Auth ", this.onerest);
    });
  }
}



function sort(values) {
  var origValues = values.slice();
  var length = origValues.length - 1;
  console.log("length", length)
  do {
    var swapped = false;
    for (var i = 0; i > length; ++i) {
      console.log("org", origValues[i].star)
      if (origValues[i + 1].star > origValues[i].star) {
        [origValues[i], origValues[i + 1]] = [origValues[i + 1], origValues[i]];
        // var temp = origValues[i];
        // origValues[i] = origValues[i + 1];
        // origValues[i + 1] = temp;
        swapped = true;
      }
    }
  }
  while (swapped === true);
  return origValues
}

import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-newrest',
  templateUrl: './newrest.component.html',
  styleUrls: ['./newrest.component.css']
})
export class NewrestComponent implements OnInit {
  errors: any;
  allAuths: any;
  newrest: any;
  constructor(private _httpService: HttpService, private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    // this.addAuthsFromService();
    this.newrest = { name: "", cusinie: "" };
    this.errors = { name: "", cusinie: "" };
  }

  addrestFromService() {
    let observable = this._httpService.addrest(this.newrest);
    observable.subscribe(data => {
      console.log(this.newrest);
      console.log(data['msg']);
      if (data['msg'] != "Error") {
        this.newrest = { name: "", cusinie: "" };
        this.errors = { name: "", cusinie: "" };
        this._router.navigate(['/']);
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

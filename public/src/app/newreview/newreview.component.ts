import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-newreview',
  templateUrl: './newreview.component.html',
  styleUrls: ['./newreview.component.css']
})
export class NewreviewComponent implements OnInit {
  editrest: any;
  id: any;
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
    this.editrest = { customer: "", star: "", desc: "" };
    this.errors = { customer: "", star: "", desc: "" };
  }
  showEditForm(id) {

    // this.showdetail = !this.showdetail;
    let observable = this._httpService.getOne(id);
    observable.subscribe(data => {
      console.log("One Task!!", data);
      this.editrest = data['result'];
      console.log("One rest to edit ", this.editrest);
    });
  }


  onEditaddrev() {
    // edit_task.showEditForm = false;
    let observable = this._httpService.editAuthoraddreview(this.editrest);
    observable.subscribe(data => {
      console.log('Edit ', data);
      // this.edit_task = data;
      // this.editAuth = { name: "" };
      // this._router.navigate(['/']);

      if (data['msg'] != "Error") {
        this.id = this.editrest._id;
        console.log(this.id)
        this.editrest = { customer: "", star: "", desc: "" };
        this.errors = { customer: "", star: "", desc: "" };
        this._router.navigate([`/rest/${this.id}`]);
      }
      else {
        console.log("Error", data['msg'])
        this.errors.customer = data['msg'] + " Customer Name is Require";
        console.log(this.errors.customer);
        this.errors.desc = data['msg'] + " Description is Require";
        console.log(this.errors.desc);
        this.errors.star = data['msg'] + " Rating is Require";
        console.log(this.errors.star);
      }

    });

  }
}

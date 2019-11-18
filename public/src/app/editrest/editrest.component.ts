import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-editrest',
  templateUrl: './editrest.component.html',
  styleUrls: ['./editrest.component.css']
})
export class EditrestComponent implements OnInit {

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
    this.editrest = { name: "", cusinie: "" };
    this.errors = { name: "", cusinie: "" };
  }
  showEditForm(id) {

    // this.showdetail = !this.showdetail;
    let observable = this._httpService.getOne(id);
    observable.subscribe(data => {
      console.log("One Task!!", data);
      this.editrest = data['result'];
      console.log("One Rest to edit ", this.editrest);
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

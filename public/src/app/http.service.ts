import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  getresturant() {
    return this._http.get("/api");
  }

  addrest(newrest) {
    return this._http.post("/api", newrest);
  }

  getOne(id) {
    return this._http.get(`/api/${id}`);
  }

  editrest(editAuth) {
    return this._http.put(`/api/${editAuth._id}`, editAuth);
  }

  delelteOnerest(Aid) {
    return this._http.delete(`/api/${Aid}`);
  }

  editAuthoraddreview(editAuth) {
    return this._http.put(`/api/${editAuth._id}/new`, editAuth);
  }

}

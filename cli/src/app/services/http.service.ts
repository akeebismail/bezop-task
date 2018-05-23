import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  get (url) {
      return this.http.get(url);
  }

  post (url, data={}, options=this.options()) {
      return this.http.post(url, data, options);
  }

  options () {
      let authToken = localStorage.getItem('test.token') || '';
      let headers = new HttpHeaders();
      if (authToken !== '') {
          headers.append('Authorization', authToken);
      }
      return {headers: headers};
  }
}

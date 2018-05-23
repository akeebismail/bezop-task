import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../services/http.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    email = '';
    password = '';

    constructor(private httpService: HttpService) {

    }

    ngOnInit() {

    }

    submitForm() {

    }

    inputsInvalid() {
        return (this.email.length < 5 || this.password.length < 1);
    }
}



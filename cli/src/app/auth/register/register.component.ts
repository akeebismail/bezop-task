import { Component, OnInit } from '@angular/core';
import { HttpService } from "../../services/http.service";
import {URLS} from "../../common/urls";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    email = '';
    password = '';
    name = '';

    constructor(private httpService: HttpService) { }

    ngOnInit() {
    }

    submitForm() {
        const data = {
            email: this.email,
            password: this.password,
            name: this.email
        };
        this.httpService.post(URLS.REGISTER, data)
            .subscribe((res) => {
                console.log(res);
            });
    }

    inputsInvalid() {
        return (this.email.length < 5 || this.password.length < 1);
    }

}

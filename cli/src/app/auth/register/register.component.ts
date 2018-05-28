import { Component, OnInit } from '@angular/core';
import { HttpService } from "../../services/http.service";
import {URLS} from "../../common/urls";
import {NgxSpinnerService} from "ngx-spinner";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {APIResponse} from "../../interfaces/response";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    email = '';
    password = '';
    cPassword = '';
    name = '';
    username = '';
    errors = [];

    constructor(private httpService: HttpService,
                private spinner: NgxSpinnerService,
                private router: Router,
                private authService: AuthService) { }

    ngOnInit() {
    }

    submitForm() {
        this.spinner.show();
        const data = {
            email: this.email,
            password: this.password,
            name: this.name,
            username: this.username
        };
        this.httpService.post(URLS.REGISTER, data)
            .subscribe((res: APIResponse) => {
                this.spinner.hide();
                this.authService.saveUserDetails(res.data);
                this.router.navigate(['/dashboard']);
            }, (err) => {
                this.spinner.hide();
                this.processError(err.error.errors);
            });
    }

    inputsInvalid() {
        return (this.email.length < 5 || this.password.length < 1 || (this.password !== this.cPassword));
    }

    processError(errors) {
        this.errors = Object.values(errors);
    }

}

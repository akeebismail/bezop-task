import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {APIResponse} from "../../interfaces/response";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    email = '';
    password = '';
    errors = [];
    errMsg = '';

    constructor(private authService: AuthService,
                private spinner: NgxSpinnerService,
                private router: Router) {
    }

    ngOnInit() {

    }

    submitForm() {
        this.spinner.show();
        const data = {
            email: this.email,
            password: this.password
        };
        this.authService.login(data)
            .subscribe((res: APIResponse) => {
                if (!res.status) {
                    this.spinner.hide();
                    this.errMsg = 'Incorrect Credentials';
                } else {
                    this.spinner.hide();
                    this.authService.saveUserDetails(res.data);
                    this.router.navigate(['/dashboard']);
                }
            }, (err) => {
                this.spinner.hide();
                this.errors = err.error.errors;
            })
    }

    inputsInvalid() {
        return (this.email.length < 5 || this.password.length < 1);
    }
}



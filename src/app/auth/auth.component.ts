import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthModel} from "./auth.model";
import {AuthResponseData, AuthService} from "../shared/auth.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  signupForm: FormGroup;
  isLoginMode = true;
  submitted = false;
  isLoading = false;
  error: string = null;
  userCreateMessage: string = null

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.signupForm = new FormGroup({
      "email": new FormControl(null, [Validators.required, Validators.email]),
      "password": new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode
  }

  onSubmit() {
    this.submitted = true;
    if (!this.signupForm.valid) {
      return
    }

    let authObs: Observable<AuthResponseData>

    this.isLoading = true

    if (this.isLoginMode) {
      authObs = this.authService.login(this.signupForm.value)
      //login
    } else {
      this.isLoginMode = true;
      authObs = this.authService.register(this.signupForm.value)
      this.userCreateMessage = "User was created successfully!"
      //register
    }
    authObs.subscribe({
      next: data => {
        this.isLoading = false;
        this.error = null
      },
      error: (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    })

    this.signupForm.reset();
  }

  closeAlert() {
    this.userCreateMessage = null
  }
}

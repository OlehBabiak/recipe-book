import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthModel} from "./auth.model";
import {AuthService} from "../shared/auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit{
  signupForm: FormGroup;
  isLoginMode = true
  submitted = false;

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
    if(this.isLoginMode) {
      this.authService.login(this.signupForm.value)
        .subscribe(response => {
          console.log(response)
        })
      //login
    }else {
      this.isLoginMode = true;
      this.authService.register(this.signupForm.value)
        .subscribe(data => {
          console.log(data)
        })
      //register
    }
    this.signupForm.reset();
  }
}

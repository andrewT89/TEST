import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login.component.scss'],
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      userName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      password2: new FormControl(null, Validators.required)
    }, {validators: this.isEquals('password' , 'password2')});
  }

  // tslint:disable-next-line: typedef
  private isEquals(field1: string, field2: string) {
    return (group: FormGroup) => {
      const pass1 = group.controls[field1].value;
      const pass2 = group.controls[field2].value;

      if (pass1 === pass2) {
        return null;
      }

      return {
        isEquals: true,
      };
    };
  }

  public register(): void {}
}

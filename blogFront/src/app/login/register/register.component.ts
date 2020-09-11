import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login.component.scss'],
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;

  constructor(
    private router: Router,
    private userSer: UserService
  ) {}

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

  public register(): void {
    if (this.registerForm.valid) {
      this.userSer.register(this.registerForm.value)
      .subscribe((resp: any) => {
        if (resp) {
          Swal.fire(
            'Registro!',
            'Usuario registrado correctamente.',
            'success'
          );
          this.router.navigate(['/login']);
        }
      });
    }
  }
}

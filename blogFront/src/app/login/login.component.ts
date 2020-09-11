import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/service.index';
import { Router } from '@angular/router';
import { User } from '../models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(
    private userServ: UserService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [ Validators.required ]),
      password: new FormControl(null, [ Validators.required ])
    });
  }

  public singIn(): void {

    if (this.loginForm.valid) {
      this.userServ
      .loginUser(this.loginForm.value)
      .subscribe(resp => {
        if (resp) {
          debugger;
          const userStorage = new User();
          userStorage.userName = resp.userName;
          userStorage.email = resp.email;
          userStorage.userId = resp.userId;
          this.userServ.saveStorage(resp.token, userStorage);
          this.router.navigate(['/home']);
        }
      });
    }
  }

}

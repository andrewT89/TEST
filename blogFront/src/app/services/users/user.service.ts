import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { User } from '../../models';

@Injectable()
export class UserService {
  headers = new HttpHeaders();
  token: string;
  constructor(private http: HttpClient, private router: Router) {
    this.loadStorage();
  }

  public loginUser(user: User): any {
    return this.http.post(`${environment.apiUrl}user/user-login`, user, { headers: this.headers });
  }

  public loadStorage(): any {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
    } else {
      this.token = '';
    }
  }

  public logout(): void {
    this.router.navigate(['/login']);
  }

  public register(user: User): any {
    return this.http.post(`${environment.apiUrl}user/register`, user, { headers: this.headers });
  }

  public isLogin(): boolean {
    return this.token ? true : false;
  }

  public saveStorage(token: string, usuario: User): any {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(usuario));
    this.token = token;
  }

  public deleteStorage(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}

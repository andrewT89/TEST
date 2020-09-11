import { Component, OnInit } from '@angular/core';
import {SidebarService} from '../../services/service.index';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  usuario: User;

  constructor(
    public _sideBar: SidebarService) { }

  ngOnInit() {
    // this.usuario = this._userService.usuario;
    this._sideBar.loadMenu();
  }

}

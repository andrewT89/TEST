import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import {
  SidebarService,
  UserService,
  ArticleService
} from './service.index';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SidebarService,
    UserService,
    ArticleService
  ],
  declarations: []
})
export class ServiceModule {
}

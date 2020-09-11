import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { PAGES_ROUTES } from './pages.routing';
import { ShareModule } from '../shared/share.module';
import { ArticlesModule } from './articles/articles.module';
import { HomeModule } from './home/home.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [PagesComponent],
  imports: [
    CommonModule,
    ShareModule,
    ArticlesModule,
    HomeModule,
    NgbModule,
    PAGES_ROUTES
  ],
  exports: [NgbModule]
})
export class PagesModule { }

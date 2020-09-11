import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticlesComponent } from './articles.component';
import { ArticleComponent } from './article/article.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DetailArticleComponent } from './components/modals/detail-article/detail-article.component';

@NgModule({
  declarations: [
    ArticlesComponent,
    ArticleComponent
  ],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ],
  entryComponents: [DetailArticleComponent]
})
export class ArticlesModule { }

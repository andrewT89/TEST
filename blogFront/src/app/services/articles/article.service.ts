import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Article } from '../../models/article.model';

@Injectable()
export class ArticleService {
  constructor(private http: HttpClient) {}

  public saveArticle(article: Article): any {
      return this.http.post(`${environment.apiUrl}article`, article);
  }

  public editArticle(article: Article, idArticle: string): any {
    return this.http.put(`${environment.apiUrl}article/${idArticle}`, article);
  }

  public deleteArticle(idArticle: string): any {
    return this.http.delete(`${environment.apiUrl}article/${idArticle}`);
  }

  public getArticles(ofSet: number = 0): any {
    return this.http.get(`${environment.apiUrl}article/allArticles?ofSet=${ofSet}`);
  }

  public articleByID(id: string): any {
      return this.http.get<Article>(`${environment.apiUrl}article/artById/${id}`);
  }
}

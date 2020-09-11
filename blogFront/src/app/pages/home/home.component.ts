import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/service.index';
import { Article } from '../../models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  articles: Article[] = [];
  subscription: Subscription[] = [];
  ofSet = 0;
  totalRegisters = 0;
  isNotMore = false;

  constructor(public artServ: ArticleService) {}

  ngOnInit(): void {
    this.getArticles();
  }

  showMore(val: number): any {
    const ofSet = this.ofSet + val;

    if (ofSet > this.totalRegisters) {
      this.isNotMore = true;
      return;
    }
    if (ofSet < 0) {
      return;
    }

    this.ofSet += val;
    this.showMoreArticles();
  }

  getArticles(): any {
    this.artServ.getArticles(this.ofSet).subscribe((data: any) => {
      if (data) {
        this.totalRegisters = data ? data.total : 0;
        this.articles = data ? data.articles : [];
      }
    });
  }

  showMoreArticles(): any {
    this.artServ.getArticles(this.ofSet).subscribe((data: any) => {
      if (data) {
        this.totalRegisters = data ? data.total : 0;
        this.articles.push(...data.articles);
        // this.articles = data ? data.articles : [];
      }
    });
  }

  // tslint:disable-next-line: no-unused-expression
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
}

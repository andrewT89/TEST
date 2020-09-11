import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/articles/article.service';
import Swal from 'sweetalert2';
import { Article } from '../../models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetailArticleComponent } from './components/modals/detail-article/detail-article.component';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit {
  articles: Article[] = [];

  // Pagination variables
  ofSet = 0;
  totalRegisters = 0;

  constructor(
    private artServ: ArticleService,
    private modalService: NgbModal
    ) {}

  ngOnInit(): void {
    this.getArticles();
  }

  getArticles(): void {
    this.artServ.getArticles(this.ofSet).subscribe((data: any) => {
      if (data) {
        this.totalRegisters = data ? data.total : 0;
        this.articles = data ? data.articles : [];
      }
    });
  }

  changeOfSet(val: number): any {
    const ofSet = this.ofSet + val;

    if (ofSet >= this.totalRegisters) {
      return;
    }
    if (ofSet < 0) {
      return;
    }

    this.ofSet += val;
    this.getArticles();
  }

  viewDetails(article: Article): void {
    const modalRef = this.modalService.open(DetailArticleComponent, { centered: true });
    modalRef.componentInstance.detail = article;
  }

  deleteArt(idArticle: string): any {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Estas seguro de eliminar el registro!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, eliminar!',
      cancelButtonText: 'No, cancelar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.artServ.deleteArticle(idArticle).subscribe(() => {
          Swal.fire(
            'Articulo!',
            'Registro eliminado correctamente.',
            'success'
          );
          this.getArticles();
        });
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  articleForm: FormGroup;
  idArticle: string = null;

  constructor(
    public activatedRoute: ActivatedRoute,
    private artServ: ArticleService,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe((params: any) => {
      const { id } = params;
      this.idArticle = id;

      if (id !== 'new') {
        this.loadArticleById(id);
      }
    });
  }

  ngOnInit(): void {
    this.articleForm = new FormGroup({
      _id: new FormControl(null, []),
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      createdAt: new FormControl(null, []),
    });
  }

  loadArticleById(id: string): any {
    this.artServ.articleByID(id).subscribe((data: any) => {
      if (data) {
        this.articleForm.patchValue(data.article);
      }
    });
  }

  save(): void {
    if (this.articleForm.valid) {
      this.artServ
        .saveArticle(this.articleForm.value)
        .subscribe((data: any) => {
          if (data) {
            Swal.fire(
              'Articulo!',
              'Registro almacenado correctamente.',
              'success'
            );
            this.router.navigate(['/articles']);
          }
        });
    }
  }

  edit(): void {
    if (this.articleForm.valid) {
      this.artServ
        .editArticle(this.articleForm.value, this.idArticle)
        .subscribe((data: any) => {
          if (data) {
            Swal.fire(
              'Articulo!',
              'Se actualizo el registro correctamente.',
              'success'
            );
            this.router.navigate(['/articles']);
          }
        });
    }
  }
}

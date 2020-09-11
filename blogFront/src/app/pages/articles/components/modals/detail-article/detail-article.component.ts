import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-detail-article',
  templateUrl: './detail-article.component.html',
  styleUrls: ['./detail-article.component.scss']
})
export class DetailArticleComponent implements OnInit {

  @Input() public detail: any;

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {

  }

}

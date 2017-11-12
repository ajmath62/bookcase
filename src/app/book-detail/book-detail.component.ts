import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core'

import { Book } from '../book'

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BookDetailComponent implements OnInit {
  @Input() book: Book

  constructor() { }

  ngOnInit() {
  }

}

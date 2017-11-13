import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core'

import { Book } from '../book'
import { BookService} from '../book.service'

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BookDetailComponent implements OnInit {
  @Input() book: Book
  @Input() mode: [string]

  constructor(private bookService: BookService) { }

  ngOnInit() {
  }

  exit(): void {
    this.mode[0] = 'list'
  }

  save(): void {
    this.bookService.updateBook(this.book).subscribe(() => this.exit())
  }

  remove(): void {
    // AJK TODO make this disappear from the list w/o refreshing
    this.bookService.deleteBook(this.book.id).subscribe(() => this.exit())
  }

}

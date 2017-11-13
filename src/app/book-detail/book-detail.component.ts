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

  clear(): void {
    this.mode[0] = 'list'
  }

  save(): void {
    this.bookService.updateBook(this.book).subscribe(() => this.clear())
  }

}

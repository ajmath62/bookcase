import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core'

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
  @Output() action = new EventEmitter<[string, Book]>()

  constructor(private bookService: BookService) { }

  ngOnInit() {
  }

  cancel(): void {
    this.action.emit(['cancel', null])
  }

  save(): void {
    this.action.emit(['save', this.book])
  }

  remove(): void {
    this.action.emit(['remove', this.book])
  }

}

import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

import { Book } from '../book'
import { BookService } from '../book.service'

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BookCreateComponent implements OnInit {
  @Output() mode = new EventEmitter<string>()
  @Output() book = new EventEmitter<Book>()

  newBook = new Book('')

  constructor(private bookService: BookService) { }

  create() {
    this.bookService.createBook(this.newBook).subscribe(book => this.book.emit(book))
  }

  ngOnInit() {
  }

}

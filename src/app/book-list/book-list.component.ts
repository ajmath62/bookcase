import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

import { Book } from '../book'

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BookListComponent implements OnInit {
  @Input() books: Book[]
  @Input() mode: [string]
  @Output() selection = new EventEmitter<Book>()

  constructor() { }

  onSelect(book: Book): void {
    this.selection.emit(book)
  }

  ngOnInit() {
  }

}

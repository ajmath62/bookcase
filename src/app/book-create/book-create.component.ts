import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

import { Book } from '../book'

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BookCreateComponent implements OnInit {
  @Input() mode: [string]
  @Output() book = new EventEmitter<Book>()

  newBook = new Book('')

  constructor() { }

  create() {
    console.log(this.newBook.title)
    console.log(this.newBook.author)
    console.log(this.newBook.location)
  }

  ngOnInit() {
  }

}

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
  @Output() mode = new EventEmitter<string>()
  @Output() selection = new EventEmitter<number>()

  constructor() { }

  onSelect(index: number): void {
    this.selection.emit(index)
  }

  ngOnInit() {
  }

}

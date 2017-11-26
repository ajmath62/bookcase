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
  @Input() selection: number
  @Output() mode = new EventEmitter<string>()
  @Output() selectionChange = new EventEmitter<[string, number]>()
  clickMode: string

  constructor() { }

  onSelect(index: number): void {
    if (this.selection === null) this.clickMode = 'select'
    this.selectionChange.emit([this.clickMode, index])
  }

  // AJK TODO get rid of unnecessary code like this
  ngOnInit() {
  }

}

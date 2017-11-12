import { Component, OnInit, ViewEncapsulation } from '@angular/core'
import { Book } from '../book'

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BooksComponent implements OnInit {
  book: Book = {
    id: 1,
    title: 'Anne of Green Gables',
    author: 'L. M. Montgomery',
    location: 32767
  }

  constructor() { }

  ngOnInit() {
  }

}

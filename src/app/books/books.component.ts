import { Component, OnInit, ViewEncapsulation } from '@angular/core'
import { Book } from '../book'
import { BookService } from '../book.service'

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BooksComponent implements OnInit {
  books: Book[]
  selectedBook: Book
  mode: [string] = ['list']

  onSelect(book: Book): void {
    this.selectedBook = book
    this.mode[0] = 'detail'
  }

  getAllBooks(): void {
    // Get all books from the book service, then use Observable.subscribe to
    // assign the response data to this.books.
    this.bookService.getAllBooks().subscribe(books => this.books = books)
  }

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.getAllBooks()
  }

}

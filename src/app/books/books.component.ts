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
  selectedIndex: number
  mode: string = 'list'

  constructor(private bookService: BookService) { }

  getAllBooks(): void {
    // Get all books from the book service, then use Observable.subscribe to
    // assign the response data to this.books.
    this.bookService.getAllBooks().subscribe(books => this.books = books)
  }

  selectBook(index: number): void {
    let book: Book = this.books[index]
    let bookCopy: Book = {
      id: book.id,
      title: book.title,
      author: book.author,
      location: book.location
    }
    this.selectedBook = bookCopy
    this.selectedIndex = index
    this.mode = 'detail'
  }

  newBook(book: Book): void {
    this.books.push(book)
    this.mode = 'list'
  }

  detailHandler($event: [string, Book]): void {
    let action: string = $event[0]
    let book: Book = $event[1]
    let storedBook: Book = this.books[this.selectedIndex]
    switch (action) {
      case 'save':
        this.bookService.updateBook(book).subscribe()
        storedBook.title = book.title
        storedBook.author = book.author
        break;
      case 'remove':
        this.bookService.deleteBook(storedBook.id).subscribe()
        // Remove the indexed book from the list of books
        this.books = this.books.slice(0, this.selectedIndex).concat(this.books.slice(this.selectedIndex+1))
        break;
      default:
        break;
    }
    this.mode = 'list'
    this.selectedBook = null
    this.selectedIndex = null
  }

  ngOnInit() {
    this.getAllBooks()
  }

}

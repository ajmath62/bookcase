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
  books: Book[] = []
  selectedBook: Book = null
  selectedIndex: number = null
  mode: string = 'list'

  constructor(private bookService: BookService) { }

  getAllBooks(): void {
    // Get all books from the book service, then use Observable.subscribe to
    // assign the response data to this.books.
    this.bookService.getAllBooks().subscribe(books => this.books = books)
  }

  deselect(): void {
    this.mode = 'list'
    this.selectedBook = null
    this.selectedIndex = null
  }

  listHandler($event: [string, number]): void {
    let action: string = $event[0]
    let index: number = $event[1]
    let book: Book = this.books[index]
    let bookCopy: Book = {
      id: book.id,
      title: book.title,
      author: book.author,
    }
    switch (action) {
      case 'select':
        this.selectedBook = bookCopy
        this.selectedIndex = index
        this.mode = 'detail'
        break;
      case 'move':
        this.bookService.moveBook(this.books[this.selectedIndex].id, this.books[index].id).subscribe()
        if (index === this.selectedIndex) break;
        else if (index < this.selectedIndex) {
          // AJK TODO multiline this
          this.books = this.books.slice(0, index).concat(this.books[this.selectedIndex]).concat(this.books.slice(index, this.selectedIndex)).concat(this.books.slice(this.selectedIndex+1))
        }
        else {
          this.books = this.books.slice(0, this.selectedIndex).concat(this.books.slice(this.selectedIndex+1, index)).concat(this.books[this.selectedIndex]).concat(this.books.slice(index))
        }
        this.deselect()
        break;
      default:
        break;
    }
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
    this.deselect()
  }

  ngOnInit() {
    this.getAllBooks()
  }

}

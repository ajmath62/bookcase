import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Rx'
import { of } from 'rxjs/observable/of'

import { Book } from './book'
import { BOOKS } from './mock-books'

@Injectable()
export class BookService {

  constructor() { }
  getAllBooks(): Observable<Book[]> {
    return of(BOOKS)
  }

}

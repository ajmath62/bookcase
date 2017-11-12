import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Rx'
import { of } from 'rxjs/observable/of'

import { Book } from './book'

@Injectable()
export class BookService {
  private bookUrl: string = 'http://localhost:8000/api/v1/books/'

  constructor(private http: HttpClient) { }
  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.bookUrl)
  }

}

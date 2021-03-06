import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Rx'
import { of } from 'rxjs/observable/of'

import { Book } from './book'

@Injectable()
export class BookService {
  private baseUrl: string = 'http://localhost:8000/api/v1/books/'
  private listUrl: string = this.baseUrl
  private detailUrl: (id: number) => string = (id: number) => `${this.baseUrl}${id}/`
  private createUrl: string = this.baseUrl
  private editUrl: (id: number) => string = (id: number) => `${this.detailUrl(id)}edit/`
  private deleteUrl: (id: number) => string = (id: number) => `${this.detailUrl(id)}delete/`
  private moveUrl: (id: number) => string = (id: number) => `${this.detailUrl(id)}place-after/`

  constructor(private http: HttpClient) { }

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.listUrl)
  }

  updateBook(book: Book): Observable<any> {
    return this.http.post(this.editUrl(book.id), book)
  }

  createBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.createUrl, book)
  }

  deleteBook(id: number): Observable<any> {
    return this.http.post(this.deleteUrl(id), {})
  }

  moveBook(id: number, afterId: number): Observable<any> {
    return this.http.post(this.moveUrl(id), {after: afterId})
  }

}

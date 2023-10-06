import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookDetails } from '../types';
import { BehaviorSubject, pipe, tap, withLatestFrom } from 'rxjs';

const BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private bookDetails$$ =  new BehaviorSubject<BookDetails[]>([]);

  bookDetails$ = this.bookDetails$$.asObservable();

  constructor(private http: HttpClient) { }

  loadBookDetails() {
    return this.http.get<BookDetails[]>(`${BASE_URL}/bookDetails`)
      .pipe(
        tap((bookDetails) => {
          this.bookDetails$$.next(bookDetails)
        }),
      )
  }

  deleteBookDetail({ id }: BookDetails) {
    return this.http.delete<BookDetails>(`${BASE_URL}/bookDetails/${id}`)
      .pipe(
        withLatestFrom(this.bookDetails$$),
        tap(([_, bookDetails]) => {
          this.bookDetails$$.next(
            bookDetails.filter((bookDetail) => bookDetail.id !== id),
          );
        }),
      )
  }

  updateBookDetail({ id, ...data }: BookDetails) {
    return this.http.patch<BookDetails>(`${BASE_URL}/bookDetails/${id}`, data)
      .pipe(
        withLatestFrom(this.bookDetails$$),
        tap(([updatedBookDetail, bookDetail]) => {
          this.bookDetails$$.next(
            bookDetail.map(bookDetail => bookDetail.id === id ? updatedBookDetail : bookDetail)
          );
        }),
      )
  }
}

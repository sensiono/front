import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Book } from '../Models/book/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUrl = 'http://localhost:8084/books'; // Update with your backend API URL

 constructor(private http: HttpClient) { }

 private getHeaders(): HttpHeaders {
  const jwt = localStorage.getItem('jwt'); // Retrieve JWT token
  if (!jwt) {
    console.warn("JWT token is missing");
  }

  return new HttpHeaders({
    Authorization: `Bearer ${jwt}`,
    'Content-Type': 'application/json'
  });
}
/*
  saveBook(bookRequest: BookRequest): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/saveBook`, bookRequest);
  }
  */
  saveBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${this.baseUrl}/saveBook`, book, { headers: this.getHeaders() });
  }

  findBookById(bookId: number): Observable<BookResponse> {
    return this.http.get<BookResponse>(`${this.baseUrl}/jsp/${bookId}`);
  }
  findAllBooks(page: number = 0, size: number = 10): Observable<Book[]> {
    const params = { page: page.toString(), size: size.toString() };
    return this.http.get<Book[]>(`${this.baseUrl}/all`, { params });
  }

  findAllBooksByOwner(page: number = 0, size: number = 10): Observable<PageResponse<BookResponse>> {
    const url = `${this.baseUrl}/owner`;
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + localStorage.getItem('token')); // Add authorization token if needed

    return this.http.get<PageResponse<BookResponse>>(url, { params, headers });
  }
  recommendBooksByTopGenre(ownerId: number): Observable<Book[]> {
    const params = new HttpParams().set('ownerId', ownerId.toString());
    const headers = this.getHeaders();

    return this.http.get<Book[]>(`${this.baseUrl}/recommendBooksByTopGenre`, { params, headers });
  }

 // borrowBook(_bookId: number): Observable<number> {
 //  return this.http.post<Book>(`${this.baseUrl}/borrow/`, Book, { headers: this.getHeaders() });}

  // Add other methods here according to your backend API

}

// Define interfaces for request and response payloads
interface BookRequest {
  // Define properties of your book request payload
}

interface BookResponse {
  // Define properties of your book response payload
}

interface BorrowedBookResponse {
  // Define properties of your borrowed book response payload
}

interface PageResponse<T> {
  content: T[];
  pageable: any; // You can define a more specific type for pageable
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: any; // You can define a more specific type for sort
  numberOfElements: number;
  first: boolean;
  empty: boolean;

}

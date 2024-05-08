import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {  OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { BookService } from 'src/app/services/book.service'; // Import the BookService
import { Book } from 'src/app/Models/book/book.module';
import { User } from 'src/app/Models/user/user';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators'; // Import the switchMap operator
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  currentUser: User | null = null; // Declare currentUser variable
  books: Book[] = [];
  imagePaths: string[] = [
    'assets/image/l1/png/brand-logo-4.png',
    'assets/image/l1/png/brand-logo-5.png',
    'assets/image/l1/png/brand-logo-6.png',
    // Add more file paths as needed
  ];
  private baseUrl = 'http://localhost:8084/books'; // Update with your backend API URL

  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private userService: UserService,
    private bookService: BookService // Inject the BookService
  ) {}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        this.currentUser = user; // Assign the current user
        this.recommendBooksByTopGenre(); // Call loadBooks() after currentUser is fetched
        this.setRandomImagePaths();

      },
      error: (error) => {
        console.error('Error fetching current user:', error);
      }
    });
  }

  recommendBooksByTopGenre(): void {
    if (this.currentUser && this.currentUser.id) {
      this.bookService.recommendBooksByTopGenre(this.currentUser.id).subscribe({
        next: (books) => {
          this.books = books;
        },
        error: (error) => {
          console.error('Error fetching recommended books:', error);
        }
      });
    } else {
      console.error('Current user or its id is not available.');
    }
  }

  setRandomImagePaths(): void {
    const imgElements = document.querySelectorAll('.random-image') as NodeListOf<HTMLImageElement>;
    imgElements.forEach((imgElement: HTMLImageElement) => {
      const randomIndex = Math.floor(Math.random() * this.imagePaths.length);
      const randomImagePath = this.imagePaths[randomIndex];
      imgElement.src = randomImagePath;
      imgElement.alt = 'Random Image';
    });

    console.log("Image paths:", this.imagePaths);
    console.log("Number of image elements:", imgElements.length);
    console.log("Image elements:", imgElements);
  }
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
}

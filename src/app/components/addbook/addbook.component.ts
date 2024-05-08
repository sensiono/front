import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Book, Genre } from 'src/app/Models/book/book.module';
import { BookService } from 'src/app/services/book.service'; // Import the BookService
import { User } from 'src/app/Models/user/user';
@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent {


  nouvelleBook: Book = {
    id: 0,
    title: "",
    authorName: "",
    isbn: "",
    synopsis: "",
    bookCover: "",
    genre: Genre.Fiction, // Update genre property to be optional



    // archived: "", // commented out for simplicity
    // shareable: "", // commented out for simplicity
  };

  currentUser: User | null = null; // Declare currentUser variable
  books: Book[] = [];


  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private router: Router,
    private userService: UserService,
    private bookService: BookService // Inject the BookService
  ) {}


  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        this.currentUser = user; // Assign the current user
        this.loadBooks(); // Call loadBooks() after currentUser is fetched
      },
      error: (error) => {
        console.error('Error fetching current user:', error);
      }
    });
  }


  async saveBook(bookForm: NgForm): Promise<void> {
    if (bookForm.valid) {
      // Check if currentUser is defined
      if (this.currentUser) {
        this.nouvelleBook.owner = { // Assign user details to nouvelleBook
          id: this.currentUser.id,
          role: this.currentUser.role,
          firstname: this.currentUser.firstname,
          lastname: this.currentUser.lastname,
        };
      }
      this.bookService.saveBook(this.nouvelleBook).subscribe({
        next: async (response) => {
          // Generate and send PDF
          console.log('Current User:', this.currentUser?.id);
          console.log('Book added', response);
          // You can add other actions here, like showing a success message or redirecting to another page
        },
        error: (error) => {
          console.error("Error saving book:", error);
        },
      });
    }
  }
  loadBooks(): void {
    this.bookService.findAllBooks().subscribe(
      (response) => {
        this.books = response; // Assign the response directly to books
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }


  goBack() {
    this.router.navigate(['/']);
  }
}


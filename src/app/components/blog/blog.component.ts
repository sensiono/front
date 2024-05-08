import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BlogService } from 'src/app/services/blog.service';
import { UserService } from 'src/app/services/user.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
  blogForm!: FormGroup;
  tags: string[] = [];
  currentUser: any; // Store the current user
  isAuthenticated = false; // Track if the user is authenticated

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private blogService: BlogService,
    private userService: UserService,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isUserAuthenticated(); // Determine if the user is authenticated

    this.blogForm = this.fb.group({
      name: [null, Validators.required],
      content: [null, [Validators.required, Validators.maxLength(5000)]],
    });

    // If authenticated, get the current user's information
    if (this.isAuthenticated) {
      this.userService.getCurrentUser().subscribe({
        next: (user) => {
          this.currentUser = user; // Store the current user
        },
        error: (error) => {
          console.error('Error fetching current user:', error);
        },
      });
    }
  }

  createBlog(): void {
    const data = this.blogForm.value;

    // Set the "postedBy" and "img" fields automatically
    if (this.isAuthenticated && this.currentUser) {
      data.postedBy = `${this.currentUser.firstname} ${this.currentUser.lastname}`; // Set the blog's 'postedBy' with the current user's name
    }

    data.tags = this.tags; // Include tags
    data.img = 'assets/image/download.jpg'; // Default image path

    this.blogService.createNewBlog(data).subscribe({
      next: () => {
        this.snackBar.open('Blog Created Successfully!!!', 'OK');
        this.router.navigateByUrl('/'); // Redirect after successful creation
      },
      error: (error) => {
        this.snackBar.open('Something went wrong!!!', 'OK');
        console.error('Error creating blog:', error);
      },
    });
  }

  // Methods for adding/removing tags
  add(event: any): void {
    const value = (event.value || '').trim();
    if (value) {
      this.tags.push(value); // Add new tag to the list
    }
    if (event.chipInput) {
      event.chipInput.clear(); // Clear the tag input field
    }
  }

  remove(tag: any): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1); // Remove the tag from the list
    }
  }
}

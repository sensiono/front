import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { CommentService } from 'src/app/services/comment.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.css'],
})
export class ViewBlogComponent implements OnInit {
  blogId = this.activatedRoute.snapshot.params['id'];
  blogData: any;
  comments: any;
  commentForm!: FormGroup;
  currentUser: any; // Store the current user

  constructor(
    private blogService: BlogService,
    private activatedRoute: ActivatedRoute,
    private matSnackBar: MatSnackBar,
    private fb: FormBuilder,
    private commentService: CommentService,
    private authService: AuthServiceService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getBlogById(); // Load the blog data
    this.commentForm = this.fb.group({
      content: [null, Validators.required], // No "postedBy" form field
    });

    // Get the current user
    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        this.currentUser = user;
      },
      error: (error) => {
        console.error("Error fetching current user:", error);
      },
    });
  }

  publishComment(): void {
    const content = this.commentForm.get("content")?.value;

    if (!this.currentUser) {
      this.matSnackBar.open("User not authenticated", "Ok");
      return; // Ensure the current user is set
    }

    this.commentService
      .createComment(this.blogId, this.currentUser.firstname, content) // Use the current user's name
      .subscribe({
        next: (res) => {
          this.matSnackBar.open("Comment Published Successfully!", "Ok");
          this.getCommentByBlog(); // Reload comments
        },
        error: () => {
          this.matSnackBar.open("Something Went Wrong!", "Ok");
        },
      });
  }

  getCommentByBlog(): void {
    this.commentService.getAllCommentsByBlog(this.blogId).subscribe({
      next: (res) => {
        this.comments = res; // Assign comments received from the backend to the component property
      },
      error: () => {
        this.matSnackBar.open("Something Went Wrong!", "Ok");
      },
    });
  }

  getBlogById(): void {
    this.blogService.getBlogById(this.blogId).subscribe({
      next: (res) => {
        this.blogData = res;
        console.log(res);
        this.getCommentByBlog(); // Load comments when blog data is fetched
      },
      error: () => {
        this.matSnackBar.open("Error loading blog data", "Ok");
      },
    });
  }

  likeBlog(): void {
    this.blogService.likeBlog(this.blogId).subscribe({
      next: () => {
        this.matSnackBar.open("Blog Liked Successfully!", "Ok");
        this.getBlogById(); // Reload the blog after liking it
      },
      error: () => {
        this.matSnackBar.open("Something Went Wrong!", "Ok");
      },
    });
  }

  deleteComment(commentId: number) {
    this.commentService.deleteComment(this.blogId, commentId).subscribe(
      () => {
        // Success case
        this.matSnackBar.open("Comment deleted successfully", "Ok");
        this.getCommentByBlog();
      },
      error => {
        // Check if the error status is 404
        if (error.status === 404) {
          // Treat 404 as successful deletion
          this.matSnackBar.open("Comment deleted successfully", "Ok");
          this.getCommentByBlog();
        } else {
          // Check if the error status is 200 (success)
          if (error.status === 200) {
            // Treat 200 as successful deletion
            this.matSnackBar.open("Comment deleted successfully", "Ok");
            this.getCommentByBlog();
          } else {
            // Handle other errors
            this.matSnackBar.open("Failed to delete comment", "Ok");
          }
        }
      }
    );
  }

}

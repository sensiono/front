import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BlogService } from 'src/app/services/blog.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-view-blogs',
  templateUrl: './view-blogs.component.html',
  styleUrls: ['./view-blogs.component.css']
})
export class ViewBlogsComponent {

  allBlogs:any;
  constructor(private blogService: BlogService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog){}
    ngOnInit(){
      this.getRankedBlogs();
    }
    getRankedBlogs() {
      this.blogService.getRankedBlogs().subscribe(
        (res) => {
          console.log(res);
          this.allBlogs = res;
        },
        (error) => {
          this.snackBar.open('Something went wrong!!!', 'OK');
        }
      );
    }
    





  deleteBlog(blogId: number) {
    this.blogService.deleteBlog(blogId).subscribe(
      (res) => {
        this.snackBar.open('Blog deleted successfully!', 'OK');
        // Refresh data after deletion
        this.getRankedBlogs();
      },
      (error) => {
        this.snackBar.open('Failed to delete blog!', 'OK');
      }
    );
  }
  toggleEdit(blog: any) {
    blog.editing = !blog.editing;
  }

  saveBlog(blog: any) {
    // Implement logic to save updated blog details
    // Call the update method from BlogService
    // Reset editing flag
    blog.editing = false;
  }

  cancelEdit(blog: any) {
    // Reset the blog details to their original values
    // Reset editing flag
    blog.editing = false;
  }

}

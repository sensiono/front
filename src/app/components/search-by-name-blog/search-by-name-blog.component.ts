import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-search-by-name-blog',
  templateUrl: './search-by-name-blog.component.html',
  styleUrls: ['./search-by-name-blog.component.css']
})
export class SearchByNameBlogComponent {

  result:any= [];
  name:any = "";
  constructor(private blogService: BlogService, 
    private snackBar: MatSnackBar ){}

    searchByName(){
      this.blogService.searchByName(this.name).subscribe((res: any)=>{
        this.result = res;
        console.log(this.result);
      },()=>{
        this.snackBar.open("Something Went Wrong", "ok")
      })
    }
}

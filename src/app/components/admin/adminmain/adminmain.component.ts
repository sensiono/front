import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router'; // Import Router
import { User } from 'src/app/Models/user/user';
import { HttpClient } from '@angular/common/http';
import { Role } from 'src/app/Models/user/role';
@Component({
  selector: 'app-adminmain',
  templateUrl: './adminmain.component.html',
  styleUrls: ['./adminmain.component.css']
})
  export class AdminmainComponent implements OnInit {
    users: User[] = []; // Use the User interface for type safety
    id: number = 0;
    firstname: string = '';
    lastname: string = '';
    email: string = '';
    password: string = '';
    role: Role = Role.ROLE_ADMIN;

    constructor(private http: HttpClient, private userService: UserService,private router: Router // Inject Router
  ) {}

    ngOnInit(): void {
      this.loadUsers();
    }

    addUser(): void {
      const newUser: User = {
        id: this.id,
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        password: this.password,
        role: this.role
      };


      this.userService.register(newUser).subscribe(
        response => {
          // Handle response or errors here
        },
        error => {
          console.error('Error adding user:', error);
        }
      );
    }


    deleteUserWithTokens(userId: number): void {
      this.userService.deleteUserWithTokens(userId).subscribe(
        response => {
          console.log(response); // Log the response message
          this.loadUsers(); // Reload users after deletion
          this.router.navigate(['/admin']);



        },
        error => {
          console.error('Error deleting user:', error);
        }
      );
    }

    loadUsers(): void {
      this.userService.getAllUsers().subscribe(
        (data: User[]) => {
          this.users = data;
        },
        (error) => {
          console.error('Error loading users:', error);
        }
      );
    }
  }


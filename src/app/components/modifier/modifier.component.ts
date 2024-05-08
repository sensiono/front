import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-modifier',
  templateUrl: './modifier.component.html',
  styleUrls: ['./modifier.component.css']
})
export class ModifierComponent implements OnInit {

  userId: number = 0; // Default value or initialize in constructor
  oldPassword: string = '';
  newPassword: string = '';
  firstname: string = '';
  email: string = '';

  constructor(private userService: UserService , private router: Router) {}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        if (user) {
          this.userId = user.id!;
          this.firstname = user.firstname!;
          this.email = user.email!;
          // You can set other properties if needed
        }
      },
      error: (error) => {
        console.error('Error fetching current user:', error);
      }
    });
  }

  submitForm(): void {
    // Call updateUserProfile method or handle form submission logic here
    this.updateUserProfile();
  }
  updateUserProfile(): void {
    // Check if the current user's ID matches the userId being updated
    this.userService.getCurrentUser().subscribe({
      next: (user: User) => {
        if (user && this.userId !== user.id) {
          console.error('Unauthorized: You can only modify your own profile.');
          return; // Prevent further execution
        }

        const request = {
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
          firstname: this.firstname,
          email: this.email
        };

        this.userService.modifyUserProfile(this.userId, request)
          .subscribe(
            () => {
              // Handle success, e.g., show a success message and redirect
              console.log('User profile updated successfully');
              alert('User profile updated successfully');
              this.router.navigate(['/some-other-page']);
            },
            (error) => {
              // Handle error, e.g., show an error message
              console.error('Error updating user profile:', error);
              alert('Error updating user profile: ' + error.message);
            }
          );
      },
      error: (error) => {
        console.error('Error fetching current user:', error);
      }
    });
  }

/*
update lekhra
  updateUserProfile(): void {
    // Check if the current user's ID matches the userId being updated
    this.userService.getCurrentUser().subscribe({
      next: (user: User) => {
        if (user && this.userId !== user.id) {
          console.error('Unauthorized: You can only modify your own profile.');
          return; // Prevent further execution
        }

        const request = {
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
          firstname: this.firstname,
          email: this.email
        };

        this.userService.modifyUserProfile(this.userId, request)
          .subscribe(
            () => {
              // Handle success, e.g., show a success message
              console.log('User profile updated successfully');
              alert('User profile updated successfully');
            },
            (error) => {
              // Handle error, e.g., show an error message
              console.error('Error updating user profile:', error);
              alert('Error updating user profile: ' + error.message);
            }
          );
      },
      error: (error) => {
        console.error('Error fetching current user:', error);
      }
    });
  }








  updateUserProfile(): void {
    const request = {
      oldPassword: this.oldPassword,
      newPassword: this.newPassword,
      firstname: this.firstname,
      email: this.email
    };
    this.userService.modifyUserProfile(this.userId, request)
      .subscribe(
        () => {
          // Handle success, e.g., show a success message
          console.log('User profile updated successfully');
        },
        (error) => {
          // Handle error, e.g., show an error message
          console.error('Error updating user profile:', error);
        }
      );
  }
}
*/
}

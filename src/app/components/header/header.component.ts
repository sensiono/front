import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userConnected: any;
  decodedJwtData: any;

  registerForm: FormGroup | any;
  loginForm: FormGroup | any;

  constructor(
    private router: Router,
    private authService: AuthServiceService,
    private fb: FormBuilder
  ) {
    this.userConnected = localStorage.getItem('jwt');
    if (this.userConnected) {
      const jwt = this.userConnected;
      const jwtData = jwt.split('.')[1];
      const decodedJwtJsonData = window.atob(jwtData);
      this.decodedJwtData = JSON.parse(decodedJwtJsonData);
    }
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false],
      confirmPassword: ['', Validators.required], // Ensure this is defined
      acceptTerms: [false, Validators.requiredTrue], // Ensure this is defined
      
    });

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    
  }

  // Register
  submitForm() {
    console.log(this.registerForm.value);
    this.authService.register(this.registerForm.value).subscribe(
      (response) => {
        if (response.id != null) {
          alert("Hello " + response.firstname);
        }

        this.router.navigateByUrl('/').then(() => {
          window.location.reload(); // Reload the page
        });
      }
    );
  }

  // Login
  LogForm() {
    this.authService.login(this.loginForm.value).subscribe((response) => {
      console.log(response);
      if (response.access_token) {
        console.log('JWT Token:', response.access_token);
        const jwtToken = response.access_token;
        localStorage.setItem('jwt', jwtToken);
        
        
        
        
      }
      this.router.navigateByUrl('/').then(() => {
        window.location.reload(); // Reload the page
      });
    });
  }

  // Logout
  logout() {
    this.authService.logout().subscribe({
      next: (response) => {
        console.log('Logout successful');
        
        
        
        // Reload the page after logout and navigate to the root path
        this.router.navigate(['/']).then(() => {
          window.location.reload(); // Reload the page
        });
      },
      error: (error) => {
        console.error('Logout error:', error);
      },
    });
    localStorage.clear();
  }

  navigateToAddReclamation(event: Event): void {
    event.preventDefault(); // Prevent default link behavior
    this.router.navigate(['/ajouter-reclamation']); // Navigate programmatically
  }
}

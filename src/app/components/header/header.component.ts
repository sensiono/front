import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router: Router) {}
  navigateToAddReclamation(event: Event): void {
    event.preventDefault(); // Prevent default link behavior
    this.router.navigate(['/ajouter-reclamation']); // Navigate programmatically
  }
}

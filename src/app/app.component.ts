import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Fkhademni';
  constructor(private router: Router) {}
  navigateToAddReclamation(event: Event): void {
    event.preventDefault(); // Prevent default link behavior
    this.router.navigate(['/ajouter-reclamation']); // Navigate programmatically
  }

  

}

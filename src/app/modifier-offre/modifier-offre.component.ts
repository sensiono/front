import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Offre } from '../Models/user/offre';
import { AuthServiceService } from '../services/auth-service.service';
import { OffreService } from '../services/offre.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-modifier-offre',
  templateUrl: './modifier-offre.component.html',
  styleUrls: ['./modifier-offre.component.css']
})
export class ModifierOffreComponent implements OnInit {
  offre: Offre | null = null;
  offreId: number | null = null;
  isAdmin: boolean = false;

  constructor(
    private offreService: OffreService,
    private userService: UserService, 
    private authService: AuthServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {
 
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.offreId = +params['id'];
      
      this.offreService.getOffreById(this.offreId).subscribe({
        next: (offre) => {
          this.offre = offre;
        },
        error: (error) => {
          console.error('Error fetching offre details:', error);
          if (error.status === 403) {
            // Redirect if not authorized
            this.router.navigate(['']);
          }
        }
      });
    });
  }

  updateOffre(): void {
    if ( this.offre) {
      // Only allow modification if user is admin
      this.offreService.updateOffre(this.offre).subscribe({
        next: (response) => {
          console.log('Offre updated', response);
          // Redirect to appropriate route after update
          // Example: this.router.navigate(['/admin/offres']);
        },
        error: (error) => {
          console.error('Error updating offre:', error);
          if (error.status === 403) {
            this.router.navigate(['']); // Redirect if unauthorized
            console.error("permission denied:", error);
          }
        }
      });
    } else {
      console.warn("Only admins can modify offres."); // Warn non-admin users
      this.router.navigate(['']);
    }
  }
}


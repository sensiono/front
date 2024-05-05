import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReclamationService } from 'src/app/services/reclamation.service';
import { Reclamation } from 'src/app/Models/reclamation/reclamation';
import { MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { PopupComponent } from '../ajout-reclamation/popupconfirmation/popup/popup.component';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-modifier-reclamation',
  templateUrl: './modifier-reclamation.component.html',
  styleUrls: ['./modifier-reclamation.component.css'],
})
export class ModifierReclamationComponent implements OnInit {
  reclamation: Reclamation | null = null;
  reclamationId: number | null = null;
  isAdmin: boolean = false;

  constructor(
    private reclamationService: ReclamationService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthServiceService,

  ) {
    this.isAdmin = this.authService.isUserAdmin();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.reclamationId = +params['id'];
      this.loadReclamation();
    });
  }

  loadReclamation(): void {
    if (this.reclamationId) {
      this.reclamationService.getReclamationById(this.reclamationId).subscribe(
        (reclamation) => {
          this.reclamation = reclamation;
        },
        (error) => {
          console.error("Error loading reclamation:", error);
          if (error.status === 403) {
            // Redirect to login if not authorized
            this.router.navigate(['']);
          }
        }
      );
    }
  }

  modifierReclamation(reclamationForm: NgForm): void {
    if (this.isAdmin && reclamationForm.valid && this.reclamation) {
      // Only allow modification if user is admin
      this.reclamationService.updateReclamation(this.reclamation).subscribe({
        next: () => {
          this.dialog.open(PopupComponent, { width: '400px' });
          this.router.navigate(['/admin/reclamations']); // Redirect to admin/reclamations
        },
        error: (error) => {
          console.error("Error updating reclamation:", error);
          if (error.status === 403) {
            this.router.navigate(['']); // Redirect if unauthorized
            console.error("permission denied:", error);
          }
        },
      });
    } else {
      console.warn("Only admins can modify reclamations."); // Warn non-admin users
      this.router.navigate(['']);
    }
  }

  handleEtatChange(event: Event): void {
    if (this.reclamation) {
      const checkbox = event.target as HTMLInputElement;
      this.reclamation.etat = checkbox.checked ? 'solved' : 'unsolved';
    }
  }

  goBack(): void {
    this.router.navigate(['/reclamations']);
  }
}

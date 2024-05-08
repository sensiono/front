import { Component } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import * as QRCode from 'qrcode';
import { NgForm } from '@angular/forms'; // For form validation
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from './popupconfirmation/popup/popup.component';
import { HttpClient } from '@angular/common/http';
import { Reclamation } from 'src/app/Models/reclamation/reclamation';
import { ReclamationService } from 'src/app/services/reclamation.service';
import { UserService } from 'src/app/services/user.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-ajout-reclamation',
  templateUrl: './ajout-reclamation.component.html',
  styleUrls: ['./ajout-reclamation.component.css'],
})
export class AjoutReclamationComponent {

  isAuthenticated = false; // To track user authentication status


  ngOnInit(): void {
    this.isAuthenticated = this.authService.isUserAuthenticated();
    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        
        if (user) {
          this.nouvelleReclamation.user = { ...this.nouvelleReclamation.user, id: user.id };
          this.nouvelleReclamation.user.role = user.role;
          this.nouvelleReclamation.user.firstname = user.firstname;
          this.nouvelleReclamation.user.lastname = user.lastname;
        }
      },
      error: (error) => {
        console.error('Error fetching current user:', error);
      }
    });
  }


  nouvelleReclamation: Reclamation = {
    idRec: 0,
    description: '',
    etat: 'Pending',
    user: {
      id: 1,
    email: "",
    firstname: "",
    lastname: "",
    password: "",
    registrationDate: "",
    enabled: false,
    imageName: "",
    },
    createdAt: new Date(),
    type: null,
      };

  // Ensure availableTypes only contains strings from the enum
 /* availableTypes: string[] = Object.keys(ReclamationType).filter(
    (key) => isNaN(Number(key)) // Exclude numeric keys
  );*/


  constructor(
    private authService: AuthServiceService,
    private reclamationService: ReclamationService,
    private router: Router,
    private dialog: MatDialog, // Inject MatDialog
    private http: HttpClient, // Import HttpClient
    private userService: UserService, 



  ) {}

  

  // Validate description length
  validateDescription(): void {
    const desc = this.nouvelleReclamation.description;
    if (desc.length < 50) {
      console.warn("La description doit avoir au moins 50 caractères.");
    } else {
      console.log("Description est valide.");
    }
  }

  async saveReclamation(reclamationForm: NgForm): Promise<void> {
    if (reclamationForm.valid) {
      this.reclamationService.saveReclamation(this.nouvelleReclamation).subscribe({
        next: async (response) => {
          // Generate and send PDF
          console.log('Current User:', this.nouvelleReclamation.user?.id);
          console.log('reclamation added', response);

          this.dialog.open(PopupComponent, {
            width: '400px', // Define the popup width
          });
        },
        error: (error) => {
          console.error("Erreur lors de l'ajout de la réclamation :", error);
        },
      });
    }
  }

  

  goBack() {
    this.router.navigate(['/']); // Navigate back
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Reclamation } from 'src/app/models/reclamation';
import { ReclamationService } from 'src/app/services/reclamation.service';
import jsPDF from 'jspdf';
import * as QRCode from 'qrcode';
import { NgForm } from '@angular/forms'; // Import NgForm for form typing

@Component({
  selector: 'app-ajout-reclamation',
  templateUrl: './ajout-reclamation.component.html',
  styleUrls: ['./ajout-reclamation.component.css']
})
export class AjoutReclamationComponent {
  nouvelleReclamation: Reclamation = {
    idRec: 0,
    description: '',
    etat: 'Pending',
    user: {
      idUser: 1,
      nomUtilisateur: '',
      motDePasse: '',
      email: '',
      profile: '',
      competences: [],
      nomEntreprise: '',
      adresseEntreprise: '',
      reclamations: []
    }
  };

  constructor(
    private reclamationService: ReclamationService,
    private router: Router
  ) {}

  // Custom validation logic to check description field
  validateDescription(): void {
    const desc = this.nouvelleReclamation.description;
    if (desc.length < 50) {
      console.warn("La description doit avoir au moins 50 caractères.");
    } else {
      console.log("Description est valide.");
    }
  }

  saveReclamation(reclamationForm: NgForm): void { // Typing with NgForm
    if (reclamationForm.valid) {
      this.reclamationService.saveReclamation(this.nouvelleReclamation).subscribe(
        (newRec) => {
          console.log('Nouvelle réclamation ajoutée avec succès !');
          this.generatePDF(newRec); // Generate and download the PDF
          this.router.navigate(['/reclamations']); // Navigate after success
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de la réclamation :', error);
        }
      );
    } else {
      console.warn('Le formulaire de réclamation est invalide.');
    }
  }

  // Function to generate the PDF
  async generatePDF(reclamation: Reclamation): Promise<void> {
    const pdf = new jsPDF();
    pdf.text('Détails de la Réclamation', 10, 10); // PDF Title
    pdf.text(`ID: ${reclamation.idRec}`, 10, 30); // ID
    pdf.text(`Description: ${reclamation.description}`, 10, 50); // Description
    pdf.text(`État: ${reclamation.etat}`, 10, 70); // State

    // Generate QR code and add to PDF
    const qrDataUrl = await this.generateQRCode(reclamation);
    pdf.addImage(qrDataUrl, 'PNG', 10, 90, 50, 50);

    pdf.save(`Reclamation_${reclamation.idRec}.pdf`); // Save PDF with reclamation ID
  }

  // Function to generate QR code
  async generateQRCode(reclamation: Reclamation): Promise<string> {
    const qrCodeData = `Réclamation ID: ${reclamation.idRec}\nDescription: ${reclamation.description}\nÉtat: ${reclamation.etat}\nURL: http://localhost:4200/reclamations`;
    return await QRCode.toDataURL(qrCodeData);
  }
}

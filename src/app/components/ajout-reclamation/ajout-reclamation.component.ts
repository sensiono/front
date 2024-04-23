import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Reclamation } from 'src/app/models/reclamation';
import { ReclamationService } from 'src/app/services/reclamation.service';
import jsPDF from 'jspdf'; // Importing jsPDF
import * as QRCode from 'qrcode'; // Importing qrcode library


@Component({
  selector: 'app-ajouter-reclamation',
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
    } // Assigning userId=1
  };

  constructor(private reclamationService: ReclamationService, private router: Router) {}

  saveReclamation(): void {
    this.reclamationService.saveReclamation(this.nouvelleReclamation).subscribe(
      (newRec) => {
        console.log('Nouvelle réclamation ajoutée avec succès !');
        this.generatePDF(newRec); // Generate and download the PDF
        this.router.navigate(['/reclamations']);
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de la réclamation :', error);
      }
    );
  }

  // Function to generate the PDF with reclamation details and QR code
  async generatePDF(reclamation: Reclamation): Promise<void> {
    const pdf = new jsPDF();
    pdf.text('Détails de la Réclamation', 10, 10); // Title
    pdf.text(`ID: ${reclamation.idRec}`, 10, 30); // ID of the Reclamation
    pdf.text(`Description: ${reclamation.description}`, 10, 50); // Description
    pdf.text(`État: ${reclamation.etat}`, 10, 70); // State

    // Generate QR code image
    const qrDataUrl = await this.generateQRCode(reclamation);
    // Add QR code image to PDF
    pdf.addImage(qrDataUrl, 'PNG', 10, 90, 50, 50);

    pdf.save(`Reclamation_${reclamation.idRec}.pdf`); // Save and download the PDF
  }

  // Function to generate QR code image
  async generateQRCode(reclamation: Reclamation): Promise<string> {
    const qrCodeData = `Réclamation ID: ${reclamation.idRec}\nDescription: ${reclamation.description}\nÉtat: ${reclamation.etat}\nYou can check your reclamation at http://localhost:4200/reclamations`;
    const qrDataUrl = await QRCode.toDataURL(qrCodeData);
    return qrDataUrl;
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Offre } from '../Models/user/offre';
import { OffreService } from '../services/offre.service';
import { PdfService } from '../services/pdf.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-homeoffre',
  templateUrl: './homeoffre.component.html',
  styleUrls: ['./homeoffre.component.css']
})
export class HomeoffreComponent implements OnInit {
  offres: Offre[] = [];
  offresFiltrees: Offre[] = [];
  displayedOffres: Offre[] = []; 
  searchTerm: string = '';
  showPdfIcon: boolean = false; 
  showExcelIcon: boolean = false;
  pageSize: number = 10;
  sortBy: string = 'asc'; // Ajout de la propriété sortBy
  typeOffreStats: { [key: string]: number } = {};
  typeOffreChartData: { name: string, value: number }[] = []; // Données pour le graphique ngx-charts

  constructor(private offreService: OffreService, private router: Router, private pdfService: PdfService) { }

  ngOnInit(): void {
    this.getAllOffres();
  }

  getAllOffres(): void {
    this.offreService.getAllOffres().subscribe(
      offres => {
        this.offres = offres;
        this.searchOffres();
        this.calculateTypeOffreStats();
      },
      error => {
        console.log('Error fetching offres:', error);
      }
    );
  }

  searchOffres(): void {
    if (this.searchTerm.trim() === '') { 
      this.offresFiltrees = [...this.offres];
    } else {
      this.offresFiltrees = this.offres.filter(offre =>
        Object.values(offre).some(value =>
          value !== null && value.toString().toLowerCase().includes(this.searchTerm.trim().toLowerCase())
        )
      );
    }
    this.updateDisplayedOffres();
  }

  updateDisplayedOffres(): void {
    this.displayedOffres = [...this.offresFiltrees];
    this.sortOffres(); // Triez les offres à chaque mise à jour
  }

  ajouterOffre(): void {
    this.router.navigate(['/offre']);
  }

  modifierOffre(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate(['/modifier-offre', id]);
    } else {
      console.error('ID is undefined.');
    }
  }
  
  supprimerOffre(offre: Offre): void {
    this.offreService.deleteOffre(offre).subscribe(
      () => {
        this.getAllOffres();
      },
      error => {
        console.log('Error deleting offre:', error);
      }
    );
  }

  generatePdf(): void {
    const htmlContent = this.generateHtmlTable(); 
    if (htmlContent) {
      this.pdfService.generatePdf(htmlContent, 'offres'); 
      this.showPdfIcon = true; 
    } else {
      console.error('No offers found to generate PDF.');
    }
  }

  generateHtmlTable(): string {
    let htmlContent = '<table style="border-collapse: collapse; width: 100%;">';
    htmlContent += '<thead><tr><th style="padding: 8px; text-align: left;">Titre</th><th style="padding: 8px; text-align: left;">Description</th><th style="padding: 8px; text-align: left;">Compétence Requise</th><th style="padding: 8px; text-align: left;">Durée</th><th style="padding: 8px; text-align: left;">Rémunération</th><th style="padding: 8px; text-align: left;">Type d\'offre</th></tr></thead>';
    htmlContent += '<tbody>';
    this.offresFiltrees.forEach(offre => {
      htmlContent += '<tr>';
      htmlContent += `<td style="padding: 8px;">${offre.titre}</td>`;
      htmlContent += `<td style="padding: 8px;">${offre.description}</td>`;
      htmlContent += `<td style="padding: 8px;">${offre.competenceRequise}</td>`;
      htmlContent += `<td style="padding: 8px;">${offre.duree}</td>`;
      htmlContent += `<td style="padding: 8px;">${offre.remuneration}</td>`;
      htmlContent += `<td style="padding: 8px;">${offre.typeOffre}</td>`;
      htmlContent += '</tr>';
    });
    htmlContent += '</tbody></table>';
    return htmlContent;
  }

  exportToExcel(): void {
    const tableData = this.generateTableData(); 
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(tableData);
    XLSX.utils.book_append_sheet(wb, ws, 'Offres');
    try {
      XLSX.writeFile(wb, 'offres.xlsx');
      this.showExcelIcon = true;
    } catch (error) {
      console.error('Error exporting to Excel:', error);
    }
  }

  generateTableData(): any[] {
    return this.offresFiltrees.map(offre => ({
      'Titre': offre.titre,
      'Description': offre.description,
      'Compétence Requise': offre.competenceRequise,
      'Durée': offre.duree,
      'Rémunération': offre.remuneration,
      'Type d\'offre': offre.typeOffre // Ajout de cette ligne
    }));
  }

  onPageChange(event: any): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.displayedOffres = this.offresFiltrees.slice(startIndex, endIndex);
  }

  sortOffres(): void {
    if (this.sortBy === 'asc') {
      this.displayedOffres.sort((a, b) => (a && b && a.titre && b.titre && a.titre > b.titre) ? 1 : -1);
    } else {
      this.displayedOffres.sort((a, b) => (a && b && a.titre && b.titre && a.titre < b.titre) ? 1 : -1);
    }
  }

  calculateTypeOffreStats(): void {
    this.offresFiltrees.forEach(offre => {
      if (offre.typeOffre !== undefined) {
        if (offre.typeOffre in this.typeOffreStats) {
          this.typeOffreStats[offre.typeOffre]++;
        } else {
          this.typeOffreStats[offre.typeOffre] = 1;
        }
      }
    });

    // Convertir les statistiques en format approprié pour ngx-charts
    this.typeOffreChartData = Object.keys(this.typeOffreStats).map(key => ({ name: key, value: this.typeOffreStats[key] }));
  }

  getTypeOffreKeys(): string[] {
    return Object.keys(this.typeOffreStats);
  }

}

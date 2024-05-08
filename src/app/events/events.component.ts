import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Evenement } from '../Models/user/evenement';
import { EvenementService } from '../services/evenement.service';
import { PdfService } from '../services/pdf.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  evenements: Evenement[] = [];
  displayedEvenements: Evenement[] = [];
  searchTerm: string = ''; // Add searchTerm property for search term

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private evenementService: EvenementService,
    private router: Router,
    private pdfService: PdfService // Inject the PdfService
  ) { }

  ngOnInit(): void {
    this.loadEvenements();
  }

  loadEvenements(): void {
    this.evenementService.getEvenements()
      .subscribe(
        data => {
          this.evenements = data;
          this.searchEvenements(); // Filter events when loaded
          this.paginator.firstPage(); // Go back to the first page after events are loaded
        },
        error => {
          console.log(error);
        });
  }

  addEvent(): void {
    this.router.navigate(['/event']);
  }

  generatePdf(): void {
    const htmlContent = this.generateHtmlContent(); // Generate HTML content for PDF
    this.pdfService.generatePdf(htmlContent, 'events'); // Call the generatePdf method of PdfService
  }

  generateHtmlContent(): string {
    let htmlContent = '<h2>List of Events</h2>';
    htmlContent += '<table style="border-collapse: collapse; width: 100%;">';
    htmlContent += '<thead><tr><th style="padding: 8px; text-align: left;">Title</th><th style="padding: 8px; text-align: left;">Description</th><th style="padding: 8px; text-align: left;">Date</th><th style="padding: 8px; text-align: left;">Location</th></tr></thead>';
    htmlContent += '<tbody>';
    this.displayedEvenements.forEach(evenement => {
      htmlContent += '<tr>';
      htmlContent += `<td style="padding: 8px;">${evenement.titre}</td>`;
      htmlContent += `<td style="padding: 8px;">${evenement.description}</td>`;
      htmlContent += `<td style="padding: 8px;">${evenement.date}</td>`;
      htmlContent += `<td style="padding: 8px;">${evenement.lieu}</td>`;
      htmlContent += '</tr>';
    });
    htmlContent += '</tbody></table>';
    return htmlContent;
  }
  
  searchEvenements(): void {
    if (this.searchTerm.trim() === '') {
      this.displayedEvenements = [...this.evenements];
    } else {
      this.displayedEvenements = this.evenements.filter(evenement =>
        Object.values(evenement).some(value =>
          value !== null && value.toString().toLowerCase().includes(this.searchTerm.trim().toLowerCase())
        )
      );
    }
  }

  // Method called when the user enters a search term
  onSearchTermChange(): void {
    this.searchEvenements(); // Update the list of filtered events
  }
  onPageChange(event: any): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    
  }
}


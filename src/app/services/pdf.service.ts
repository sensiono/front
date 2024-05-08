import { Injectable } from '@angular/core';
import * as jspdf from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

  generatePdf(htmlContent: string, filename: string): void {
    
    const pageWidth =500; 
    const pageHeight = 1000; 

    const pdf = new jspdf.jsPDF({
      orientation: 'landscape', 
      unit: 'mm', 
      format: [pageWidth, pageHeight] 
    });

   
    pdf.html(htmlContent, {
      callback: (pdf) => {
       
        pdf.save(filename + '.pdf');
      }
    });
  }
}

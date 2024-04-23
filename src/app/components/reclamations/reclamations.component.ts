import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Reclamation } from 'src/app/models/reclamation';
import { ReclamationService } from 'src/app/services/reclamation.service';
import { Router } from '@angular/router';
import { groupBy } from 'lodash';
import * as XLSX from 'xlsx'; // Import xlsx library



@Component({
  selector: 'app-reclamations',
  templateUrl: './reclamations.component.html',
  styleUrls: ['./reclamations.component.css']
})
export class ReclamationsComponent implements OnInit, AfterViewInit {
  reclamations: Reclamation[] = [];
  dataSource!: MatTableDataSource<Reclamation>;
  reclamationsPerUser: { name: string, value: number }[] = [];
  colorScheme = { domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'] };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('reclamationsTable') reclamationsTable!: ElementRef;

  totalReclamations = 0;
  pageSize = 10;

  // Define the list of displayed columns for the table
  displayedColumns: string[] = ['id', 'description', 'etat', 'userId', 'actions']; // Include 'userId' in displayed columns

  constructor(
    private reclamationService: ReclamationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize the data source with an empty array of Reclamation objects
    this.dataSource = new MatTableDataSource<Reclamation>([]); 
    this.loadReclamations();
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  loadReclamations(): void {
    this.reclamationService.getAllReclamations().subscribe(
      (reclamations) => {
        this.reclamations = reclamations;
        this.totalReclamations = reclamations.length;
        this.dataSource = new MatTableDataSource(reclamations);
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
        this.reclamationsPerUser = this.generateReclamationsPerUser(reclamations);
      },
      (error) => {
        console.error('Error loading reclamations:', error);
      }
    );
  }

  generateReclamationsPerUser(reclamations: Reclamation[]): { name: string, value: number }[] {
    const groupedReclamations = groupBy(reclamations, 'user.nomUtilisateur');
    return Object.keys(groupedReclamations).map(userName => ({
      name: userName,
      value: groupedReclamations[userName].length
    }));
  }

  deleteReclamation(id: number): void {
    this.reclamationService.deleteReclamation(id).subscribe(
      () => {
        this.loadReclamations();
      },
      (error) => {
        console.error('Error deleting reclamation:', error);
      }
    );
  }

  modifierReclamation(id: number): void {
    this.router.navigate(['/modifier-reclamation', id]);
  }

  ajouterReclamation(): void {
    this.router.navigate(['/ajouter-reclamation']);
  }

  pageEvent(event: any): void {
    this.pageSize = event.pageSize;
  }

  // Check if user object exists before accessing userId
  getUserId(reclamation: Reclamation): number | null {
    return reclamation.user ? reclamation.user.idUser : null;
  }

  applyFilter(event: Event): void {
    // Use type assertion to assert that the target property exists and is an HTMLInputElement
    const searchTerm = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = searchTerm;
  }

  applySort(event: Event): void {
    // Ensure reclamations array is populated before sorting
    if (this.reclamations.length === 0) {
      return;
    }

    const sortOrder = (event.target as HTMLSelectElement).value;
    const sortedReclamations = this.reclamations.slice().sort((a, b) => {
      return sortOrder === 'asc' ? a.idRec - b.idRec : b.idRec - a.idRec;
    });

    this.dataSource = new MatTableDataSource(sortedReclamations);

    // Reconnect paginator if used
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  exportToExcel(): void {
    // Combine table data and visual statistics
    const tableData = this.dataSource.filteredData.map(item => ({
      'ID': item.idRec,
      'Description': item.description,
      'État': item.etat,
      'User ID': this.getUserId(item)
    }));
  
    const visualStatistics = this.reclamationsPerUser.map(item => ({
      'User Name': item.name,
      'Reclamations Count': item.value
    }));
  
    // Create Excel workbook and sheets
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    const tableWs: XLSX.WorkSheet = XLSX.utils.json_to_sheet(tableData);
    const visualWs: XLSX.WorkSheet = XLSX.utils.json_to_sheet(visualStatistics);
  
    // Add sheets to workbook
    XLSX.utils.book_append_sheet(wb, tableWs, 'Reclamations');
    XLSX.utils.book_append_sheet(wb, visualWs, 'Visual Statistics');
  
    // Save workbook as Excel file
    XLSX.writeFile(wb, 'reclamations.xlsx');
  }

  

  
}

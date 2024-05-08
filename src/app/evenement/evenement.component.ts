import { Component, OnInit } from '@angular/core';
import { Evenement } from '../Models/user/evenement';
import { EvenementService } from '../services/evenement.service';

@Component({
  selector: 'app-evenement',
  templateUrl: './evenement.component.html',
  styleUrls: ['./evenement.component.css']
})
export class EvenementComponent implements OnInit {
  evenements: Evenement[] = [];
  displayedEvenements: Evenement[] = [];
  searchTerm: string = '';

  constructor(private evenementService: EvenementService) { }

  ngOnInit(): void {
    this.loadEvenements();
  }

  loadEvenements(): void {
    this.evenementService.getEvenements().subscribe(
      data => {
        this.evenements = data;
        this.searchEvenements(); // Filter events when loaded
      },
      error => {
        console.log(error);
      }
    );
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
}


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Offre } from '../../models/offre';
import { OffreService } from '../../services/offre.service';

@Component({
  selector: 'app-offres',
  templateUrl: './offres.component.html',
  styleUrls: ['./offres.component.css']
})
export class OffresComponent implements OnInit {
  offres: Offre[] = [];

  constructor(private offreService: OffreService, private router: Router) { }

  ngOnInit(): void {
    this.loadOffres();
  }

  loadOffres(): void {
    this.offreService.getAllOffres().subscribe(offres => {
      this.offres = offres;
    });
  }

  deleteOffre(id: number): void {
    this.offreService.deleteOffre(id).subscribe(() => {
      console.log('Offre supprimée avec succès !');
     
      this.loadOffres();
    }, error => {
      console.error('Erreur lors de la suppression de l\'offre :', error);
    });
  }

  modifierOffre(id: number): void {
    this.router.navigate(['/modifier-offre', id]); 
  }

  ajouterOffre(): void {
    this.router.navigate(['/ajouter-offre']); 
  }
}

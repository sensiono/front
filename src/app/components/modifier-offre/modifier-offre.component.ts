import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Offre } from '../../models/offre';
import { OffreService } from '../../services/offre.service';

@Component({
  selector: 'app-modifier-offre',
  templateUrl: './modifier-offre.component.html',
  styleUrls: ['./modifier-offre.component.css']
})
export class ModifierOffreComponent implements OnInit {
  offre: Offre | null = null; 
  offreId: number | null = null; 

  constructor(
    private offreService: OffreService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.offreId = +params['id'];
      this.loadOffre();
    });
  }

  loadOffre(): void {
    if (this.offreId !== null) {
      this.offreService.getOffreById(this.offreId).subscribe(
        (offre: Offre) => {
          this.offre = offre;
        },
        (error) => {
          console.error('Une erreur s\'est produite lors du chargement de l\'offre :', error);
        }
      );
    }
  }

  modifierOffre(): void {
    if (this.offre) {
      this.offreService.saveOffre(this.offre).subscribe(
        () => {
          console.log('Offre modifiée avec succès !');
          this.router.navigate(['/offres']); // Rediriger vers la liste des offres après la modification réussie
        },
        (error) => {
          console.error('Erreur lors de la modification de l\'offre :', error);
        }
      );
    } else {
      console.error('Impossible de modifier une offre non définie.');
    }
  }
}

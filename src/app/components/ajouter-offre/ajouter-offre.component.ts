import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Offre } from '../../models/offre';
import { OffreService } from '../../services/offre.service';

@Component({
  selector: 'app-ajouter-offre',
  templateUrl: './ajouter-offre.component.html',
  styleUrls: ['./ajouter-offre.component.css']
})
export class AjouterOffreComponent {
  nouvelleOffre: Offre = {
    id: 0,
    titre: '',
    description: '',
    competenceRequise: '',
    duree: '',
    remuneration: 0
  };

  constructor(private offreService: OffreService, private router: Router) { }

  saveOffre(): void {
    this.offreService.saveOffre(this.nouvelleOffre).subscribe(() => {
      console.log('Nouvelle offre ajoutée avec succès !');
      this.router.navigate(['/offres']); 
    }, error => {
      console.error('Erreur lors de l\'ajout de l\'offre :', error);
    });
  }
}

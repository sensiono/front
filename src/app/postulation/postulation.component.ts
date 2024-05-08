import { Component, OnInit } from '@angular/core';
import { TypeOffre } from '../Models/user/TypeOffre.enum';
import { Offre } from '../Models/user/offre';
import { OffreService } from '../services/offre.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-postulation',
  templateUrl: './postulation.component.html',
  styleUrls: ['./postulation.component.css']
})
export class PostulationComponent implements OnInit {
  offres: Offre[] = [];
  offresFiltrees: Offre[] = [];
  displayedOffres: Offre[] = [];
  searchTerm: string = '';
  selectedOffre: Offre | undefined; 
  selectedAutreOffre: Offre | undefined;

  constructor(private offreService: OffreService) { }

  ngOnInit(): void {
    this.getAllOffres();
  }

  getAllOffres(): void {
    this.offreService.getAllOffres().subscribe(
      offres => {
        this.offres = offres;
        this.searchOffres();
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
  }

  evaluateOffer(offre: Offre): string {
    let dureeThreshold: number;
    let remunerationThreshold: number;
    switch (offre.typeOffre) {
      case TypeOffre.CLOUD:
        dureeThreshold = 6; 
        remunerationThreshold = 5000;
        break;
      case TypeOffre.WEB_DEVELOPMENT:
        dureeThreshold = 3; 
        remunerationThreshold = 3000; 
        break;
      case TypeOffre.DATA_SCIENCE:
        dureeThreshold = 6; 
        remunerationThreshold = 6000; 
        break;
      case TypeOffre.CYBER_SECURITY:
        dureeThreshold = 3; 
        remunerationThreshold = 4000; 
        break;
      case TypeOffre.SOFTWARE_ENGINEERING:
        dureeThreshold = 6; 
        remunerationThreshold = 4500; 
        break;
      case TypeOffre.MACHINE_LEARNING:
        dureeThreshold = 6; 
        remunerationThreshold = 5500; 
        break;
      default:
        return "bad deal";
    }
  
    if (offre.duree && parseInt(offre.duree) >= dureeThreshold) {
      if (offre.remuneration && offre.remuneration >= remunerationThreshold) {
        return "good deal"; 
      }
    }
  
    return "bad deal";
  }
  
  generateEvaluation(offre: Offre): void {
    
    const evaluation = this.evaluateOffer(offre);
    
    if (evaluation === 'good deal') {
      Swal.fire({
        icon: 'success',
        title: 'Bonne offre !',
        text: `L'offre "${offre.titre}" est un bon deal.`
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Mauvaise offre !',
        text: `L'offre "${offre.titre}" est un mauvais deal.`
      });
    }
  }
  
  calculateScores(offre: Offre): void {
    if (!offre) {
      console.error("Aucune offre sélectionnée.");
      return;
    }

    const score = this.calculateOfferScore(offre);

    Swal.fire({
      icon: 'info',
      title: `Score de l'offre "${offre.titre}"`,
      text: `Le score de l'offre est : ${score}`
    });
  }

  compareOffres(offre1: Offre, offre2: Offre): void {
    const scoreOffre1 = parseFloat(this.calculateOfferScore(offre1));
    const scoreOffre2 = parseFloat(this.calculateOfferScore(offre2));

    let message: string;

    if (scoreOffre1 > scoreOffre2) {
      message = `L'offre "${offre1.titre}" semble être une excellente option ! Nous vous recommandons de la choisir.`;
    } else if (scoreOffre1 < scoreOffre2) {
      message = `L'offre "${offre2.titre}" semble être une excellente option ! Nous vous recommandons de la choisir.`;
    } else {
      message = `Les offres "${offre1.titre}" et "${offre2.titre}" ont le même score. Faites votre choix en fonction de vos préférences.`;
    }

    Swal.fire({
      icon: 'info',
      title: 'Comparaison des offres',
      text: message
    });
}


  calculateOfferScore(offre: Offre): string {
    if (!offre.duree || !offre.remuneration) {
      console.error("La durée ou la rémunération de l'offre n'est pas définie.");
      return '0';
    }
  
    if (typeof offre.randomScore !== 'undefined') {
      return offre.randomScore.toFixed(2);
    }
  
    const duree = parseInt(offre.duree);
  
    const dureeMin = 3; 
    const remunerationMin = 4000; 
  
    
    let score = 0;
  
    if (duree >= dureeMin) {
      score += 0.5 + Math.random() * 0.5; 
    }
  
    if (offre.remuneration >= remunerationMin) {
      score += 0.5 + Math.random() * 0.5; 
    }
  
    offre.randomScore = score * 100;
  
    return offre.randomScore.toFixed(2);
  }
  selectOffre(offre: Offre): void {
    if (!this.selectedOffre) {
      this.selectedOffre = offre;
    } else if (!this.selectedAutreOffre) {
      this.selectedAutreOffre = offre;
    } else {
      this.selectedOffre = offre;
      this.selectedAutreOffre = undefined;
    }
  }
  
}


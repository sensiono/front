import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { OffreService } from '../services/offre.service';
import { UserService } from '../services/user.service';
import { User } from '../Models/user/user';
import { Offre } from '../Models/user/offre';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TypeOffre } from '../Models/user/TypeOffre.enum';

@Component({
  selector: 'app-offre',
  templateUrl: './offre.component.html',
  styleUrls: ['./offre.component.css']
})
export class OffreComponent implements OnInit {
  newOffre: Offre = {};
  typesOffres: string[] = [];

  constructor(
    private offreService: OffreService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Convertir chaque valeur de l'énumération en chaîne de caractères
    this.typesOffres = Object.values(TypeOffre)
      .filter(value => typeof value === 'string')
      .map(value => value as string);

    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        if (user) {
          this.newOffre.user = { ...this.newOffre.user, id: user.id };
          this.newOffre.user.role = user.role;
          this.newOffre.user.firstname = user.firstname;
          this.newOffre.user.lastname = user.lastname;
        }
      },
      error: (error) => {
        console.error('Error fetching current user:', error);
      }
    });
  }

  createOffre(): void {
    this.offreService.createOffre(this.newOffre).subscribe({
      next: (response) => {
        console.log('Current User:', this.newOffre.user?.id);
        console.log('offre added', response);
        this.newOffre = {};
        Swal.fire('Succès !', 'L\'offre a été créée avec succès.', 'success');
        this.router.navigate(['/offres']);
      },
      error: (error) => {
        console.error('Error adding offre:', error);
      }
    });
  }
}
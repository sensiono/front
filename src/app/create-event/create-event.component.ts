import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Evenement } from '../Models/user/evenement';
import { EvenementService } from '../services/evenement.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  newEvent: Evenement = {};

  constructor(
    private evenementService: EvenementService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
  

  this.userService.getCurrentUser().subscribe({
    next: (user) => {
      if (user) {
        this.newEvent.user = { ...this.newEvent.user, id: user.id };
        this.newEvent.user.role = user.role;
        this.newEvent.user.firstname = user.firstname;
        this.newEvent.user.lastname = user.lastname;
      }
    },
    error: (error) => {
      console.error('Error fetching current user:', error);
    }
  });
}


  createEvenement(): void {
    this.evenementService.createEvenement(this.newEvent).subscribe({
      next: (response) => {
        console.log('Current User:', this.newEvent.user?.id);
        console.log('offre added', response);
        this.newEvent = {};
        Swal.fire('Succès !', 'L\'evenement a été créée avec succès.', 'success');
        this.router.navigate(['/events']);
      },
      error: (error) => {
        console.error('Error adding offre:', error);
      }
    });
  }
}

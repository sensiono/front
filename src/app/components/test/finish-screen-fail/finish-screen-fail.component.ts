import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'winder-finish-screen-fail',
  templateUrl: './finish-screen-fail.component.html',
  styleUrls: ['./finish-screen-fail.component.scss']
})
export class FinishScreenFailComponent {
  router: any;
  goBack() {
    this.router.navigate(['/']);
  }
  

}

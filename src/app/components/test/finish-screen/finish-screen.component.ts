import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'winder-finish-screen',
  templateUrl: './finish-screen.component.html',
  styleUrls: ['./finish-screen.component.scss']
})
export class FinishScreenComponent {
  constructor(private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['/project']);
    }, 4000);
  }
}

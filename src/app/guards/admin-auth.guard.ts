import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(private authService: AuthServiceService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isUserAdmin()) {
      return true; // Allow access if the user has the "Admin" role
    } else {
      this.router.navigate(['/']); // Redirect to home if not authorized
      return false; // Deny access if the user is not an admin
    }
  }
}

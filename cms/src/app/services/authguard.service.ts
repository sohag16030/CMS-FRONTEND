import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot): boolean {
      
        const requiredRoles = route.data['roles'] as string[];
        
        // Check if user is authenticated
        if (!this.authService.isAuthenticated()) {
            this.router.navigate(['/login']); 
            return false;
        }

        // Check user's role before navigation
        const token = localStorage.getItem('access_token');
        const jwtToken = this.authService.decodeJwtToken(token);
        const userRoles = this.authService.getUserRoles(jwtToken);

        // Check if user has required role
        const hasRequiredRole = requiredRoles.some(role => userRoles.includes(role));
        if (!hasRequiredRole) {
            debugger
            this.router.navigate(['/Unauthorized']); // Redirect to unauthorized page
            return false; // Prevent access
        }

        return true; // Allow access
    }
}

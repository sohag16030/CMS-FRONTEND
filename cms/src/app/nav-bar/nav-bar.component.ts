import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AuthStatusService } from '../services/auth.status.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  isAuthenticated: boolean;

  constructor(private authService: AuthService,
    private authStatusService: AuthStatusService,
    private router: Router) { }

  ngOnInit() {
    // Subscribe to authentication status changes
    this.authStatusService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  logout() {
    // Call the logout method from the AuthService
    this.authService.logout();
    this.router.navigate(['/']);
  }

  navigateToHome(event: MouseEvent) {
    event.preventDefault();
    // Check user's role before navigation
    const token = localStorage.getItem('access_token');
    if (token) {
      const jwtToken = this.authService.decodeJwtToken(token);
      const userRole = this.authService.getUserRoles(jwtToken);
      if (userRole.includes('ROLE_ADMIN')) {
        this.router.navigate(['/AdminHomePage']);
      } else if (userRole.includes('ROLE_USER')) {
        this.router.navigate(['/UserHomePage']);
      } else {
        this.router.navigate(['/']);
      }
    } else {
      this.router.navigate(['/']);
    }
  }

}

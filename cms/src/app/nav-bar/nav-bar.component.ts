import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AuthStatusService } from '../services/auth.status.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  isAuthenticated: boolean;

  constructor(private authService: AuthService, private authStatusService: AuthStatusService) { }

  ngOnInit() {
    // Subscribe to authentication status changes
    this.authStatusService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  logout() {
    // Call the logout method from the AuthService
    this.authService.logout();
  }

}

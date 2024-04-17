import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login(this.username, this.password).subscribe(
      (response: any) => {
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);

        // Decode JWT token to extract roles
        const jwtToken = this.authService.decodeJwtToken(response.access_token);
        const roles = jwtToken.roles;
        // Check if the user has ROLE_ADMIN or ROLE_USER role
        if (roles.includes('ROLE_ADMIN')) {
          this.router.navigate(['/AdminHomePage']);
        } else if (roles.includes('ROLE_USER')) {
          this.router.navigate(['/UserHomePage']);
        } else {
          this.router.navigate(['/']);
        }
      },
      (error) => {
        this.error = 'Invalid username or password';
      }
    );
  }
}

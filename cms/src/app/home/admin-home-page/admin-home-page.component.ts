import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-home-page',
  templateUrl: './admin-home-page.component.html',
  styleUrl: './admin-home-page.component.css'
})
export class AdminHomePageComponent {
  userId: string;
  userName: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.getUserDetails();
  }

  getUserDetails() {
    const token = localStorage.getItem('access_token');
    if (token) {
      debugger
      const userDetails = this.authService.getUserDetails(token);
      this.userName = userDetails.userName;
    }
  }
}

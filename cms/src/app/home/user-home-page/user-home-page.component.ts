import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-home-page',
  templateUrl: './user-home-page.component.html',
  styleUrls: ['./user-home-page.component.css']
})
export class UserHomePageComponent implements OnInit {
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

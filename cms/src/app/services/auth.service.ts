import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthStatusService } from './auth.status.service';

const BASIC_URL = 'http://localhost:8081';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private authStatusService: AuthStatusService) { }

  login(userName: string, password: string): Observable<any> {
    return this.http.post<any>(`${BASIC_URL}/users/accessToken`, { userName, password })
      .pipe(
        tap(response => {
          this.saveTokens(response);
          const jwtToken = this.decodeJwtToken(response.access_token);
          const roles = jwtToken.roles;
          if (roles.includes('ROLE_ADMIN') || roles.includes('ROLE_USER')) {
            this.authStatusService.setAuthenticationStatus(true);
          }
        })
      );
  }

  saveTokens(tokens: any) {
    localStorage.setItem('access_token', tokens.access_token);
    localStorage.setItem('refresh_token', tokens.refresh_token);
  }

  decodeJwtToken(token: string): any {
    return jwtDecode(token);
  }

  getUserDetails(token: string): { userId: string, userName: string } {
    const jwtToken = this.decodeJwtToken(token);
    const userId = jwtToken.userId; 
    const userName = jwtToken.username; 
    return { userId, userName };
  }
  

  getUserRoles(tokenData: any): string[] {
    return tokenData.roles;
  }
  isAuthenticated(): boolean {
    // Check if access token exists in local storage
    const accessToken = localStorage.getItem('access_token');
    return accessToken !== null;
  }
  logout() {
    // Clear tokens from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.authStatusService.setAuthenticationStatus(false);
  }
}

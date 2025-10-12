import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile, KeycloakTokenParsed } from 'keycloak-js';

@Injectable({
  providedIn: 'root'
})
export class KeycloakAppService { // (AuthorizationService) 

  constructor(private readonly keycloakService: KeycloakService) { }

  redirectToLoginPage(): Promise<void> {
    return this.keycloakService.login();
  }

  getUserName(): string {
      return this.keycloakService.getUsername();
  }

  isLoggedIn(): Promise<boolean> {
    return this.keycloakService.isLoggedIn();
  }

  logout(): void {
    this.keycloakService.logout();
      //this.keycloakService.logout(environment.keycloak.postLogoutRedirectUri);
  }

  

  /*
  isLoggedIn(): Promise<boolean> {
    return this.keycloak.isLoggedIn();
  }
  logout(): void {
    this.keycloak.logout();
  }
  getUserProfile(): any {
    return this.keycloak.loadUserProfile();
  }
  */

}

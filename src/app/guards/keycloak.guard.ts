import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { KeycloakService, KeycloakAuthGuard } from 'keycloak-angular';
import { KeycloakAppService } from "../services/keycloak.service";
import { Observable } from 'rxjs';

/*export const keycloakGuard: CanActivateFn = (route, state) => {
  return true;
};*/

/*@Injectable({
  providedIn: 'root'
})
export class KeycloakGuard implements CanActivate {

  constructor(private keycloakService: KeycloakService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.keycloakService.isLoggedIn();
  }
}*/




/*export const keycloakGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const keycloakService = inject(KeycloakService);
  return keycloakService.isLoggedIn();
};*/


export const authGuard: CanActivateFn = async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  // Inyectamos el servicio Keycloak y el Router.
  const keycloak = inject(KeycloakService);
  const router = inject(Router);

  // Verificamos si el usuario está autenticado.
  const authenticated = await keycloak.isLoggedIn();
  console.log('isLoggedIn(): ', authenticated);
  if (!authenticated) {
    // Redirigimos al usuario al login de Keycloak si no está autenticado.
    /*await keycloak.login({
      redirectUri: window.location.origin + state.url,
    });*/
    console.log('El usuario no está autenticado (keycloak.login)');
    return false; // Previene el acceso mientras se realiza el inicio de sesión.
  }

  // Obtenemos los roles requeridos desde la configuración de la ruta.
  const requiredRoles: string[] = route.data['roles'];

  // Si no se especifican roles, permitimos el acceso.
  if (!Array.isArray(requiredRoles) || requiredRoles.length === 0) {
    console.log('Roles del usuario: ', requiredRoles);
    console.log('No se especificaron roles y se dio acceso al usuario');
    return true;
  }

  // Obtenemos los roles asignados al usuario.
  const userRoles = (await keycloak.getUserRoles()) || [];

  // Permitimos el acceso solo si el usuario tiene todos los roles requeridos.
  const hasAllRoles = requiredRoles.every(role => userRoles.includes(role));

  if (!hasAllRoles) {
    // Redirigimos al usuario si no tiene los roles requeridos.
    router.navigate(['/unauthorized']);
    return false;
  }
  return true; // El usuario tiene acceso permitido.
};


export const AuthGuard: CanActivateFn = async (): Promise <boolean> => {
  const authenticationService = inject(KeycloakAppService);
  if (await authenticationService.isLoggedIn()) {
    return true;
  }
  authenticationService.redirectToLoginPage();
  return false;
};


export const LogoutRouteGuard: CanActivateFn = () => {
  const authenticationService = inject(KeycloakAppService);
  const router = inject(Router);
  if (!authenticationService.isLoggedIn()) {
    return true;
  } else {
    return router.createUrlTree(['']); //Ruta vacía
  }
};
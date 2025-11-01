import Keycloak from 'keycloak-js';
import { KeycloakService } from 'keycloak-angular';

export function initializeKeycloak(keycloak: KeycloakService): () => Promise<any> {
  return (): Promise<any> => {
    return keycloak
      .init({
        config: {
          //url: 'http://localhost:8080', // URL de tu servidor Keycloak
          url: 'https://sso-ddo.usac.edu.gt', // URL de tu servidor Keycloak (EN EL SERVIDOR)
          realm: 'ddo',                 // Nombre de tu realm
          clientId: 'cliente_nodejs',          // ID de tu cliente registrado en Keycloak
        },
        initOptions: {
          onLoad: 'login-required',         // Carga y fuerza el inicio de sesión
          checkLoginIframe: false,          // Revisa la sesión activa en el iframe
        },
        enableBearerInterceptor: true,      // Interceptor para añadir el token a las solicitudes HTTP
        bearerPrefix: 'Bearer',
        bearerExcludedUrls: ['/assets'],    // URLs excluidas del token
      })
      .then(() => {
        console.log('Keycloak inicializado correctamente');
        return true;
      })
      .catch((error) => {
        console.error('Error al inicializar Keycloak:', error);
        return false;
      });
  };
}

/*export function initializeKeycloak(keycloak: KeycloakService): () => Promise<any> {
  return (): Promise<any> => {
    return keycloak.init({
        config: {
          url: 'http://localhost:8080/', // URL de tu servidor Keycloak
          realm: 'ddo',                 // Nombre de tu realm
          clientId: 'cliente_nodejs',          // ID de tu cliente registrado en Keycloak
        },
        initOptions: {
          onLoad: 'login-required',         // Carga y fuerza el inicio de sesión
          checkLoginIframe: false,          // Revisa la sesión activa en el iframe
          //True: Utiliza SSO con otras aplicaciones

          //silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
        }  
      }) 
      .then(() => {
        console.log('Keycloak inicializado correctamente');
        return true;
      })
      .catch((error) => {
        console.error('Error al inicializar Keycloak:', error);
        return false;
      });
  };
}*/

/*export function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080/',
        realm: 'ddo',
        clientId: 'cliente_nodejs',
      },
      enableBearerInterceptor: true,
      bearerPrefix: 'Bearer',
      bearerExcludedUrls: ['/assets'],
      initOptions: {
        onLoad: 'login-required',
        //onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html',
      },
    });
}*/

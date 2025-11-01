export const environment = {
    production: false,
    keycloak: {
      authority: 'https://sso-ddo.usac.edu.gt',
      redirectUri: 'https://sidecc-ddo.usac.edu.gt',
      postLogoutRedirectUri: 'https://sidecc-ddo.usac.edu.gt/logout',
      realm: 'ddo',
      clientId: 'cliente_nodejs',
    },
    idleConfig: { idle: 10, timeout: 60, ping: 10 },
  };

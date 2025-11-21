import { NgModule, APP_INITIALIZER  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
//import { initializeKeycloak } from '../keycloak-init';
import { environment } from "./../environment";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from "./components/admin/admin.component";
import { MiPipePipe } from './mi-pipe.pipe';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { DetalleUsuarioComponent } from './components/detalle-usuario/detalle-usuario.component';
import { ActividadesComponent } from './components/actividades/actividades.component';
import { DetalleActividadComponent } from './components/detalle-actividad/detalle-actividad.component';
import { MisActividadesComponent } from "./components/mis-actividades/mis-actividades.component";

import { FormsModule } from '@angular/forms';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { ReporteCursosComponent } from './components/reporte-cursos/reporte-cursos.component';
import { ReporteCapacitacionesComponent } from './components/reporte-capacitaciones/reporte-capacitaciones.component';
import { ReporteProfesionalesComponent } from "./components/reporte-profesionales/reporte-profesionales.component";
import { AsignacionCursosComponent } from './components/asignacion-cursos/asignacion-cursos.component';
//import { MisActividadesComponent } from './mis-actividades/mis-actividades.component';

/* servicio.service, se coloca en providers para hacer que el servicio
 sea invocado con un servicio dentro de todos los modulos de angular */

 export const initializeKeycloak = (keycloak: KeycloakService) => async () =>
  keycloak.init({
    config: {
      url: environment.keycloak.authority,
      realm: environment.keycloak.realm,
      clientId: environment.keycloak.clientId,
    },
    loadUserProfileAtStartUp: true,
    initOptions: {
      onLoad: 'login-required',
      //onLoad: 'check-sso',
      /*silentCheckSsoRedirectUri:
        window.location.origin + '/assets/silent-check-sso.html',*/
      checkLoginIframe: false,
      redirectUri: environment.keycloak.redirectUri,
    },
  });

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    MiPipePipe,
    UsuariosComponent,
    DetalleUsuarioComponent,
    ActividadesComponent,
    DetalleActividadComponent,
    MisActividadesComponent,
    ReporteCursosComponent,
    ReporteCapacitacionesComponent,
    ReporteProfesionalesComponent,
    AsignacionCursosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    KeycloakAngularModule,
    FormsModule, //PARA UTILIZAR LA DIRECTIVA NGMODEL
    HttpClientModule //PARA CONECTARSE A UNA API
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

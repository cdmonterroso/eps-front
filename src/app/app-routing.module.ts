import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { ReporteCursosComponent } from "./components/reporte-cursos/reporte-cursos.component";
import { ReporteCapacitacionesComponent } from "./components/reporte-capacitaciones/reporte-capacitaciones.component";
import { ReporteProfesionalesComponent } from "./components/reporte-profesionales/reporte-profesionales.component";
import { DetalleUsuarioComponent } from './components/detalle-usuario/detalle-usuario.component';
import { ActividadesComponent } from './components/actividades/actividades.component';
import { DetalleActividadComponent } from './components/detalle-actividad/detalle-actividad.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { MisActividadesComponent } from "./components/mis-actividades/mis-actividades.component";
import { AsignacionCursosComponent } from './components/asignacion-cursos/asignacion-cursos.component';
import { AuthGuard, authGuard } from "./guards/keycloak.guard";

const routes: Routes = [
  //{path: 'home', component: HomeComponent, canActivate: [authGuard]},
  {path: '', component: HomeComponent},
  {path: 'admin', component: AdminComponent, canActivate:[AuthGuard]},
  {path: 'reporteCapacitaciones', component:ReporteCapacitacionesComponent, canActivate:[AuthGuard]},
  {path: 'reporteCursos', component:ReporteCursosComponent, canActivate:[AuthGuard]},
  {path: 'reporteProfesionales', component:ReporteProfesionalesComponent, canActivate:[AuthGuard]},
  {path: 'reporteCapacitaciones/:idActividad', component:UsuariosComponent, canActivate:[AuthGuard]},
  {path: 'reporteCursos/:idActividad', component:UsuariosComponent, canActivate:[AuthGuard]},
  {path: 'asignaciones', component: AsignacionCursosComponent, canActivate:[AuthGuard]},
  
  {path: 'usuarios', component: AdminComponent, canActivate: [AuthGuard]},
  //{path: 'usuario/:idUsuario', component: DetalleUsuarioComponent}, //component: detalleUsuarioComponent
  {path: 'actividades', component: ActividadesComponent, canActivate: [AuthGuard]},
  {path: 'actividad/:idActividad', component: DetalleActividadComponent, canActivate: [AuthGuard]},
  {path: 'misactividades', component: MisActividadesComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: 'home', pathMatch: 'full'}
  //{path: '', redirectTo: 'home', pathMatch: 'full', canActivate: [AuthGuard]},
  //{path: '**', redirectTo: 'home', pathMatch: 'full', canActivate: [AuthGuard]} //en redirectTo llevaría barra '/home'
  /*{path: 'actividades', component: ActividadesComponent},
  {path: 'actividad/:idActividad', component: DetalleActividadComponent},
  {path: 'misactividades', component: MisActividadesComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', redirectTo: 'home', pathMatch: 'full'}*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

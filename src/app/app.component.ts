import { Component, OnInit } from '@angular/core';
import { ServicioService } from "../app/services/servicio.service";
import { PublicoService } from "../app/services/publico.service";
import { KeycloakAppService } from "../app/services/keycloak.service";
//import {  } from "./models/estudiante-asignado-interface";
import { UsuarioInterface } from "../app/models/usuario-interface";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit { // Antes no tenia en OnInit
  title = 'Bienvenido!';
  username:string = '';
  fullname:string = '';
  constructor(private servicio:PublicoService, private actividadService:ServicioService, private authenticationService:KeycloakAppService){}
  registroUsuario:string = ''; //this.servicio.getValor();
  logueado:boolean = false;
  idUsuario:any = null;
  usuario?:UsuarioInterface;

  

  async ngOnInit() {
    this.logueado = await this.authenticationService.isLoggedIn()
    if (this.logueado) {
      const profile = await this.authenticationService.getUserName();
      //this.username = profile || '';
      this.registroUsuario = profile || '';
      if (this.registroUsuario === '') {
        alert('¡No se pudo iniciar sesión!');
        this.authenticationService.logout();
      } else {
        this.servicio.setRegistro(this.registroUsuario);

        this.actividadService.getUsuario(this.registroUsuario).subscribe((res)=>{
          try {
            console.log(res);
            this.usuario = res as UsuarioInterface;
            console.log("Imprimiendo datos del usuario logueado - " + this.registroUsuario);
            console.log(this.usuario.id);

            this.servicio.setIdUsuario(this.usuario.id);
            this.servicio.setFullName(this.usuario.fullname);
            
            console.log("Se guardo en memoria el id de moodle: " + this.servicio.getIdUsuario());
            console.log("Se guardo en memoria el nombre completo: " + this.servicio.getFullName());
          } catch (error) {
            console.log("No se pudo obtener el id de moodle del siguiente usuario: " + this.registroUsuario + "/n" + error);
          }
        });
      }
      /*this.userIdleService.startWatching();
      this.userIdleService
        .onTimerStart()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe();
      this.userIdleService
        .onTimeout()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          alert('Your session has timed out. Please log in again.');
          this.authenticationService.logout();
          this.userIdleService.resetTimer();
        });*/
    }
  };

  login():void {

    this.authenticationService.redirectToLoginPage();

    /*this.servicio.setRegistro(); //Estableciendo registro en el servicio público
    this.registroUsuario = this.servicio.getRegistro(); //Obteniendo registro del servicio

    //***Crear un objeto de tipo usuario, ya que devolverá toda esa información (similar al objeto actividad)
    //REVISAR EL OBJETO QUE DEVUELVE POSTMAN EN core_user_get_users_by_field
    //this.idUsuario = this.actividadService.getUsuario(this.registroUsuario); //Se manda el registro para luego obtener el id en moodle
    this.actividadService.getUsuario(this.registroUsuario).subscribe((res)=>{
      console.log(res);
      this.usuario = res as UsuarioInterface;
      console.log("Imprimiendo datos del usuario logueado - " + this.registroUsuario);
      console.log(this.usuario.id);

      try {
        this.servicio.setIdUsuario(this.usuario.id);
        console.log("Se guardo en memoria el id de moodle: " + this.servicio.getIdUsuario());
      } catch (error) {
        console.log("No se pudo obtener el id de moodle del siguiente usuario: " + this.registroUsuario + "/n" + error);
      }
    });*/

    
    //this.servicio.setValor(this.valor);
  }

  logout():void {
    this.registroUsuario = '';
    this.authenticationService.logout();
    //this.servicio.setValor(this.valor);

  }
}

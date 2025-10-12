import { Component, OnInit } from '@angular/core';
import { PublicoService } from "../../services/publico.service";
import { ServicioService } from "../../services/servicio.service";
import { UsuarioInterface } from "../../models/usuario-interface";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  public mensaje: string = " ";
  public nombre: string = '';
  public fecha: Date = new Date();
  public counter: number  = 100;
  usuario?:UsuarioInterface;

  constructor(private servicio:PublicoService, private actividadService:ServicioService){}

  ngOnInit():void {
    this.nombre = this.servicio.getFullName();
    console.log('Variable fullname: ', this.nombre);
  }

  incrementar(valor: number):void {
      this.counter += valor;
  }

  reiniciar():void {
      this.counter = 100;
  }
}

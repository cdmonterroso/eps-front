import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ServicioService } from "../../services/servicio.service";
import { PublicoService } from "../../services/publico.service";
import { UsuarioInterface } from "../../models/usuario-interface";


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
  
  usuarios:UsuarioInterface[] = [];

  constructor(private servicio: PublicoService, private actividadService: ServicioService, private route: ActivatedRoute, private location: Location) {}

  ngOnInit(): void {
    this.actividadService.getUsuarios().subscribe({
      next:(res)=>{
        this.usuarios = res as UsuarioInterface[];
        console.log("Se obtuvo correctamente el listado de estudiantes ");
      },
      error:(err)=> {
          console.error("Error al obtener el listado de estudiantes ", err);
        }
    })    
  }

  volver(): void {
    this.location.back(); //
  }

}

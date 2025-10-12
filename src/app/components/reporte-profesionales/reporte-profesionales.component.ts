import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ServicioService } from "../../services/servicio.service";
import { ActividadInterface } from "../../models/actividad-interface";
import { ProfesorInterface } from "../../models/profesor-interface";
import { Location } from '@angular/common';

@Component({
  selector: 'app-reporte-profesionales',
  templateUrl: './reporte-profesionales.component.html',
  styleUrls: ['./reporte-profesionales.component.css']
})
export class ReporteProfesionalesComponent implements OnInit{

  profesional?: ProfesorInterface;
  profesores:ProfesorInterface[] = [];
  nombreProfesional: string = '';
  registroProfesional: string = '';
  actividades?: ActividadInterface[];

  constructor(public actividadService: ServicioService, private route: ActivatedRoute, private location: Location) {}
  
  ngOnInit(): void {

    this.actividadService.getActividades().subscribe( {
      next:(res)=>{
        this.actividades = res as ActividadInterface[];

        this.actividades.forEach((actividad, index) =>{
          console.log("Id de la activdad", actividad.id);
          this.actividadService.getProfesor(actividad.id).subscribe({
            next:(res)=>{
              console.log(res);
              this.profesional = res as ProfesorInterface;
              this.nombreProfesional = this.profesional.fullname;
              this.registroProfesional = this.profesional.username;
              this.actividades![index].profesional = this.nombreProfesional
              this.actividades![index].registroProfesional = this.registroProfesional;
              //console.log(res);
              //console.log("Profesor asignado: " + this.nombreProfesor);
            },
            error:(err)=> {
              this.actividades![index].profesional = '(Sin profesional asignado)';
              this.actividades![index].registroProfesional = '-';
              console.error("Error al obtener el listado de profesionales ", err);
            }
          });
        });

      },
      error:(err)=>{
        console.error('No se pudo obtener el listado de cursos ', err);
      }
    });

  }

  volver(): void {
    this.location.back(); //
  }

}

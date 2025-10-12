import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicioService } from "../../services/servicio.service";
import { PublicoService } from "../../services/publico.service";
import { UsuarioInterface } from "../../models/usuario-interface";
import { ProfesorInterface } from "../../models/profesor-interface";
import { EstudianteAsignadoInterface } from "../../models/estudiante-asignado-interface";
import { EstadoInterface } from "../../models/estado-interface";
import { Location } from '@angular/common';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios:UsuarioInterface[] = [];
  completado:boolean = false;
  id_actividad?: number;
  nombreProfesor: string = '';
  profesor?: ProfesorInterface;
  estudiantes?: EstudianteAsignadoInterface[];
  estadoEstudiante?: EstadoInterface;

  constructor(private servicio: PublicoService, private actividadService: ServicioService, private route: ActivatedRoute, private location: Location) {}


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const parametro = params['idActividad'];
      this.id_actividad = parseInt(parametro,10);

      this.actividadService.getProfesor(this.id_actividad).subscribe({
        next:(res)=>{
          console.log(res);
          this.profesor = res as ProfesorInterface;
          this.nombreProfesor = this.profesor.fullname;
          console.log(res);
          console.log("Profesor asignado: " + this.nombreProfesor);
        },
        error:(err)=> {
          this.nombreProfesor = '';
          console.error("Error al obtener el profesor ", err);
        }
      });

      this.actividadService.getEstudiantes(this.id_actividad).subscribe({
        next:(res)=>{
          this.estudiantes = res as EstudianteAsignadoInterface[];

          this.estudiantes?.forEach((estudiante, index) =>{
            this.actividadService.getEstadoEstudiante(Number(this.id_actividad),estudiante.id).subscribe({
              next:(res)=>{
                try {
                  this.estadoEstudiante = res as EstadoInterface;
                  console.log(this.estadoEstudiante)
                  if (this.estadoEstudiante?.completionstatus.completed == true) {
                    this.estudiantes![index].estado = "Completado";
                    //return "Completado";
                  }else{
                    this.estudiantes![index].estado = "Incompleto";
                    //return "Incompleto";
                  }
                } catch (error) {
                  console.error("Error al obtener el estado del estudiante ", estudiante.id + "\n" + error);
                }
                
              },
              error:(err)=>{
                console.error("Error al obtener el estado del estudiante ", estudiante.id + "\n" + err);
              },
            });
          });

        },
        error:(err)=> { 
          console.error("Error al obtener el listado de estudiantes\n" + err);
        },
      });

      

    });
  }

  volver(): void {
    this.location.back(); //
  }
  
}

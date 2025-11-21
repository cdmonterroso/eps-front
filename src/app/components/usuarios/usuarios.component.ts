import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicioService } from "../../services/servicio.service";
import { PublicoService } from "../../services/publico.service";
import { UsuarioInterface } from "../../models/usuario-interface";
import { ActividadDetalleInterface } from "../../models/actividad-detalle-interface";
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
  nombreUnidadTrabajo:string[] = [];
  registroUsuario?: any;
  completado:boolean = false;
  id_actividad?: number;
  actividad?: ActividadDetalleInterface;
  nombreProfesor: string = '';
  profesor?: ProfesorInterface;
  estudiantes?: EstudianteAsignadoInterface[];
  estadoEstudiante?: EstadoInterface;

  constructor(private servicio: PublicoService, private actividadService: ServicioService, private route: ActivatedRoute, private location: Location) {}


  ngOnInit(): void {
    this.registroUsuario = this.servicio.getRegistro(); // e20160260
    this.route.params.subscribe(params => {
      const parametro = params['idActividad'];
      this.id_actividad = parseInt(parametro,10);
      
      this.actividadService.getActividad(this.id_actividad).subscribe({ 
        next:(res)=>{
          this.actividad = res as ActividadDetalleInterface;
          console.log("Nombre del curso/capacitación: ", this.actividad.fullname);
        },
        error:(err)=> {
          console.error("Error al obtener el curso ", err);
        }
      });

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

            this.actividadService.getPuestoTrabajo( parseInt(this.estudiantes![index].username.slice(1))).subscribe({
              next:(res)=>{
                console.log('Se obtuvo correctamente el puesto de trabajo: ', res.toString()); //32,105
                this.nombreUnidadTrabajo = res as string[];
                if (this.nombreUnidadTrabajo) { //No se encontró código del trabajador (venía la etiqueta vacía)
                  this.estudiantes![index].unidad = this.nombreUnidadTrabajo[2];
                  this.estudiantes![index].subprograma = this.nombreUnidadTrabajo[3];
                  //return;
                }else{
                  console.error('El registro ' + this.registroUsuario + ' no pertenece a ninguna unidad académica o administrativa');
                  return;
                }
              },
              error:(err)=> {
                console.error('No se puedo obtener el puesto de trabajo ', err);
                //alert('El registro ' + this.registroUsuario + ' no pertenece a ninguna unidad académica o administrativa');
                return; //No asigna el curso
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

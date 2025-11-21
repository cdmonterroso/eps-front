import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicioService } from "../../services/servicio.service";
import { UsuarioInterface } from "../../models/usuario-interface";
import { ActividadInterface } from "../../models/actividad-interface";
import { PublicoService } from "../../services/publico.service";
import { TipoActividadInterface } from "../../models/tipo-actividad-interface";
import { EstudianteAsignadoInterface } from "../../models/estudiante-asignado-interface";
import { ActividadDetalleInterface } from "../../models/actividad-detalle-interface";
import { ProfesorInterface } from "../../models/profesor-interface";
import { Location } from '@angular/common';

@Component({
  selector: 'app-detalle-actividad',
  templateUrl: './detalle-actividad.component.html',
  styleUrls: ['./detalle-actividad.component.css']
})
export class DetalleActividadComponent implements OnInit {
  //parametro: string = '';
  asignado:boolean = false;
  //codigoAsignacion:string = ''; //Código ingresado por el usuario en la caja de texto
  codigoUnidadTrabajo:string[] = [];
  idUsuarioLogueado?: any;
  registroUsuario?: any;
  id_actividad?: number;
  mensaje: string = '';
  nombre?: string;
  idNumber?: string; //código del curso
  fecha_inicio?: Date;
  fecha_fin?: Date;
  id_tipoActividad?: number;
  id_personaAdmin?: number;
  //actividades:Object=[];
  consultaVinculo?: [];
  persona_admin?: UsuarioInterface;
  profesor?: ProfesorInterface;
  nombreProfesor: string = '';
  //actividad?: ActividadInterface;
  actividad?: ActividadDetalleInterface
  tipo_actividad?: TipoActividadInterface;
  estudiantes?: EstudianteAsignadoInterface[];


  constructor(private servicio: PublicoService, private actividadService: ServicioService, private route: ActivatedRoute, private location: Location) {}

  ngOnInit(): void {
    this.idUsuarioLogueado = this.servicio.getIdUsuario();
    this.registroUsuario = this.servicio.getRegistro(); // e20160260

    this.route.params.subscribe(params => {
      const parametro = params['idActividad'];
      this.id_actividad = parseInt(parametro,10);

      this.actividadService.getCursoAsignado(this.idUsuarioLogueado,this.id_actividad).subscribe((res)=>{
        this.asignado = res as boolean; // true o false
        console.log("Es usuario está asignado al curso: ", this.asignado);
      })

      this.actividadService.getActividad(this.id_actividad).subscribe((res)=>{ //Tambien es válido solamente this.parametro
        console.log(res); //La respuesta en un objeto JSON, proveniente del backend
        this.actividad = res as ActividadDetalleInterface;
        console.log("Código de asignación: ", this.actividad.idnumber);
        //this.idNumber = this.actividad.idnumber.split(','); //Código de unidad y de subunidad escritos en la descripción (idNumber) del curso de Moodle
        this.idNumber = this.actividad.idnumber; //código unico del curso para la asignación
        //console.log("Código de asignación: ", this.idNumber[0]);
        //this.codigoAsignacion = this.idNumber[0]; //El código de asignación es el primer parametro de la descripción (idNumber)
        this.fecha_inicio = new Date( this.actividad.startdate * 1000);
        this.fecha_fin = new Date( this.actividad.enddate * 1000);
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
        },
        error:(err)=> { 
          console.error("Error al obtener el listado de estudiantes\n" + err);
        },
      });

    });

    /*const id = this.route.snapshot.paramMap.get('idActividad');
    if(id){
      this.parametro = `${id}`;
    }
    this.id_actividad = parseInt(this.parametro, 10); //Convertir a entenro, base decimal (10)

    this.actividadService.getActividad(this.id_actividad).subscribe((res)=>{ //Tambien es válido solamente this.parametro
      console.log(res); //La respuesta en un objeto JSON, proveniente del backend
      this.actividad = res as ActividadDetalleInterface;
      this.fecha_inicio = new Date( this.actividad.startdate * 1000);
      this.fecha_fin = new Date( this.actividad.enddate * 1000);
      //this.id_tipoActividad = this.actividad.id_tipoActividad;
      //this.id_personaAdmin = this.actividad.id_personaAdmin;

      /*this.actividadService.getTipoActividad(this.id_tipoActividad).subscribe((res)=>{
        this.tipo_actividad = res as TipoActividadInterface;
      });

      this.actividadService.getUsuario(this.id_personaAdmin).subscribe((res)=>{
        this.persona_admin = res as UsuarioInterface;
      })

      this.actividadService.getEstudiantesAsignados(this.id_actividad).subscribe((res)=>{
        this.estudiantes = res as EstudianteAsignadoInterface[];
      });*/
    //});
  }


  asignarCursoAlEstudiante():void{
    
    console.log("Usuario logueado que se va a matricualr: " + this.idUsuarioLogueado);
    console.log('Registro del usuario a consultar para matricular: ', this.registroUsuario.slice(1)); // 201602560
    /*if (!this.codigoAsignacion.trim()) {
      console.log('Por favor ingresa un código');
      alert('Ingresa un código válido');
      return; //Saca del método
    }*/

    try {
      //if (this.codigoAsignacion.trim() === this.actividad?.idnumber) { //Si el código de asignación es válido.
      //if (this.codigoAsignacion.trim() === this.idNumber![0]) { //Si el código de asignación es válido.
        //console.log('¡Código válido!');

        //CÓDIGO PARA VALIDAR EL PUESTO DE TRABAJO Y REALIZAR LA ASIGNACIÓN
        this.actividadService.getPuestoTrabajo(this.registroUsuario.slice(1) as number).subscribe({
          next:(res)=>{
            console.log('Se obtuvo correctamente el puesto de trabajo: ', res.toString()); //32,105
            console.log('Se obtuvo correctamente el código del curso: ', this.idNumber)
            this.codigoUnidadTrabajo = res as string[];
            if (!this.codigoUnidadTrabajo) { //No se encontró código del trabajador (venía la etiqueta vacía)
              alert('El registro ' + this.registroUsuario + ' no pertenece a ninguna unidad académica o administrativa');
              return;
            } else if (!this.idNumber) { //El curso no tenía el código de matriculación (no se puede asignar)
              alert('Error al asignar: no se ha establecido el código del curso');
              return;
            } else {
              this.actividadService.getVinculoCursoSubprograma(this.idNumber, this.codigoUnidadTrabajo[1], this.codigoUnidadTrabajo[0]).subscribe({
                next:(res)=>{
                  this.consultaVinculo = res as [];
                  if (this.consultaVinculo) {
                    console.log('Este curso está vinculado a la dependencia del trabajador: ', this.consultaVinculo);
                    this.actividadService.asignarCurso(this.idUsuarioLogueado, this.id_actividad).subscribe({
                      next: (res)=>{
                        this.mensaje = 'Curso asignado con éxito.';
                        this.asignado = true;
                        console.log("Se asignó el curso correctamente", res); //La respuesta es un null proveniente del back
                        alert('El curso ha sido asignado correctamente');
                      },
                      error: (err)=>{
                        this.mensaje = 'Hubo un error al asignar el curso.';
                        this.asignado = true;
                        console.error(err);
                      }
                    });
                  } else {
                    console.log('Error: este curso no está vinculado a la dependencia del trabajador', this.consultaVinculo);
                    alert('Error: este curso no está vinculado a la dependencia del trabajador: ');
                    return;
                  }
                },
                error:(err)=> {
                    console.log('Error al asignar ', err.error.message);
                    alert('Error al asignar' + "\n" + err.error.message);
                    return;
                }
              });
              /*
              if (this.codigoUnidadTrabajo[0] == this.idNumber![1] && this.codigoUnidadTrabajo[1] == this.idNumber![2]) {
                //this.actividadService.asginarCurso...
              } else {
                console.log('El puesto de trabajo y la descripción del curso no son iguales');
                alert('No puede asignarse a este curso debido a que no pertenece a esta unidad académica o administrativa');
              }
              */
            }
          },
          error:(err)=> {
            console.error('No se puedo obtener el puesto de trabajo ', err);
            alert('El registro ' + this.registroUsuario + ' no pertenece a ninguna unidad académica o administrativa');
            return; //No asigna el curso
          },
        });
        
        //CÓDIGO PARA NO VALIDAR EL PUESTO DE TRABAJO
        /*this.actividadService.asignarCurso(this.idUsuarioLogueado, this.id_actividad).subscribe({
          next: (res)=>{
            this.mensaje = 'Curso asignado con éxito.';
            this.asignado = true;
            console.log("Se asignó el curso correctamente", res); //La respuesta es un null proveniente del back
            alert('El curso ha sido asignado correctamente');
          },
          error: (err)=>{
            this.mensaje = 'Hubo un error al asignar el curso.';
            this.asignado = true;
            console.error(err);
          }
        });*/
      /*
      } else {
        console.log('Código incorrecto, no se pudo asignar el curso');
        alert('Código incorrecto, no se pudo asignar el curso');
      }
      */
    } catch (error) {
      console.log('Error, no se establecieron correctamento los parámetros en la configuración del curso');
      alert('Error, no se establecieron correctamente los parámetros en la configuración del curso' + "\n" + error);
    }
    
  }

  volver(): void {
    this.location.back(); //
  }

}

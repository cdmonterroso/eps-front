import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ServicioService } from "../../services/servicio.service";
import { ActividadInterface } from "../../models/actividad-interface";
import { UnidadInterface } from "../../models/unidad-interface";
import { SubprogramaInterface } from "../../models/subprograma-interface";
import { AsignacionInterface } from "../../models/asignacion-interface";
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asignacion-cursos',
  templateUrl: './asignacion-cursos.component.html',
  styleUrls: ['./asignacion-cursos.component.css']
})

export class AsignacionCursosComponent {
  @ViewChild('selectActividades') miSelectAct!: ElementRef;
  @ViewChild('selectUnidades') miSelectUni!: ElementRef;
  @ViewChild('selectSubprogramas') miSelectSub!: ElementRef;

  actividades:ActividadInterface[] = [];
  unidades:UnidadInterface[] = [];
  subprogramas:SubprogramaInterface[] = [];
  asignaciones:AsignacionInterface[] = [];
  unidadSeleccionada:number = 0;
  subprogramaSeleccionado:number = 0;
  actividadSeleccionada:string|null = null;
  asignacion:boolean = false;


  constructor(public actividadService: ServicioService, private location: Location){}
  
  ngOnInit(): void {
    //MANDO A TRAER LAS UNIDADES EJECUTORAS
    this.actividadService.getUnidades().subscribe( {
      next:(res)=>{
        this.unidades = res as UnidadInterface[];
        console.log('Unidades encontradas: ', this.unidades);
      },
      error:(err)=>{
        console.error('No se pudo obtener el listado de unidades ', err);
        return;
      }
    });

    //MANDO A TRAER LOS CURSOS Y CAPACITACIONES
    this.actividadService.getActividades().subscribe( {
      next:(res)=>{
        this.actividades = res as ActividadInterface[];
      },
      error:(err)=>{
        console.error('No se pudo obtener el listado de cursos ', err);
      }
    });
  }

  //Se dispara cuando el usuario cambia la selección de Unidad Ejecutora
  onUnidadChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const codigoUnidad = parseInt(selectElement.value);

    if (codigoUnidad > 0) {
      this.unidadSeleccionada = codigoUnidad;
      this.subprogramaSeleccionado = 0;
      //this.unidadSeleccionada.set(codigoUnidad);
      console.log('Unidad seleccionada: ', this.unidadSeleccionada);
      this.loadSubprogramas(this.unidadSeleccionada);
    } else {
      // Si el usuario selecciona "-- Seleccione --", reseteamos
      this.unidadSeleccionada = 0;
      this.subprogramaSeleccionado = 0;
      //this.unidadSeleccionada.set(null);
      console.log('Unidad nula');
      this.subprogramas = [];
    }
  }

  //Método que manda a traer los subprogrmas de la unidad selecciona
  loadSubprogramas(codigoUnidad: number): void {
    this.actividadService.getSubprogramas(codigoUnidad).subscribe( {
      next:(res)=>{
        this.subprogramas = res as SubprogramaInterface[];
        console.log('Subprogramas encontradas para la unidad seleccionada: ', this.subprogramas) 
    },
      error:(err)=>{
        console.error('No se pudo obtener el listado de unidades ', err);
        return;
      }
    });
  }

  //Se dispara cuando el usuario cambia la selección de Unidad Ejecutora
  onSubprogramaChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const partida = parseInt(selectElement.value);

    if (partida > 0) {
      this.subprogramaSeleccionado = partida;
      console.log('Subprograma seleccionado: ', this.subprogramaSeleccionado);
    } else {
      // Si el usuario selecciona "-- Seleccione --", reseteamos
      this.subprogramaSeleccionado = 0;
      console.log('Subprgrama nulo');
    }
  }

    //Se dispara cuando el usuario cambia la selección de Cursos y Capacitaciones
  onCursosChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const idActividad = selectElement.value; //STRING

    if (idActividad) {
      this.actividadSeleccionada = idActividad;
      console.log('Curso o Capacitación seleccionada: ', this.actividadSeleccionada);
    } else {
      // Si el usuario selecciona "-- Seleccione --", reseteamos
      this.actividadSeleccionada = null;
      console.log('Curso o Capacitación nula');
    }
  }

  asignar():void{
    if (this.actividadSeleccionada && this.subprogramaSeleccionado) {
      console.log(`Asignación: ${this.unidadSeleccionada}, ${this.subprogramaSeleccionado}, ${this.actividadSeleccionada}`);

      Swal.fire({
        title: '¿Estás seguro?',
        text: "Estás a punto de asignar esta actividad al subprograma seleccionado.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#198754', // Color success de Bootstrap
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, asignar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          
          // 3. AQUÍ LLAMAS A TU SERVICIO (Lo que antes hacías directamente)
          this.actividadService.vincularCurso(this.subprogramaSeleccionado, this.actividadSeleccionada).subscribe({
            next: (res)=>{
              console.log("Se vinculó el curso correctamente", res); //
          //this.asignacion = true;
              const mensaje = (res as { message: string }).message;
              alert('Se vinculó la actividad correctamente' + "\n" + mensaje);
              if (this.miSelectAct) {
                // Para "seleccionar" la opción por defecto (value="")
                this.miSelectAct.nativeElement.value = "";
                this.actividadSeleccionada = null;
              }
              if (this.miSelectSub) {
                // Para "seleccionar" la opción por defecto (value="0")  
                this.miSelectSub.nativeElement.value = "0";
                this.subprogramaSeleccionado = 0;
                this.subprogramas = [];
              }
              if (this.miSelectUni) {
                // Para "seleccionar" la opción por defecto (value="0")
                this.miSelectUni.nativeElement.value = "0";
                this.unidadSeleccionada = 0;
              }
            },
            error: (err)=>{
              console.error('Error al vincular el curso', err);
              alert('Error al vincular la actividad' + "\n" +err.error.message);
            }
          });

        }
      });
      
    }else{
      alert('Error: Hay campos vacíos que debe seleccionar');
    }
  }

    volver(): void {
    this.location.back(); //
  }

}
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ServicioService } from "../../services/servicio.service";
import { PublicoService } from "../../services/publico.service";
import { CategoriaInterface } from "../../models/categoria-interface";
import { ActividadInterface } from "../../models/actividad-interface";

@Component({
  selector: 'app-reporte-capacitaciones',
  templateUrl: './reporte-capacitaciones.component.html',
  styleUrls: ['./reporte-capacitaciones.component.css']
})
export class ReporteCapacitacionesComponent implements OnInit {

  misActividades:any;
  actividades:ActividadInterface[] = [];
  capacitaciones:ActividadInterface[] = [];
  categorias:CategoriaInterface[] = [];
  constructor(private servicio:PublicoService, private actividadService: ServicioService, private route: ActivatedRoute, private location: Location){}

  ngOnInit(): void {
    //MANDO A TRAER TODAS LAS CATEGORÍAS EXISTENTES
    this.actividadService.getCategorias().subscribe( {
      next:(res)=>{
        this.categorias = res as CategoriaInterface[];
        console.log('Categorías encontradas: ', this.categorias);

        this.actividadService.getActividades().subscribe( {
          next:(res)=>{
            this.actividades = res as ActividadInterface[];
            //SEPARO LAS CAPACITACIONES DE LA LISTA DE ACTIVIDADES
            for (var actividad of this.actividades) {
              if (actividad.categoryid == 7) { // 7 -> Capacitaciones; 6 -> Cursos
                console.log('Se encontró una capacitación: ' + actividad.fullname);
                this.capacitaciones.push(actividad);
              }
            }
          },
          error:(err)=>{
            console.error('No se pudo obtener el listado de cursos ', err);
          }
        });

      },
      error:(err)=>{
        console.error('No se pudo obtener las categorías ', err);
        return;
      }
    });
  }

  getNombreCategoria(idCategoria:any):String{
    console.log("id categoria: ", idCategoria);
    const categoriaEncontrada = this.categorias.find(cat => cat.id == idCategoria);
    console.log(categoriaEncontrada?.name);
    return categoriaEncontrada?.name || '0';
  }

  volver(): void {
    this.location.back(); //
  }


}

import { Component, OnInit } from '@angular/core';
import { ServicioService } from "../../services/servicio.service";
import { PublicoService } from "../../services/publico.service";
import { CategoriaInterface } from "../../models/categoria-interface";
import { ActividadInterface } from "../../models/actividad-interface";

@Component({
  selector: 'app-mis-actividades',
  templateUrl: './mis-actividades.component.html',
  styleUrls: ['./mis-actividades.component.css']
})
export class MisActividadesComponent implements OnInit {

    //misActividades:ActividadInterface[] = [];
    misActividades:any;
    categorias:CategoriaInterface[] = [];
    constructor(private servicio:PublicoService, private actividadService: ServicioService){}

    ngOnInit(): void {
      //MANDO A TRAER TODAS LAS CATEGORÍAS EXISTENTES
      this.actividadService.getCategorias().subscribe( {
        next:(res)=>{
          this.categorias = res as CategoriaInterface[];
          console.log('Categorías encontradas: ', this.categorias);

          //SE ENVÍA EL ID DEL USUARIO DE MOODLE PARA SABER LOS CURSOS ASIGNADOS
          console.log("Cursos asignados del siguiente Id de moodle: " + this.servicio.getIdUsuario());
          this.actividadService.getMisActividades(this.servicio.getIdUsuario()).subscribe( {
            next:(res)=>{
              this.misActividades = res;
              //this.misActividades = res as ActividadInterface[];
              console.log('Actividades matriculadas: ', this.misActividades);
            },
            error:(err)=>{
              console.error('No se pudo obtener los cursos matriculados ', err);
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

}

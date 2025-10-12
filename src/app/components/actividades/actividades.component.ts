import { Component, OnInit } from '@angular/core';
import { ServicioService } from "../../services/servicio.service";
import { ActividadInterface } from "../../models/actividad-interface";
import { CategoriaInterface } from "../../models/categoria-interface";

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit{

  //actividades:Object=[];
  actividades:ActividadInterface[] = [];
  categorias:CategoriaInterface[] = [];
  encontrado:boolean = false;
  terminoBusqueda:string = '';
  actividadEncontrada?:ActividadInterface;

  constructor(public actividadService: ServicioService){}
  
  ngOnInit(): void {

    //MANDO A TRAER TODAS LAS CATEGORÍAS EXISTENTES
    this.actividadService.getCategorias().subscribe( {
      next:(res)=>{
        this.categorias = res as CategoriaInterface[];
        //console.log('Categorías encontradas: ', this.categorias);

        this.actividadService.getActividades().subscribe( {
          next:(res)=>{
            this.actividades = res as ActividadInterface[];
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
    //console.log("id categoria: ", idCategoria);
    const categoriaEncontrada = this.categorias.find(cat => cat.id == idCategoria);
    //console.log(categoriaEncontrada?.name);
    return categoriaEncontrada?.name || '0';
  }

  buscarActividad(){
    const nombreActividad = this.terminoBusqueda.trim();
    const actEncontrado = this.actividades.find(act => act.fullname.includes(nombreActividad)) || null;
    
    if (actEncontrado) {
      this.actividadEncontrada = actEncontrado as ActividadInterface;
      this.encontrado = true;
      console.log('Se encontro la actividad buscada', this.actividadEncontrada.fullname);
    }else{
      console.log('No se encontro la actividad buscada');
      this.encontrado = false;
    }
  }

  limpiarBusqueda(){
    this.terminoBusqueda = '';
    this.encontrado = false;
  }

}

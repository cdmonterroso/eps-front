import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "aplication/json"
  })

  constructor(private http: HttpClient) { }
  //preURL:string = "http://localhost:4000/"; //LOCAL
  //preURL:string = "http://localhost:3000/"; //DOCKER
  //preURL:string = "http://10.17.1.36:3090/"; //SERVIDOR
  preURL:string= "https://back-sidecc-ddo.usac.edu.gt/"; //SERVIDOR
  //GET USUARIOS
  getUsuarios(){
    //const url = this.preURL + "usuario";
    const url = this.preURL + "listadousuarios";
    return this.http.get(url);
  }

  getUsuario(username:any){
    const url = this.preURL + "datousuario/"+username;
    return this.http.get(url);
  }

  //GET ACTIVIDADES
  getActividades(){
    //const url = this.preURL + "actividad";
    const url = this.preURL + "actividadesmoodle";
    return this.http.get(url);
  }

  //GET MIS ACTIVIDADES
  getMisActividades(id:any){
    const url = this.preURL + "actividadesmatriculadas/"+id; //ID DEL USUARIO DE MOODLE
    return this.http.get(url);
  }

  getActividad(id:any){
    //const url = this.preURL + "actividad/"+id;
    const url = this.preURL + "detallecurso/"+id;
    return this.http.get(url);
  }

  getTipoActividad(id:any){
    const url = this.preURL + "tipo_actividad/"+id;
    return this.http.get(url);
  }

  /*getEstudiantesAsignado(id:any) {
    const url = this.preURL + "estudiantesAsignados/"+id;
    return this.http.get(url);
  }*/

  asignarCurso(idUsuario:any, idCurso:any){
    const url = this.preURL + "asignarCurso/"+ idUsuario + "/" + idCurso;
    return this.http.get(url); //PROBAR LUEGO CON POST
  }

  getProfesor(idCurso:any){
    const url = this.preURL + "getProfesor/" + idCurso;
    return this.http.get(url);
  }

  getEstudiantes(idCurso:any){
    const url = this.preURL + "getEstudiantes/" + idCurso;
    return this.http.get(url);
  }

  getCursoAsignado(idUsuario:any, idCurso:any){
    const body = {
      idUsuario,
      idCurso
    };
    const url = this.preURL + "getCursoAsignado";
    return this.http.post(url,body); //post ya que estoy mandando un cuerpo
  }

  getPuestoTrabajo(registro:number){
    const body = {
      registro
    };
    const url = this.preURL + "getPuestoTrabajo";
    return this.http.post(url,body); //post ya que estoy mandando un cuerpo
  }

  getCategorias(){
    const url = this.preURL + "getCategorias";
    return this.http.get(url); 
  }

  getEstadoEstudiante(idCurso:number, idUsuario:number){
    const body = {
      idCurso,
      idUsuario
    };
    const url = this.preURL + "getEstadoEstudiante";
    return this.http.post(url,body);
  }


  // NUEVAS FUNCIONES
  getUnidades(){
    const url = this.preURL + "unidades";
    return this.http.get(url);
  }

  getSubprogramas(codigoUnidad:number){
    const url = this.preURL + "unidades/"+ codigoUnidad + "/subprogramas";
    return this.http.get(url);
  }

  vincularCurso(idSubprograma:any, codCurso:any){
    const body = {
      idSubprograma,
      codCurso
    };
    const url = this.preURL + "vincularCurso";
    return this.http.post(url,body); //post ya que estoy mandando un cuerpo
  }

  getVinculoCursoSubprograma(codCurso:any, partida:any, codUnidad:any ){
    const body = {
      codCurso,
      partida,
      codUnidad
    };
    const url = this.preURL + "getVinculoCursoSubprograma";
    return this.http.post(url,body); //post ya que estoy mandando un cuerpo
  }
  
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PublicoService {

  private registroUsuario:string; // Variable para almacenar el registro académico
  private fullName:string; //Variable para guardar el nombre completo del usuario
  private idUsuario:any; //Variable para almacenar el id del usuario en moodle
  private idCurso:any; //Variable para almacenar el id del curso de moodle
  private nombreCurso:any; //Variable para almacenar el nombre del curso de moodle;
  private indice: number;
  registros: string[] = [
    /*'20030361',
    '20060102',
    '20171111',
    'e20090388',*/
    'e201602560',
    't20150881'
    /*'20200391',
    '20100086',
    '20160311',
    '20020819',
    '19990735',
    '20101934'*/
  ];

  constructor() { 
    this.registroUsuario = '';
    this.fullName = '';
    this.idUsuario = null;
    this.idCurso = null;
    this.nombreCurso = null;
    this.indice = 0;
  }

  getRegistro(): any {
    return this.registroUsuario;
  }

  setValor():void {
    this.indice = Math.floor(Math.random() * 2);
    this.registroUsuario = this.registros[this.indice];
  }

  setRegistro(valor:string):void {
    this.registroUsuario = valor;
  }

  getIdUsuario():any{
    return this.idUsuario;
  }

  setIdUsuario(valror:any){
    this.idUsuario = valror;
  }

  getIdCurso():any{
    return this.idCurso;
  }

  setIdCurso(valor:any){
    this.idCurso = valor;
  }

  getFullName():any{
    return this.fullName;
  }

  setFullName(valor:any){
    this.fullName = valor;
  }

  getNombreCurso():any{
    return this.nombreCurso;
  }

  setNombreCurso(valor:any){
    this.nombreCurso = valor;
  }
}

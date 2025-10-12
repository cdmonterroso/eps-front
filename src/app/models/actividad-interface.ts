export interface ActividadInterface {
    /*id_actividad: number,
    nombre: string,
    descripcion: string,
    fecha_inicio: Date,
    fecha_fin: Date,
    id_tipoActividad: number,
    id_personaAdmin: number*/
    "id": number,
    "shortname": string,
    "categoryid": number,
    "categorysortorder": number,
    "fullname": string,
    "displayname": string,
    "idnumber": "",
    "summary": string,
    "summaryformat": number,
    "format": "site",
    "showgrades": number,
    "newsitems": number,
    "startdate": number,
    "enddate": number,
    "numsections": number,
    "maxbytes": number,
    "showreports": number,
    "visible": number,
    "groupmode": number,
    "groupmodeforce": number,
    "defaultgroupingid": number,
    "timecreated": number,
    "timemodified": number,
    "enablecompletion": number,
    "completionnotify": number,
    "lang": string,
    "forcetheme": string,
    "courseformatoptions": [
      {
        "name": string,
        "value": number
      }
    ],
    "showactivitydates": boolean,
    "showcompletionconditions": null,
    "profesional":string,
    "registroProfesional":string
}
//Atributo más para cantidad de estudiantes asignados
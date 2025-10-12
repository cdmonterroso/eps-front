export interface UsuarioInterface {
    /*id_persona: number,
    registro: string,
    nombre: string,
    apellido: string,
    correo: string,
    contrasenia: string,
    id_tipoPersona: number*/

    "id": number,
    "username": string,
    "firstname": string,
    "lastname": string,
    "fullname": string,
    "email": string,
    "department": string,
    "firstaccess": number,
    "lastaccess": number,
    "auth": string,
    "suspended": boolean,
    "confirmed": boolean,
    "lang": string,
    "theme": string,
    "timezone": string,
    "mailformat": number,
    "description": string,
    "descriptionformat": number,
    "profileimageurlsmall": string,
    "profileimageurl": string,
    "customfields"?: []

}
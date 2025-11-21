export interface SubprogramaInterface {
    id_subprograma?: number; //id de la tabla subprograma
    partida: number; //código subprograma
    nombre_subprograma: string; //nombre subprograma
    codigo_unidad_fk: number; //código unidad
    nombre_unidad: string; //nombre unidad (tabla unidades_ejecutoras)
}

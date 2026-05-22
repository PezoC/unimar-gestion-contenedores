export interface Contenedor {
  id?: number; // opcional
  codigo_ISO: string; // ISO 6346
  peso_vacio: number;
  peso_bruto: number;
  estado: string;
  ubicacion_patio?: string; // opcional
  viaje_asignado?: string; // opcional
  autorizar_salida?: boolean;// opcional
}